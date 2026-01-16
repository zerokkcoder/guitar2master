export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  image: string;
  content?: string; // Markdown or HTML content for the course detail
  syllabus?: { title: string; duration: string }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: '吉他入门基础',
    description: '认识吉他构造，学习持琴姿势，掌握基本的右手拨弦和左手按弦技巧。',
    level: '入门',
    duration: '2 小时',
    lessons: 12,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    content: `
### 课程简介
欢迎来到吉他世界！本课程专为零基础学员设计。我们将从最基础的吉他构造讲起，手把手教你如何正确持琴、调音，以及左右手的基本配合。

### 你将学到
- 吉他的种类与构造
- 标准持琴姿势（坐姿与站姿）
- 认识六根琴弦与调音
- 右手拇指与食指拨弦
- 左手按弦要点与爬格子练习
    `,
    syllabus: [
      { title: '吉他构造与选购指南', duration: '10:00' },
      { title: '持琴姿势与右手拨弦', duration: '15:00' },
      { title: '认识六线谱 (TAB)', duration: '12:00' },
      { title: '左手按弦技巧', duration: '18:00' },
      { title: '爬格子练习 (半音阶)', duration: '20:00' },
    ]
  },
  {
    id: 2,
    title: '和弦转换与扫弦',
    description: '学习 C 大调常用和弦，掌握和弦转换技巧，练习基本的扫弦节奏型。',
    level: '初级',
    duration: '3 小时',
    lessons: 15,
    image: 'https://images.unsplash.com/photo-1549297160-5f2fa661848f?auto=format&fit=crop&q=80&w=800',
    content: `
### 课程简介
掌握了单音演奏后，我们将进入和弦的世界。和弦是吉他伴奏的灵魂。本课程将带你攻克 C、Am、F、G 等常用和弦，并学习流畅的转换技巧。

### 你将学到
- C 大调顺阶和弦
- 和弦转换的"保留指"与"移动指"技巧
- 4/4 拍基础扫弦节奏型
- 简单的弹唱实战
    `,
    syllabus: [
      { title: 'C 大调音阶与和弦理论', duration: '15:00' },
      { title: 'C 和弦与 Am 和弦', duration: '12:00' },
      { title: '和弦转换专项训练', duration: '20:00' },
      { title: 'F 和弦（小横按）攻略', duration: '25:00' },
      { title: '扫弦节奏型 (Down-Down-Up)', duration: '15:00' },
    ]
  },
  {
    id: 3,
    title: '指弹独奏入门',
    description: '学习简单的指弹独奏曲目，如《小星星》、《生日快乐》，培养独奏能力。',
    level: '中级',
    duration: '4 小时',
    lessons: 18,
    image: 'https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&q=80&w=800',
    content: `
### 课程简介
指弹（Fingerstyle）让一把吉他能同时演奏旋律、伴奏和低音。本课程将带你迈入指弹的大门，体验独奏的魅力。

### 你将学到
- 指弹谱的阅读方法
- 分解和弦与旋律的结合
- 独奏曲目实战：《小星星》、《生日快乐》
- 简单的击勾弦技巧
    `,
    syllabus: [
      { title: '指弹基础概念', duration: '10:00' },
      { title: '分解和弦练习', duration: '15:00' },
      { title: '实战：《小星星》主歌', duration: '20:00' },
      { title: '实战：《小星星》副歌', duration: '20:00' },
      { title: '实战：《生日快乐》', duration: '25:00' },
    ]
  },
];
