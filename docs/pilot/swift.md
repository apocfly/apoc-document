# Swift 连飞教程

## 前言

Swift官方文档地址: [https://swift-project.org](https://swift-project.org)

> swift pilot client is a multi-platform (Windows, macOS, Linux) and multi-flight simulator (X-Plane 11, X-Plane 12,
> MSFS2020, MSFS2024, P3D (64-bit), FlightGear) application for virtual pilots who would like to connect to VATSIM
> or private FSD servers.
> We are an independent (private/non-commercial) software project creating open source software for flight simulation.

Swift 功能强大，但界面相对老旧且为纯英文，不少新手用户在初次使用时感到困惑。  
本文档旨在为您提供一份清晰、实用的操作指南，从软件准备、客户端配置、服务器连接，到实际飞行操作，一步步带您完成全部流程。

我们相信，熟悉流程、遵守规则，是获得流畅、沉浸且富有成就感的联飞体验的基础。  
特别是对于新手飞行员，强烈建议您在参与连飞活动前，熟练掌握所选机型的操作，并认真阅读本指南。

无论您是第一次接触连飞，还是希望在新平台开启联飞之旅，我们都希望本文能为您带来帮助。  
现在，请跟随我们的指引，开启您的联飞旅程。期待在虚拟蓝天下与您安全、顺畅地相遇！

## 第一章 连飞软件的安装及配置

### 1 下载所需文件

#### 1.1 Swift客户端

首先需要下载 Swift 联飞客户端，推荐使用 **0.15.x** 版本。可通过以下两种方式获取：

1. [Swift 官方 GitHub 发布页](https://github.com/swift-project/pilotclient/releases)
2. [APOC 下载站](https://file.apocfly.com/Swift%E7%9B%B8%E5%85%B3%E6%96%87%E4%BB%B6)

> [!NOTE]
> 从 GitHub 下载时，可能需要科学上网工具才能正常访问。

进入发布页后，请根据您的操作系统及模拟器类型，在“Assets”下方选择对应的安装包进行下载。

![选择对应安装包下载](./images/swift/1.png)

> [!NOTE]
> **FSX、FS2004（FS9）及 P3D v1–v3 用户请注意**  
> 上述模拟器仅支持 32 位版本的 Swift，请务必选择 32 位安装包。  
> 截至 2026 年 6 月 15 日，仅 **0.14.142** 及更早版本提供 32 位支持。

---

#### X-Plane 用户额外步骤

如果您使用 **X-Plane 11 或 12**，还需额外下载 **xswiftbus** 插件（下文会再次提及）。

![下载 xswiftbus](./images/swift/2.png)

> [!CAUTION]
> **版本必须匹配**：请确保 xswiftbus 的版本号（格式为 `0.xx.xxx`）与您下载的 Swift 客户端版本号完全一致。

下载后，将 xswiftbus 解压并放置于 X-Plane 根目录下的 `Resources/plugins` 文件夹中。

**注意不要产生文件夹嵌套**，确保插件文件夹直接位于 `plugins` 目录内。

![xswiftbus 安装](./images/swift/3.png)

#### 1.2 下载机模映射包

##### 1.2.1 关于机模映射包

机模映射包是完整联飞体验中不可或缺的一环。不同模拟飞行平台可能有所不同，但其底层工作原理均可概括为以下三步：

1. **识别机模**：模拟飞行软件与联飞客户端共同读取并识别本地的`飞机模型`（即`机模`）。
2. **添加飞机**：在模拟飞行环境中生成对应的`AI飞机`。
3. **实时映射**：联飞客户端根据连飞服务器上其他飞友的实时状态数据，同步驱动这些`AI飞机`的位置、姿态等状态（即`映射`过程）。

通过上述流程，服务器上的其他飞机便被`映射`至您本地的模拟飞行软件中。

简而言之：**`机模`由映射包提供，而`映射`动作则由联飞软件负责执行。**

以下是针对各模拟平台机模映射方案的优化版本，主要依据 Swift 官方文档进行了核实与补充：

---

##### 1.2.2 MSFS 2020/2024 映射

根据 Swift 官方文档，MSFS 2020/2024 用户目前主要有三种 AI 机模来源可供选择：

| 方案                                    | 特点                     | 获取方式                                                                                          |
|---------------------------------------|------------------------|-----------------------------------------------------------------------------------------------|
| **AIG (Alpha India Group)**           | 模型质量高，机型丰富             | 通过 [AI Manager](https://www.alpha-india.net/ai-manager/) 下载安装，需确保所有机型安装至 MSFS `Community` 文件夹 |
| **FSLTL**                             | 同样具备高质量模型              | 通过 FlyByWire Installer 下载安装，无需安装其 "injector" 组件                                               |
| **MTL (Multiplayer Traffic Library)** | 模型精细度略逊于前两者，但包含一些独有的机型 | 通过 [MTL Installer](https://mtl.ivao.aero/installer) 获取                                        |

> [!NOTE]
> 本文**推荐使用 AIG 映射包**，因其模型质量与机型覆盖范围较为均衡。

**网盘下载（AIG 映射包）** ：[百度网盘](https://pan.baidu.com/s/1fBCBvSGkq6pUC6d7jYa2lA?pwd=9jkc)

下载后请手动解压到 MSFS 的 `Community` 目录下，**注意不要产生文件夹嵌套**。

##### 1.2.3 X-Plane 11/12 映射

Swift 官方文档指出，X-Plane 平台目前最主流的 CSL 模型分发方为 **BlueBell** 与 **X-CSL**。

> [!NOTE]
> 本文**推荐使用 X-CSL** 作为映射包，其机型覆盖面较广且更新较为活跃。

**安装注意事项**：

1. **存放位置**：CSL 模型必须放置在 X-Plane 程序目录内部（外部链接无效），推荐统一存放在 `Custom Data` 文件夹下。
2. **目录结构**：建议在 `Custom Data` 下先创建 `CSL` 父文件夹，再将不同来源的 CSL 包分别放入子文件夹中，例如：
   ```
   .../X-Plane 12/Custom Data/CSL/X-CSL
   .../X-Plane 12/Custom Data/CSL/BB
   ```
3. **版本要求**：X-Plane 11.50 及以上版本仅支持 OBJ8 格式的 CSL 模型，OBJ7 及更旧版本将无法使用。
4. **更新模型后**：每次更新模型后，需在 Swift 中**重新生成 Active Model Set**，否则 Swift 无法识别新模型。

**官方资源**：

- [X-CSL 官网](https://x-csl.ru/downloads)
- [Swift 官方 X-Plane 映射文档](https://swift-project.org/home/models/xplane/)

**网盘下载（X-CSL 映射包）** ：

- [百度网盘](https://pan.baidu.com/s/1FdbYVhd8lucimYaXXuTmMw?pwd=hkps)
- [123云盘](https://www.123912.com/s/oFMGTd-Rs4gv)（提取码：`tZgp`）

下载后请解压到 X-Plane 目录下的任意位置（推荐 `Custom Data` 文件夹），
**文件夹名称可自定义，但必须位于 X-Plane 目录内**，X-Plane 无法读取目录以外的文件。

##### 1.2.4 FSX & P3D

根据 Swift 官方文档，FSX 与 P3D 平台目前主流的 AI 机模方案同样来自 **Alpha India Group (AIG)** 。

**官方资源**：

- [AIG 官方网站](http://www.alpha-india.net/software/)
- [Swift 官方 FSX/P3D 映射文档](https://swift-project.org/home/models/fsx_p3d/)

> [!NOTE]
> Swift 官方文档中关于 FSX/P3D 的映射说明较为简略，主要指引用户使用 AIG 提供的 AI 模型。
> 建议通过 AIG 官方渠道获取最新版本的映射包，并按照 AIG 提供的说明进行安装。

### 2 安装 Swift

> [!CAUTION]
> 安装前请务必确认以下四点：
> - **关闭所有**正在运行的 Swift 及模拟器进程；
> - Swift 安装包与对应平台的机模映射包均已下载完毕；
> - **X-Plane 11/12 用户**：xswiftbus 插件已正确安装并加载；
> - **版本匹配**：确认使用的是与模拟器匹配的 Swift 32 位或 64 位版本。

---

> [!NOTE]
> 以下演示基于 **Windows 10 64 位**操作系统，其他系统操作流程大同小异。  
> 本教程假设您是**首次安装** Swift，若曾安装过旧版本，部分界面可能略有不同。

---

**安装步骤**

1. **运行安装程序**  
   双击 Swift 安装包，如遇系统安全提示窗口，点击“是”继续。  
   ![确认运行](./images/swift/4.png)

2. **进入安装向导**  
   点击“Next”。  
   ![确认安装](./images/swift/5.png)

3. **接受许可协议**  
   选择“I accept the agreement”，然后点击“Next”。  
   ![接受协议](./images/swift/6.png)

4. **选择模拟器平台**  
   在红框区域内，**仅勾选您当前使用的模拟器**，其余选项保持默认，然后点击“Next”。  
   ![勾选模拟器](./images/swift/7.png)
   > [!NOTE]
   > 除红框内的勾选项外，请勿更改其他任何设置。

5. **选择安装路径**  
   可自定义安装目录，建议选择一个便于后续管理的位置。  
   ![选择安装目录](./images/swift/8.png)
   > [!NOTE]
   > 如不熟悉其他附加选项的含义，请保持默认设置，不要随意勾选。

6. **确认安装**  
   点击“Next”开始安装。  
   ![确认安装](./images/swift/9.png)

7. **等待安装完成**  
   安装过程结束后，点击“Next”。  
   ![等待安装完成](./images/swift/10.png)

8. **完成安装**  
   点击“Finish”退出安装向导。  
   ![安装完成](./images/swift/11.png)

9. **首次启动**  
   安装完成后，Swift 启动器将自动运行，界面如下：  
   ![启动器页面](images/swift/12.png)

10. **等待初始化**  
    启动器首次运行时会进行初始化配置，请耐心等待。初始化完成后，将自动弹出设置向导：  
    ![配置页面](images/swift/13.png)

11. **安装完成**  
    至此，Swift 客户端已成功安装。接下来将进入 **Swift 配置** 环节。

### 3 Swift配置（模型库安装）

#### 3.1 同意使用协议

勾上这两个复选框，前者表示同意使用协议，后者表示向服务器发送崩溃报告。

![image031](./Connected_Flight_Tutorial_assets/image031.png)

#### 3.2 检查数据库

在此页面您也许需要等待一些时间，来让Swift下载运行所必须的数据，当“Next”按钮亮起的时候，代表您可以继续进行下一步了，后续Swift可能会在后台继续下载一些数据。

![image033](./Connected_Flight_Tutorial_assets/image033.png)

#### 3.3 从其他版本复制模型库

如果您曾经安装过其他Swift版本，可以在此页面从其他Swift中复制模型库。

如果您是第一次安装Swift或者不需要其他版本的模型库，则可以直接进行下一步。

![image035](./Connected_Flight_Tutorial_assets/image035.png)

#### 3.4 从其他版本复制配置文件

![image037](./Connected_Flight_Tutorial_assets/image037.png)

#### 3.5 路径配置

1. 对于上方的模拟器，您飞哪个，就勾选哪个 请不要多勾选，后续您需要对每个模拟器进行模型库配置 这里我们以X-Plane为例（其他模拟器操作类似）

   ![image039](./Connected_Flight_Tutorial_assets/image039.png)


2. 首先，需要检查模拟器路径（第一行）和模型库路径（第二行）是否正确， 如果swift没有正确识别，需要点击对应的右侧按钮，手动选择目录

   ![image041](./Connected_Flight_Tutorial_assets/image041.png)


3. 对于其他模拟器，同理 检查无误后，点击save按钮后，进入下一步 （如果有多个模拟器，请全部检查完成并save后再进入下一步）

   ![image043](./Connected_Flight_Tutorial_assets/image043.png)

#### 3.6 创建模型库

这里同样以X-Plane为例：

1. 首先，需要在左侧选择对应的模拟器平台，在这里我们选择X-Plane 然后，注意力来到右侧的models选项卡 第一行，是模型库路径，这里再次检查一下是否正确

   ![image045](./Connected_Flight_Tutorial_assets/image045.png)


2. 然后，点击第二行的display按钮，会弹出如下窗口：

   ![image047](./Connected_Flight_Tutorial_assets/image047.png)

我们点击force reload，耐心等等他重新加载完。

#### 3.7 X-CSL映射

1. 如果您是用的X-CSL官方的下载器下载的，那么会显示报错。

   ![image049](./Connected_Flight_Tutorial_assets/image049.png)


2. 此时我们关掉该报错窗口，然后在任意一个模型上右键：

   ->simulator

   ->Xplane:run CSL2XSB on all models

   ![image051](./Connected_Flight_Tutorial_assets/image051.png)


3. 此时会打开一个黑窗口。

   我们键入y并且回车，等他输出完成后，关掉该窗口。

   ![image053](./Connected_Flight_Tutorial_assets/image053.png)


4. 我们重新force reload一遍。

   ![image055](./Connected_Flight_Tutorial_assets/image055.png)

若一切正常，则您可以看到如上窗口

5. 此时我们关闭最上面的两个窗口，点击create按钮

   ![image058](./Connected_Flight_Tutorial_assets/image058.png)


6. 对于第一个跳出来的窗口，选择Yes

   ![image059](./Connected_Flight_Tutorial_assets/image059.png)


7. 如果之前有创建过模型库，会有第二个窗口，我们同样选择yes

   如果之前没有创建过模型库，则不会有第二个窗口弹出

   ![image061](./Connected_Flight_Tutorial_assets/image061.png)


8. 在最后弹出的窗口中，我们点击右下角的save ‘XPlane’

   ![image063](./Connected_Flight_Tutorial_assets/image063.png)


9. 出现左图的窗口时，说明swift正在保存模型库，需要耐心等待

   ![image065](./Connected_Flight_Tutorial_assets/image065.png)


10. 当该窗口自主消失的时候，说明模型库创建成功，我们可以关掉最上层的窗口

    随后检查一下模型数量，一般来说这个数字是越大越好

    ![image067](./Connected_Flight_Tutorial_assets/image067.png)


11. 对所有模拟器平台都完成上述操作并创建完模型库后，我们进入下一步

    ![image069](./Connected_Flight_Tutorial_assets/image069.png)

#### 3.7 安装xswifbus（仅X-Plane玩家）

由于我们在准备阶段就已经安装完成，所以这里不需要动任何东西，直接进行下一步

如果没有安装，可以点击[这里](#11-swift)再次阅读

#### 3.8 配置快捷键

这里用来配置swift的快捷键，包括PTT等，但由于本平台不使用swift内置的语音，所以该页面可以直接跳过

![image073](./Connected_Flight_Tutorial_assets/image073.png)

至此我们的swift模型库就配置完成了

### 4 服务器配置

1. 点击GUI按钮；或者双击安装目录下swiftguistd.exe ，打开swiftgui页面；

   ![image075](./Connected_Flight_Tutorial_assets/image075.png)

   ![image077](./Connected_Flight_Tutorial_assets/image077.png)

   下图所示是swift的主页面：

   ![image079](./Connected_Flight_Tutorial_assets/image079.png)


2. 我们点击Settings->Server

   ![image081](./Connected_Flight_Tutorial_assets/image081.png)

   ![image083](./Connected_Flight_Tutorial_assets/image083.png)


4. 在下方填写如下信息：

   ![image085](./Connected_Flight_Tutorial_assets/image085.png)

   | 名称        | 左填空栏                                  | 右填空栏       |
                                                                                                               	| ----------- | ----------------------------------------- | -------------- |
   | Name/desc.  | 该服务器显示的名字，可以任意填写          | 服务器的描述   |
   | Eco./type   | FSD (private)                             | FSD (legacy)   |
   | Addr./port  | fsd.apocfly.com                           | 6809           |
   | Real name   | 自己的昵称 |                |
   | Id/password | 登录飞控的呼号                            | 登录飞控的密码 |

   !!! Note

   	根据[CoC 2.9](../../General/OPDOC-General-202502-R2-SC/?h=%E5%90%88%E7%90%86%E7%9A%84%E5%90%8D%E7%A7%B0#_5)有关规定您必须在Real name，填写以下中一项：
   	 
   	- 注册CID
   	
   	- 注册昵称
   	
   	- 注册邮箱


3. 全部填写完成后，点击右下角save

   ![image087](./Connected_Flight_Tutorial_assets/image087.png)

### 5 swift使用说明

下面为swift的主界面，我们仅对几个经常用到的功能做详细说明

![image089](./Connected_Flight_Tutorial_assets/image089.png)

#### 5.1 Connect页面

该页面是用于连接服务器的页面
Swift 版本不同该页面可能会有些许不同，但操作逻辑相同

![image084](./Connected_Flight_Tutorial_assets/image084.png)

![image091](./Connected_Flight_Tutorial_assets/image091.png)

- 检查上方Network 选项框，选择Other Servers

- 下面选择APOC服务器

- Login这里需要检查是否是Normal位置，如果不是，检查模拟器启动是否正常

---

- 下方的Pilot Info，检查无误即可

- Home这里可以填你的基地机场，选一个自己喜欢的机场ICAO码填进去就行

---

- 最后一个区域，需要检查Callsign 是否正确

- Aircraft 是否是自己执飞的机型

- Airline 是否是自己执飞的航司

- 全部检查无误以后点击Connect 连接

---

![image093](./Connected_Flight_Tutorial_assets/image093.png)

当显示该页面的并且左下角变成绿色，代表你已经连接成功
!!! Warning

    警告：请不要在跑道/滑行道上出生，这是违反[CoC 3.6](../../General/OPDOC-General-202502-R2-SC.md?h=%E4%B8%8D%E5%BE%97%E5%9C%A8%E7%83%AD%E5%8C%BA%E8%BF%9B%E8%A1%8C%E8%BF%9E%E7%BA%BF#_6)的违规行为

#### 5.2 飞行计划页面

!!! Note

    注：如果您对此部分感到困惑，不妨试试我们的网页提交计划功能，[点此进入](https://www.apocfly.com/flight-plan)
        
    !!! Note
    
        此功能仅限[APOC模拟飞行平台](https://www.apocfly.com)使用

![image095](./Connected_Flight_Tutorial_assets/image095.png)

点击`Flight pl.`进入飞行计划页面，界面如下：

![image097](./Connected_Flight_Tutorial_assets/image097.png)

---

飞行计划填写的顺序是，自左向右，自上而下填写，如下图所示：

![image099](./Connected_Flight_Tutorial_assets/image099.png)

解析如下：

1 Type：飞行类型，一般我们航线飞行选择IFR即可
2 Callsign：航班呼号，在上面连接的时候填写，这里无法修改
3 Aircraft：飞机的ICAO 识别码，swift自动填写，一般不用动
4 Wake Turbulence Category：尾流类型，swift自动填写，一般不用动

---

5 NAV/COM Equipment：导航和通讯设备代码，表明飞机的导航和通讯能力，如果不知道填什么，可以不用动

6 SSR Equipment：二次雷达代码，表明飞机的二次雷达设备能力，如果不知道填什么，可以不用动

7 TAS：计划飞行的真空速，如果不知道数值，可以不填，也可以填一个经验值（400-450）

---

8 Departure airport：离场机场，填写离场机场的ICAO码

9 Departure time：计划离场时间，UTC时间，不了解可以不用管

10 Cruising altitude：计划巡航高度，以英尺作为单位，如果飞国内航线需注意米制转换

---

11 Route：计划航路

---

12 Destination airport：到达机场，填写到达机场的ICAO码

13 Est.time enroute：计划航路时间，计划的飞行时间，不清楚可以不填

14 Fuel on board：机载燃油的飞行时间，不清楚可以不填

16 Alternate Airport：备降机场，填写备降机场的ICAO码，没有备降场可以不填

17 remarks：备注信息，备注信息右侧的下拉框表示交流类型；

- Full voice 表示可以接受双向语音管制；

- Receive vioce 表示只能单向接受语音管制；

- Text only 表示只能接受双向文字管制；

!!! Note

    注：在管制空域内，此处提交的内容只需要提交一次，若您认为飞行计划有问题或管制员告知您的飞行计划有误时，您仅需要在您的飞机上进行更改，而您的计划，管制员会帮忙进行更改。
    !!! Note
    
        此功能仅限[APOC模拟飞行平台](https://www.apocfly.com)使用

---

确认所有内容填写正确后，点击Send 按钮发送飞行计划到服务器（若不放心您也可以多点几下）

![image101](./Connected_Flight_Tutorial_assets/image101.png)

出现下方窗口代表发送成功

![image103](./Connected_Flight_Tutorial_assets/image103.png)

#### 5.3 消息界面

![image105](./Connected_Flight_Tutorial_assets/image105.png)

!!! Note

    如果您收到了此消息：
    
    ![image106](./Connected_Flight_Tutorial_assets/image106.png)
    
    那么证明您的计划已经在网页提交了，但是本次飞行的航班呼号和网页提交的不同，请您回至[connect页面](#51-connect)重新检查
    !!! Note
        此功能仅限[APOC模拟飞行平台](https://www.apocfly.com)使用

---

这里主要用于与管制员的文字交流

先点击Message to，在选择要发送到的管制席位

最后在下面Message 中输入内容，随后按下回车，即可发送消息

如果要在频道内发送消息，则点击上方COM1 或者COM2

在下方输入框中输入消息，回车发送即可

![image107](./Connected_Flight_Tutorial_assets/image107.png)

#### 5.4 ATC页面

用于查看周围在线的管制员

![image109](./Connected_Flight_Tutorial_assets/image109.png)

#### 5.5 Radar页面

用于查看周围的机组

![image111](./Connected_Flight_Tutorial_assets/image111.png)

#### 5.6 Aircraft页面

同样可以查看周围的机组，不过是以列表形式展现

![image113](./Connected_Flight_Tutorial_assets/image113.png)

### 6 联飞说明

**不要使用**不熟悉的机模进行连飞活动！

**不要使用**不熟悉的机模进行连飞活动！！

**不要使用**不熟悉的机模进行连飞活动！！！

- 不熟悉指：无法熟练使用自动驾驶或其他机载设备，准确无误的完成管制员的指令，并在管制员询问飞机状态时准确无误的回答

所以，参加连飞活动请务必、一定、必须使用自己熟悉的机模

这**不仅仅**保障了你有一个良好的活动体验，也同时保障了其他活动参与者和管制员的活动体验

## 后记

连飞从来不仅是一场飞行模拟，更是一段人与人之间的协作与交流体验。

无论您是第一次踏入虚拟蓝天的新飞行员，还是已在各大网络飞行平台积累了丰富经验的资深机长，我们都希望本指南能为您带来清晰的方向与可靠的参考，帮助您更加顺利地融入联飞环境。

航空是一门严谨的学科，联飞亦然。规范、沟通、尊重与默契，是让每一次联飞变得愉快而富有成就感的关键。请记住：您的每一份准备、每一次遵守流程、每一次与他人的有效协作，都是让天空更加有序与和谐的重要力量。

若您在阅读本教程的过程中遇到疑问、发现疏漏、或愿意贡献改进内容，我们诚挚欢迎您提出建议。您的反馈将使本教程不断完善，也能帮助更多飞行员收获更好的联飞体验。

愿我们在无线电中相遇，在航迹上并肩，在虚拟的天空里，共同飞得更高、更远。

期待在下一次的联飞活动中，与您在空中相见。

## 参考资料

[1] [Swift.文档站](https://swift-project.org/)