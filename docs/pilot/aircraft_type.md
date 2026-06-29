# 航空器分类

## 1. 进近速度分类

我国作为 ICAO 创始成员国，航行资料汇编（AIP）统一采用 ICAO 标准。

该分类按照航空器在`着陆构型`下`失速速度的 1.3 倍`，划分为 A - E 五类：

| 类别 | 速度范围（节）   | 典型机型                   |
|----|-----------|------------------------|
| A  | < 91      | 单引擎小型飞机（如塞斯纳 172）      |
| B  | 91 - 120  | 多引擎小型飞机（如双水獭）          |
| C  | 121 - 140 | 主流喷气式客机（如 B737、A320）   |
| D  | 141 - 165 | 大型喷气机或军用机（如 B747、A330） |
| E  | > 165     | 部分军用高速飞机（如战斗机）         |

> [!TIP]
> 各机型具体归类可访问 [Skybrary 机型列表](https://skybrary.aero/aircraft-types)。

## 2. 机型代号与尾流等级

ICAO 第 8643 号文件（无电子版）为每种航空器分配唯一的`机型代号`，同时记录其`发动机类型`、`发动机数量`及`尾流等级(WTC)`。

- **官方查询**：[ICAO DOC 8643 搜索引擎](https://www.icao.int/publications/doc-8643-aircraft-type-designators/search)
- **民间镜像**：[doc8643.com](https://doc8643.com)

### 2.1 ICAO 尾流等级（WTC）

ICAO 在 DOC 8643 中按`最大起飞重量(MTOW)`定义分为`四类`：

| 等级    | 定义                            |
|-------|-------------------------------|
| 轻型（L） | MTOW ≤ 7,000 kg               |
| 中型（M） | 7,000 kg < MTOW < 136,000 kg  |
| 重型（H） | MTOW ≥ 136,000 kg             |
| 超级（J） | MTOW ≥ 560,000 kg（如 A380‑800） |

### 2.2 我国 CCAR‑93TM‑R6 规定

我国《民用航空空中交通管理规则》将尾流分为`三类`：

- 轻型：≤ 7,000 kg
- 中型：7,000 kg - 136,000 kg（不含）
- 重型：≥ 136,000 kg

> [!IMPORTANT]
> 当前机为 `波音 757` 时，尽管其 MTOW 属于中型，但按重型机尾流间隔执行。

具体雷达及非雷达间隔数值，请参阅《[航空器尾流间隔](./Wake_turbulence_separation_minima)》。

## 3. 中国尾流重新分类(RECAT‑CN)

为提升跑道容量，中国民航局实施了 `RECAT‑CN`，全称为`Re‑categorization – CN`，
将航空器按 `最大起飞重量(MTOW)和翼展` 组合细分为 `五类`：

| 类别   | 代码 | 判定条件                                       |
|------|----|--------------------------------------------|
| 超级重型 | J  | MTOW ≥ 136,000 kg **且** 翼展 ≥ 75 m          |
| 重型   | B  | MTOW ≥ 136,000 kg **且** 翼展 ≥ 54 m 且 < 75 m |
| 一般重型 | C  | MTOW ≥ 136,000 kg **且** 翼展 < 54 m          |
| 中型   | M  | 7,000 kg < MTOW < 136,000 kg（含 B757 系列）    |
| 轻型   | L  | MTOW ≤ 7,000 kg                            |

> [!IMPORTANT]
> B757‑200/‑300 在 `RECAT‑CN` 中归为 `中型机`，但实际尾流间隔仍须参照 `波音 757` 特殊规定。

相应的间隔标准详见《[航空器尾流间隔](./Wake_turbulence_separation_minima)》。

## 4. 特殊机型标识符

当飞机型号未分配正式代号或无法识别时，使用下列 ICAO 标准标识符：

| 航空器类型     | 标识符    |
|-----------|--------|
| 未分配代号的机型  | `ZZZZ` |
| 飞艇        | `SHIP` |
| 气球        | `BALL` |
| 滑翔机       | `GLID` |
| 轻型飞机（超轻）  | `ULAC` |
| 轻型自转旋翼机   | `GYRO` |
| 微型/超轻型直升机 | `UHEL` |

## 参考文献

1. [中航材导航技术. 可能是史上最全的飞机分类](https://www.siniswift.com/news/d135.html)
2. [Wikipedia. Aircraft Approach Category](https://en.wikipedia.org/wiki/Aircraft_approach_category)
3. [Skybrary. Approach Speed Categorisation](https://skybrary.aero/articles/approach-speed-categorisation)
4. [Skybrary. ICAO Wake Turbulence Category](https://skybrary.aero/articles/icao-wake-turbulence-category)
5. [Skybrary. Aircraft Type Designator](https://skybrary.aero/index.php/Aircraft_Type_Designator)
6. [ICAO Doc 8643 – Aircraft Type Designators](https://www.icao.int/publications/doc-8643-aircraft-type-designators)
7. [《民用航空空中交通管理规则》（CCAR‑93TM‑R6）](https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202303/P020230331606968015618.pdf)
