# 机模映射包

## 1. 关于机模映射包

机模映射包是完整联飞体验中不可或缺的一环。不同模拟飞行平台和软件使用的映射包可能有所不同，但其底层工作原理均可概括为以下三步：

1. **识别机模**：模拟飞行软件与联飞客户端共同读取并识别本地的`飞机模型`（即`机模`）。
2. **添加飞机**：在模拟飞行环境中生成对应的`AI飞机`。
3. **实时映射**：联飞客户端根据连飞服务器上其他飞友的实时状态数据，同步驱动这些`AI飞机`的位置、姿态等状态（即`映射`过程）。

通过上述流程，服务器上的其他飞机便被`映射`至您本地的模拟飞行软件中。

简而言之：**`机模`由映射包提供，而`映射`动作则由联飞软件负责执行。**

## 2. MSFS 2020/2024 映射

MSFS 2020/2024 用户目前主要有三种 AI 机模来源可供选择：

| 方案                                    | 特点                     | 获取方式                                                               |
|---------------------------------------|------------------------|--------------------------------------------------------------------|
| **AIG (Alpha India Group)**           | 模型质量高，机型丰富             | 通过 [AI Manager](https://www.alpha-india.net/) 下载安装                 |
| **FSLTL**                             | 同样具备高质量模型              | 通过 [FlyByWire Installer](https://flybywiresim.com/downloads/) 下载安装 |
| **MTL (Multiplayer Traffic Library)** | 模型精细度略逊于前两者，但包含一些独有的机型 | 通过 [MTL Installer](https://mtl.ivao.aero/installer) 获取             |

> [!NOTE]
> 本文**推荐使用 AIG 映射包**，因其模型质量与机型覆盖范围较为均衡  
> 具体如何使用官方下载器或者安装器安装模型库暂不在此赘述，有需要者请自行搜索

**百度网盘下载（MSFS2020）** ：[百度网盘](https://pan.baidu.com/s/1XqG9CY67HrVxxQrigMnTFQ?pwd=apoc)
**百度网盘下载（MSFS2024）** ：[百度网盘](https://pan.baidu.com/s/1IEyzBKcvEENSSuf97u4CCg?pwd=apoc)

下载后请手动解压到 MSFS 的 `Community` 目录下，**注意不要产生文件夹嵌套**。

## 3. X-Plane 11/12 映射

X-Plane 平台目前最主流的 CSL 模型分发方为 **BlueBell** 与 **X-CSL**。

> [!NOTE]
> 本文**推荐使用 X-CSL** 作为映射包，其机型覆盖面较广且更新较为活跃。

**安装注意事项**：

1. **存放位置**：CSL 模型必须放置在 X-Plane 程序目录内部，推荐统一存放在 `Custom Data` 文件夹下。
2. **目录结构**：建议在 `Custom Data` 下先创建 `CSL` 父文件夹，再将不同来源的 CSL 包分别放入子文件夹中，例如：
   ```
   .../X-Plane 12/Custom Data/CSL/X-CSL
   .../X-Plane 12/Custom Data/CSL/BB
   ```
3. **版本要求**：X-Plane 11.50 及以上版本仅支持 OBJ8 格式的 CSL 模型，OBJ7 及更旧版本将无法使用。

**网盘下载（X-CSL 映射包）** ：

- [百度网盘](https://pan.baidu.com/s/127Qg2o0ec8uhrZ4n8_ws-w?pwd=apoc)
- [123云盘](https://www.123912.com/s/oFMGTd-Rs4gv)（提取码：`tZgp`）

下载后请解压到 X-Plane 目录下的任意位置（推荐 `Custom Data` 文件夹），
**文件夹名称可自定义，但必须位于 X-Plane 目录内**，X-Plane 无法读取目录以外的文件。
