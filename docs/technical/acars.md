# APOC ACARS 数据交换协议 版本一

## 1. 总则

- JSON文本，UTF-8编码，无BOM。
- 所有字段采用snake_case命名。
- 时间戳统一使用Unix毫秒级时间戳，时区固定为UTC。
- 消息ID采用UUIDv7。
- 使用websocket长连接进行通讯，在连接时携带HTTP头部 `Authorization: Bearer <key>`
- 连接websocket时需同时携带查询参数`network`或者HTTP头部`X-Network`标明要加入的网络
- 连接websocket时需同时携带查询参数`station`或者HTTP头部`X-Station`标明站点ID
- 连接websocket时需同时携带查询参数`type`或者HTTP头部`X-Type`标明站点类型，pilot或者atc
- 同一时间同一账户只允许拥有一个活跃websocket连接，若同一账户同一时间试图连接第二个连接，则拒绝新连接建立
- 结构示例中的注释仅为文档书写便利，实际数据包中不得包含注释内容

## 2. 名词定义与数据约定

### 2.1 ACARS

飞机通信寻址与报告系统，一种通过无线电或者卫星在航空器与地面站之间传递短消息的数字数据链系统

### 2.2 客户端

实现本协议所有或者部分内容并作为客户端连入网络的软件或网页

### 2.3 服务端

实现本协议所有内容并作为服务端向客户端提供接入服务的软件

### 2.4 网络

服务端上虚拟划分出来的不同空间，用于防止重复与进行消息隔离

### 2.5 飞行员

以飞行员身份连接至网络并使用网络服务的人

### 2.6 管制员

以管制员身份连接至网络并使用网络服务的人

### 2.7 频率

特指飞行员与管制员通讯使用的无线电频率，单位统一为Hz，整数类型

### 2.8 飞行高度

F代表以100英尺分割的飞行高度层，比如F200代表20000英尺
A代表以100英尺分割的海拔高度，比如A050代表5000英尺
S代表以10米分割的飞行高度层，比如S1130代表11300米
M代表以10米分割的海拔高度，比如M0120代表1200米

### 2.9 气压单位

P代表以百帕为单位，I代表以英寸汞柱为单位
N代表QNH，E代表QFE
比如PN0998代表QNH 998百帕
IN29.45代表QNH 29.45 英寸汞柱

## 3. 数据包

### 3.1 基础数据包结构

1. 若服务端发现客户端试图回复不需要被回复的消息，则必须丢弃回复包并向客户端发送错误包
2. 若服务端发现客户端数据包中的来源站点ID与建立连接时的站点ID不一致，则必须丢弃该数据包并记录错误日志
3. 若服务端发现客户端试图回复已过期的消息，则必须丢弃回复包并向客户端发送错误包

```json5
{
  // 协议版本号
  "protocol": 1,
  // 数据包类型
  "type": 0,
  // 数据包来源
  "from": "...",
  // 数据包去向
  "to": "...",
  // 消息ID，UUIDv7
  "message_id": "",
  // 回复消息UUID
  "reply_id": null,
  // Unix毫秒时间戳
  "timestamp": 0,
  // 消息过期时间戳，如果此条消息不需要被回复，将本条置null
  "expired_at": null,
  // 数据包负载
  "payload": null,
}
```

### 3.2 数据包类型

type定义为16位整数，前八位代表数据包分类，后八位为每个分类下的数据包ID

#### 3.2.1 系统数据包

##### 3.2.1.1 错误包(type=0)

错误包仅允许从服务端发往客户端，从客户端发来的错误包应该被服务器忽略

```json5
{
  "protocol": 1,
  "type": 0,
  "from": "SERVER",
  "to": "ZSHA_CTR",
  "message_id": "019fa8ff-c969-7065-94d9-d491c272921d",
  "reply_id": "019fa900-bf77-7588-9cf8-512b3e94f92d",
  // 应当填写回复消息ID
  "timestamp": 1785246789440,
  "expired_at": null,
  "payload": {
    // 错误码
    "error_code": 10000,
    // 错误详情
    "error_message": "未知错误",
    // 何时后可以重试，UNIX毫秒时间戳，如果为null代表不可重试
    "retry_after": null
  }
}
```

| 错误码   | 描述            |
|:------|---------------|
| 10000 | 未知错误          |
| 10001 | 系统错误          |
| 10002 | 消息已过期         |
| 10003 | 回复ID无效        |
| 10004 | 该消息不允许回复      |
| 10005 | 目标站点不存在       |
| 10006 | 达到发送速率限制      |
| 10007 | 管制员不允许发送此类数据包 |
| 10008 | 飞行员不允许发送此类数据包 |
| 10010 | TELEX发送失败     |
| 10020 | DCL请求失败       |
| 10021 | 已存在处理中的DCL请求  |
| 10030 | CPDLC发送失败     |

##### 3.2.1.2 确认包(type=1)

确认包通常用于确认客户端发过来的包，比如客户端的能力包与网络切换包

```json5
{
  "protocol": 1,
  "type": 1,
  "from": "SERVER",
  "to": "ZSHA_CTR",
  "message_id": "019fab88-28a1-766a-9c18-df544bb374da",
  "reply_id": "019fab88-28a1-766a-9c18-df544bb374da",
  "timestamp": 1785289255695,
  "expired_at": null,
  "payload": {
    // 是否确认
    "ack": true,
    // 如果ack为false，此处可携带具体原因
    "reason": ""
  }
}
```

##### 3.2.1.3 能力包(type=2)

能力包允许客户端向服务端表明自己支持的能力，服务端不应向客户端转发其不支持的包
需要服务器响应确认包，若两分钟内服务器未响应确认包，则重试最多三次，超过三次客户端需主动断开连接

```json5
{
  "protocol": 1,
  "type": 2,
  "from": "ZSHA_CTR",
  "to": "SERVER",
  "message_id": "019fab88-28a1-766a-9c18-df544bb374da",
  "reply_id": null,
  "timestamp": 1785247211440,
  "expired_at": 1785247331440,
  "payload": {
    "capabilities": [
      "telex",
      "dcl",
      "cpdlc"
    ]
  }
}
```

##### 3.2.1.4 网络切换包(type=3)

网络切换包允许客户端在不断开现有websocket链接的情况下切换自身所处的网络
需要服务器响应确认包，若两分钟内服务器未响应确认包，代表切换失败

```json5
{
  "protocol": 1,
  "type": 3,
  "from": "ZSHA_CTR",
  "to": "SERVER",
  "message_id": "019fab85-f3ec-7639-99f3-bec5cb454709",
  "reply_id": null,
  "timestamp": 1785289115696,
  "expired_at": 1785289275696,
  "payload": {
    "network": "apoc",
  }
}
```

##### 3.2.1.5 Ping包(type=4)

Ping包允许客户端检测服务器或者目标客户端或者服务端检测客户端是否在线
若服务端发现两分钟内客户端未响应Pong包，则重试最多三次，超过三次则主动断开连接
若客户端发现服务端两分钟内未响应Pong包，则重试最多三次，超过三次则主动断开连接
若客户端发现目标客户端两分钟内未响应Pong包，则重试最多三次，超过三次代表目标客户端未上线
seq为一个随机的三十二位整数值，由发送方生成

```json5
{
  "protocol": 1,
  "type": 4,
  "from": "ZSHA_CTR",
  "to": "SERVER",
  "message_id": "019fac0e-b7d1-70f8-90cd-23d94af91db6",
  "reply_id": null,
  "timestamp": 1785289115696,
  "expired_at": 1785289275696,
  "payload": {
    "seq": 7
  }
}
```

##### 3.2.1.6 Pong包(type=5)

Pong包用于响应客户端或者服务端的Ping包，`seq` 与Ping包保持一致

```json5
{
  "protocol": 1,
  "type": 5,
  "from": "SERVER",
  "to": "ZSHA_CTR",
  "message_id": "019fac0e-dd59-76b0-8a92-4612b7604b52",
  "reply_id": "019fac0e-b7d1-70f8-90cd-23d94af91db6",
  "timestamp": 1785289115696,
  "expired_at": null,
  "payload": {
    "seq": 7
  }
}
```

#### 3.2.2 普通数据包

##### 3.2.2.1 TELEX包(type=256)

TELEX包允许客户端发送点对点的单条消息

```json5
{
  "protocol": 1,
  "type": 256,
  "from": "CES2352",
  "to": "CCA0157",
  "message_id": "019fa90c-e104-7149-bf1a-88cd1ed9347c",
  // TELEX不得设置reply_id，没有明确的一发一回对应
  "reply_id": null,
  "timestamp": 1785247681444,
  "expired_at": null,
  "payload": {
    "text": "亻尔女子，亻尔口乞了口马"
  }
}
```

#### 3.2.3 DCL数据包

DCL数据包的超时时间统一为5分钟，如果5分钟还未收到回复包，则整条请求作废，客户端不得响应已经过期的消息

##### 3.2.3.1 DCL请求包(type=512)

DCL请求包是请求DCL的包，由飞行员发给管制员
需要DCL驳回包或者DCL批准包

```json5
{
  "protocol": 1,
  "type": 512,
  "from": "CES2352",
  "to": "ZGHA_DEL",
  "message_id": "019fa911-70c3-7589-a420-1edfa2b48709",
  // DCL请求没有回复ID
  "reply_id": null,
  "timestamp": 1785247911440,
  "expired_at": 1785289275696,
  "payload": {
    // 消息的来源可能与实际执飞呼号不一致，比如双人机组
    "callsign": "CES2352",
    "departure": "ZGHA",
    "arrival": "ZSSS",
    "aircraft": "A339",
    "gate": "235",
    "atis": "C",
    // 其他备注信息
    "remark": ""
  }
}
```

##### 3.2.3.2 DCL驳回包(type=513)

DCL驳回包用于驳回DCL请求的包，由管制员发给飞行员，

```json5
{
  "protocol": 1,
  "type": 513,
  "from": "ZGHA_DEL",
  "to": "CES2352",
  "message_id": "019fa918-14e7-70ec-b6a1-28c18c640124",
  // 应当填写回复消息ID
  "reply_id": "019fa911-70c3-7589-a420-1edfa2b48709",
  "timestamp": 1785248360440,
  "expired_at": 1785248660440,
  "payload": {
    // 驳回原因
    "reason": "未找到飞行计划"
  }
}
```

##### 3.2.3.3 DCL批准包(type=514)

DCL批准包用于批准DCL请求的包，由管制员发给飞行员
需要DCL确认包

```json5
{
  "protocol": 1,
  "type": 514,
  "from": "ZGHA_DEL",
  "to": "CES2352",
  "message_id": "019fa91a-c2da-762f-a7a3-f81acdc13a42",
  // 应当填写回复消息ID
  "reply_id": "019fa911-70c3-7589-a420-1edfa2b48709",
  "timestamp": 1785248522440,
  "expired_at": 1785248822440,
  "payload": {
    // 离场跑道
    "runway": "18R",
    // 离场程序
    "sid": "RV",
    // 应答机编码
    "squawk": "2352",
    // 起始高度
    "initial_alt": "M0120",
    // 修正海压或者修正场压
    "altimeter": "PN1008",
    // 下一联系频率，单位Hz
    "next_freq": 118100000,
    // 放行频率，单位Hz
    "dep_freq": 118100000,
    // 巡航高度
    "cruise_alt": "S1130",
    // 放行备注
    "remark": ""
  }
}
```

##### 3.2.3.4 DCL确认包(type=515)

DCL确认包用于确认管制员给出的DCL信息的包，由飞行员发给管制员

```json5
{
  "protocol": 1,
  "type": 515,
  "from": "CES2352",
  "to": "ZGHA_DEL",
  "message_id": "019fabdb-a441-7686-8c7d-c2b2615b9e5e",
  // 应当填写回复消息ID
  "reply_id": "019fa91a-c2da-762f-a7a3-f81acdc13a42",
  "timestamp": 1785249004440,
  "expired_at": null,
  "payload": {
    // 是否接受
    "approve": true,
    // 如果不接受，原因 
    "reason": ""
  }
}
```

#### 3.2.4 CPDLC数据包

CPDLC数据包的超时时间统一为5分钟，如果5分钟还未收到回复包，则默认请求被拒绝，客户端不得响应已经过期的消息

##### 3.2.4.1 CPDLC回复包(type=768)

CPDLC回复包用于回复飞行员的请求或者回复管制员的指令

```json5
{
  "protocol": 1,
  "type": 768,
  "from": "ZGHA_DEL",
  "to": "CES2352",
  "message_id": "019fa922-0b43-7703-a6ae-d5d27d19eae9",
  // 应当填写回复消息ID
  "reply_id": "019fabdb-732c-733c-9682-023f47a372c6",
  "timestamp": 1785249004440,
  "expired_at": null,
  "payload": {
    // 是否同意
    "approve": true,
    // 如果不同意，原因 
    "reason": ""
  }
}
```

##### 3.2.4.2 CPDLC登录包(type=769)

CPDLC登录包用于飞行员向管制员请求CPDLC服务
需要CPDLC登录响应包

```json5
{
  "protocol": 1,
  "type": 769,
  "from": "CES2352",
  "to": "ZGZU_CTR",
  "message_id": "019fabda-97a3-7277-8b00-f5c8a7757426",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": 1785249304440,
  // 发送登录包无payload
  "payload": null
}
```

##### 3.2.4.3 CPDLC登录响应包(type=770)

CPDLC登录响应包用于管制员同意或者拒绝飞行员的CPDLC服务请求
若管制员发现和该飞行员有未关闭的CPDLC逻辑连接，则需要先关闭之前的逻辑连接，再打开新的

```json5
{
  "protocol": 1,
  "type": 770,
  "from": "ZGZU_CTR",
  "to": "CES2352",
  "message_id": "019fabda-c9c2-71eb-a641-33235608e0e3",
  // 应当填写回复消息ID
  "reply_id": "019fabda-97a3-7277-8b00-f5c8a7757426",
  "timestamp": 1785249004440,
  "expired_at": null,
  "payload": {
    // 是否同意CPDLC服务
    "approve": true,
    // 如果同意为当前管制席位呼号，如果不同意为拒绝原因
    "data": "Guangzhou Control"
  }
}
```

##### 3.2.4.4 CPDLC终止包(type=771)

CPDLC终止包用于主动终止CPDLC服务

```json5
{
  "protocol": 1,
  "type": 771,
  "from": "ZGZU_CTR",
  "to": "CES2352",
  "message_id": "019fabda-ef6f-709f-9b1f-2c15c5e8afce",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": null,
  "payload": {
    // 终止服务的原因
    "reason": "足包足各了兄弟"
  }
}
```

##### 3.2.4.5 CPDLC移交包(type=772)

CPDLC移交包用于当飞行员离开当前管制员覆盖范围时，移交给下一管制员前的协调，发给对应管制询问其是否接受
需要CPDLC回复包

```json5
{
  "protocol": 1,
  "type": 772,
  "from": "ZGZU_CTR",
  "to": "ZSHA_CTR",
  "message_id": "019fabdb-732c-733c-9682-023f47a372c6",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": 1785249304440,
  "payload": {
    // 准备移交的站点ID
    "callsign": "CES2352",
    // 移交理由
    "reason": ""
  }
}
```

##### 3.2.4.6 CPDLC切换包(type=773)

CPDLC切换包用于当飞行员离开当前管制员覆盖范围时，移交给下一管制员，此时由于目标管制员已经同意接受CPDLC服务，故不用重复发送CPDLC登录包
需要CPDLC回复包，管制员收到回复包确认后，主动断开逻辑会话

```json5
{
  "protocol": 1,
  "type": 773,
  "from": "ZGZU_CTR",
  "to": "CES2352",
  "message_id": "019fabdc-18e5-713c-a001-5df8d62af925",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": 1785249304440,
  "payload": {
    // 下一CPDLC服务站点ID
    "callsign": "ZSHA_CTR",
    // 移交理由
    "reason": ""
  }
}
```

##### 3.2.4.7 CPDLC移交确认包(type=774)

CPDLC移交确认包用于当飞行员离开上一管制员覆盖范围并联系到下一管制员时，此时由于下一管制员发给上一管制员，指示其可以断开逻辑会话

```json5
{
  "protocol": 1,
  "type": 774,
  "from": "ZSHA_CTR",
  "to": "ZGZU_CTR",
  "message_id": "019fac85-abc9-7458-98cd-e63a77aab25c",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": null,
  "payload": null
}
```

##### 3.2.4.8 CPDLC请求/指令包(type=775)

CPDLC请求/指令包用于飞行员向管制员提出要求，比如请求飞行高度层，请求直飞等；或者管制员向飞行员下发指令或者消息，比如改变飞行高度层，直飞某航点或者发送预期程序、跑道、机位等
需要CPDLC回复包

```json5
{
  "protocol": 1,
  "type": 775,
  "from": "CES2352",
  "to": "ZGZU_CTR",
  "message_id": "019fabdc-44c8-774f-9c24-1272d7fa09aa",
  "reply_id": null,
  "timestamp": 1785249004440,
  "expired_at": 1785249004440,
  "payload": {
    "commands": [
      {
        "type": 5,
        "value": "PIKAS"
      },
      {
        "type": 0,
        "value": "S1130"
      }
    ]
  }
}
```

| type | 说明      | 示例                     |
|:-----|:--------|:-----------------------|
| 0    | 爬升到某一高度 | S1130                  |
| 1    | 下降到某一高度 | M0240                  |
| 2    | 调速      | N250+, M085-           |
| 3    | 航向      | 360, 250               |
| 4    | 航迹      | 360, 250               |
| 5    | 直飞      | PIKAS                  |
| 6    | LID     | SASAN9.ESBAG/18L.SS204 |
| 7    | 设置应答机   | 2352                   |
| 8    | 应答机识别   |                        |
