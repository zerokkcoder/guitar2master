export interface PracticeNote {
  note: string;
  midi: number;
  duration: number;
  hint: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  notes: PracticeNote[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  image: string;
  worldId: string; // Linked to game world
  xpReward: number;
  content?: string; // Markdown content
  syllabus?: { title: string; duration: string; levelId?: string }[];
  practice?: PracticeExercise[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: '第一世界：觉醒之初',
    description: '踏入吉他的奇幻世界，从认识你的武器开始。',
    level: '入门',
    duration: '1 小时',
    lessons: 3,
    worldId: 'world-1',
    xpReward: 450,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    content: `# 1-1 幻琴森林：构造之谜

欢迎来到吉他大师之路的第一关！在开始弹奏之前，你需要彻底了解你手中的“武器”——吉他。

## 科学视角：吉他如何发声？

吉他是一种**弦鸣乐器**。它的发声原理遵循声学物理规律：

1.  **振动源**：当你拨动琴弦时，琴弦产生往复振动。
2.  **传导**：振动通过**琴桥 (Bridge)** 传导至**面板 (Top)**。
3.  **共鸣**：面板的振动带动**共鸣箱 (Body)** 内的空气柱发生共鸣。
4.  **辐射**：声音最终通过**音孔 (Sound Hole)** 向外辐射。

> **大师笔记**：面板的材质（如单板云杉或红松）直接决定了音色的质感。

## 关卡任务：认识三大核心部位

### 1. 琴头 (The Headstock) —— 控制中心
*   **弦钮 (Tuning Pegs)**：这是调整琴弦张力的装置。
*   **上枕 (The Nut)**：琴弦在琴头端的支撑点。

### 2. 琴颈 (The Neck) —— 战场
*   **指板 (The Fretboard)**：你手指按压的地方。
*   **品丝 (Frets)**：横在指板上的金属条。每一格代表一个**半音**。

### 3. 琴箱 (The Body) —— 心脏
*   **面板 (Top)**：吉他最重要的发声部分。
*   **音孔 (Sound Hole)**：释放共鸣后的声音。

---

## 1-2 律动之泉：六弦调音

音准是音乐的生命线。在这一关，你将学习如何让六根琴弦回到它们原本的律动频率。

## 科学视角：标准音高 (Standard Tuning)

吉他标准调音的六根弦从粗到细（6弦到1弦）对应的频率大约是：

*   **6 弦 (E2)**: 82.41 Hz
*   **5 弦 (A2)**: 110.00 Hz
*   **4 弦 (D3)**: 146.83 Hz
*   **3 弦 (G3)**: 196.00 Hz
*   **2 弦 (B3)**: 246.94 Hz
*   **1 弦 (E4)**: 329.63 Hz

## 关卡任务：调音口诀

为了方便记忆，我们使用口诀：**“一百个大阿姨”** (E B G D A E - 1至6弦)。

### 调音步骤：
1.  使用本系统的**[调音器](/tools)**。
2.  拨动琴弦，观察指针，调至居中变绿。

---

## 1-3 均衡之塔：持琴秘籍

持琴的核心在于找到吉他与身体的**三个接触点**，形成稳定的三角形：

1.  **接触点 A**：琴箱凹陷处放在腿上。
2.  **接触点 B**：右前臂搭在琴箱边缘。
3.  **接触点 C**：胸部轻微接触琴箱背面。

## 关卡要点：三不原则
*   **不低头**、**不耸肩**、**不夹臂**。
`,
    syllabus: [
      { title: '关卡 1-1: 构造之谜', duration: '10:00', levelId: '1-1' },
      { title: '关卡 1-2: 六弦调音', duration: '20:00', levelId: '1-2' },
      { title: '关卡 1-3: 持琴秘籍', duration: '15:00', levelId: '1-3' },
    ],
    practice: [
      {
        id: 'p1-2',
        title: '空弦音跟练 (关卡 1-2 挑战)',
        description: '请依次弹奏6弦到1弦的空弦音，系统将检测您的音准。',
        notes: [
          { note: 'E', midi: 40, duration: 0, hint: '6弦 (最粗)' },
          { note: 'A', midi: 45, duration: 0, hint: '5弦' },
          { note: 'D', midi: 50, duration: 0, hint: '4弦' },
          { note: 'G', midi: 55, duration: 0, hint: '3弦' },
          { note: 'B', midi: 59, duration: 0, hint: '2弦' },
          { note: 'E', midi: 64, duration: 0, hint: '1弦 (最细)' },
        ]
      }
    ]
  },
  {
    id: 2,
    title: '第二世界：指尖舞者',
    description: '通过刻苦的训练，让手指在弦上轻盈起舞。',
    level: '入门',
    duration: '2 小时',
    lessons: 3,
    worldId: 'world-2',
    xpReward: 750,
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=800',
    content: `# 2-3 阶梯训练：半音阶爬行

爬格子练习的本质是**神经募集 (Neural Recruitment)**。通过高重复、慢速度的动作，建立指尖肌肉的专属信号通路。

## 科学视角：同步性与颗粒感
*   **同步性**：左手按弦瞬间与右手拨弦瞬间完全重合。
*   **颗粒感**：每一个音符都应该是清晰、饱满且独立的。

## 关卡任务：1-2-3-4 练习 (1弦)
1.  **食指**按 1 品。
2.  **中指**按 2 品。
3.  **无名指**按 3 品。
4.  **小指**按 4 品。

### 技术细节：
*   **靠近品丝**：最省力。
*   **手指保留**：锻炼独立性。
`,
    syllabus: [
      { title: '关卡 2-1: 右手拨法', duration: '20:00', levelId: '2-1' },
      { title: '关卡 2-2: 六线谱基础', duration: '15:00', levelId: '2-2' },
      { title: '关卡 2-3: 半音阶挑战', duration: '30:00', levelId: '2-3' },
    ],
    practice: [
      {
        id: 'p2-3',
        title: '1弦半音阶挑战 (关卡 2-3 挑战)',
        description: '请在1弦上依次弹奏1、2、3、4品，保持节奏稳定。',
        notes: [
          { note: 'F', midi: 65, duration: 0, hint: '1弦 1品 (食指)' },
          { note: 'F#', midi: 66, duration: 0, hint: '1弦 2品 (中指)' },
          { note: 'G', midi: 67, duration: 0, hint: '1弦 3品 (无名指)' },
          { note: 'G#', midi: 68, duration: 0, hint: '1弦 4品 (小指)' },
        ]
      }
    ]
  },
  {
    id: 3,
    title: '第三世界：和弦之门',
    description: '学习吉他的核心语言，解锁无限的伴奏可能。',
    level: '初级',
    duration: '2.5 小时',
    lessons: 3,
    worldId: 'world-3',
    xpReward: 1000,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    content: `# 3-1 几何乐章：C大调和弦

和弦是吉他的灵魂。在这一关，我们将学习最基础的 C 和弦。

## 科学视角：和弦共鸣
当多个频率按照特定的数学比例（如 4:5:6 的大三和弦）同时振动时，会产生令人愉悦的和谐感。

## 关卡任务：掌握 C, Am, Em, G
*   **C 和弦**：基础中的基础。
*   **Am 和弦**：忧郁的色彩。
*   **Em 和弦**：最简单的两指和弦。
*   **G 和弦**：明亮的终章。

### 核心技巧：保留指 (Pivot Fingers)
在 C 和 Am 之间转换时，食指和中指是不需要动的！这就是几何上的最优路径。
`,
    syllabus: [
      { title: '关卡 3-1: C大调和弦', duration: '45:00', levelId: '3-1' },
      { title: '关卡 3-2: 和弦转换秘籍', duration: '30:00', levelId: '3-2' },
      { title: '关卡 3-3: 循环迷宫', duration: '45:00', levelId: '3-3' },
    ],
    practice: [
      {
        id: 'p3-1',
        title: 'C和弦根音挑战',
        description: '请弹奏 C 和弦的根音（5弦3品），确保声音清晰。',
        notes: [
          { note: 'C', midi: 48, duration: 0, hint: '5弦 3品 (无名指)' },
        ]
      }
    ]
  },
  {
    id: 4,
    title: '第四世界：律动之城',
    description: '掌握音乐的脉搏，用扫弦点燃听众的热情。',
    level: '初级',
    duration: '2 小时',
    lessons: 4,
    worldId: 'world-4',
    xpReward: 1200,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=800',
    content: `# 4-1 脉搏跳动：4/4 拍基础
    
音乐的灵魂在于节奏。在律动之城，我们将学习最基础的 4/4 拍。

## 科学视角：大脑对节奏的同步 (Entrainment)
人类大脑具有一种天然的“同步”机制，当听到有规律的节拍时，神经元会成群地按照该频率发放冲动。

## 关卡任务：扫弦要领
*   **动作**：像甩掉手上的水滴一样放松手腕。
*   **下扫**：用食指指甲背。
*   **上扫**：用拇指指甲背。

---

## 4-2 扫弦公式：民谣摇滚
这是流行音乐中使用率最高的节奏型之一。

\`↓   ↓ ↑   ↑ ↓ ↑\`
(下  下上  空上 下上)

> **练习建议**：先用左手轻轻按住琴弦（消音），只练习右手的节奏感。
`,
    syllabus: [
      { title: '关卡 4-1: 脉搏跳动', duration: '15:00', levelId: '4-1' },
      { title: '关卡 4-2: 扫弦公式', duration: '20:00', levelId: '4-2' },
      { title: '关卡 4-3: 节奏切分', duration: '30:00', levelId: '4-3' },
      { title: '关卡 4-4: 律动合奏', duration: '30:00', levelId: '4-4' },
    ]
  },
  {
    id: 5,
    title: '第五世界：力量之巅',
    description: '攻克吉他手的第一个“大BOSS”——大横按 F 和弦。',
    level: '中级',
    duration: '3 小时',
    lessons: 3,
    worldId: 'world-5',
    xpReward: 1500,
    image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?auto=format&fit=crop&q=80&w=800',
    content: `# 5-1 绝望之墙：攻克 F 和弦
    
为什么 F 和弦是大横按的终结者？因为你的食指需要同时封死六根琴弦。

## 科学视角：杠杆原理
左手拇指的位置至关重要。它应该位于琴颈背部的中点，与中指形成相对的压力，像一把老虎钳一样夹住琴颈。

## 关卡任务：大横按技巧
1.  **侧面接触**：用食指外侧较硬的骨头接触琴弦，而非肉质部分。
2.  **靠近品丝**：这是杠杆最省力的地方。
3.  **下拉力量**：利用右手拨弦手臂对琴箱的压力，产生杠杆力，让琴颈自然向左手掌心靠拢。

---

## 5-2 几何平移：横按的魔力
一旦你学会了 F 和弦，你就学会了所有大三和弦！只需在指板上移动这个形状。
`,
    syllabus: [
      { title: '关卡 5-1: 绝望之墙', duration: '30:00', levelId: '5-1' },
      { title: '关卡 5-2: 几何平移', duration: '60:00', levelId: '5-2' },
      { title: '关卡 5-3: 力量进阶', duration: '45:00', levelId: '5-3' },
    ]
  },
  {
    id: 6,
    title: '第六世界：独奏剧场',
    description: '一把吉他就是一个乐队，开启指弹独奏的新篇章。',
    level: '中级',
    duration: '2.5 小时',
    lessons: 3,
    worldId: 'world-6',
    xpReward: 2000,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    content: `# 6-1 编织音符：分解和弦
    
指弹（Fingerstyle）是音乐的刺绣。

## 科学视角：多任务处理
大脑需要同时管理三个逻辑层：
1.  **Bass (低音层)**：通常由大拇指负责，提供节奏基石。
2.  **Harmony (和声层)**：中间音弦的填充。
3.  **Melody (旋律层)**：高音弦上的主旋律。

## 关卡任务：T1213121 模式
这是最经典的分解和弦模式。
- T (Thumb): 根音
- 1 (Index): 3弦
- 2 (Middle): 2弦
- 3 (Ring): 1弦
`,
    syllabus: [
      { title: '关卡 6-1: 编织音符', duration: '40:00', levelId: '6-1' },
      { title: '关卡 6-2: 旋律线索', duration: '60:00', levelId: '6-2' },
      { title: '关卡 6-3: 最终演出', duration: '15:00', levelId: '6-3' },
    ]
  },
];
