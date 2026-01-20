'use client';

import { memo } from 'react';
import { Clock, Trophy, ChevronRight, Star, Target, Map, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { courses, Course } from '@/lib/data';
import { useProgress } from '@/hooks/useProgress';

/**
 * 难度星级组件 - 抽离以减少不必要的重渲染
 * 优化：移除 backdrop-blur，改用纯色背景
 */
const DifficultyStars = memo(({ stars }: { stars: number }) => (
  <div className="absolute top-4 right-4 flex gap-0.5 bg-black/40 px-2 py-1.5 rounded-full border border-white/10">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-2.5 h-2.5 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} 
      />
    ))}
  </div>
));

DifficultyStars.displayName = 'DifficultyStars';

/**
 * 课程卡片组件 - 抽离并使用 memo 优化性能
 * 优化：
 * 1. 移除 -translate-y 和过大的 scale，改用轻量动效
 * 2. 移除 backdrop-blur
 * 3. 使用 will-change 优化渲染
 */
const CourseCard = memo(({ course, stars, isLastWorld, completedLessons, totalLessons }: { 
  course: Course, 
  stars: number, 
  isLastWorld: boolean,
  completedLessons: number,
  totalLessons: number
}) => (
  <div className="w-full md:w-[30%] group relative will-change-transform flex flex-col">
    {/* 节点标记 */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 hidden md:block">
      <div className={`w-6 h-6 rounded-full border-4 shadow-sm transition-all duration-300 flex items-center justify-center ${
        completedLessons === totalLessons 
          ? 'bg-green-500 border-green-200' 
          : 'bg-white border-indigo-500 group-hover:border-indigo-600'
      }`}>
        {completedLessons === totalLessons ? (
          <CheckCircle2 className="w-3 h-3 text-white" />
        ) : (
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        )}
      </div>
    </div>
    
    {/* 终点特别装饰 */}
    {isLastWorld && (
      <div className="absolute -right-4 -top-12 z-30 hidden md:block">
        <div className="relative">
          <Trophy className="w-10 h-10 text-amber-400 drop-shadow-sm relative z-10" />
        </div>
      </div>
    )}

    <Link href={`/courses/${course.id}`} className="flex-1 flex flex-col">
      <div className="relative bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden group-hover:shadow-lg transition-all duration-300 flex-1 flex flex-col">
        {/* 图片区域 */}
        <div className="h-44 relative overflow-hidden bg-slate-100 shrink-0">
          <img 
            src={`${course.image}&w=600&q=75`} 
            alt={course.title} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/30 rounded-lg border border-white/10">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              WORLD {course.worldId.split('-')[1]}
            </span>
          </div>

          <DifficultyStars stars={stars} />

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-2xl font-black text-white leading-tight">
              {course.title}
            </h3>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-5 flex-1 flex flex-col">
          <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
            {course.description}
          </p>

          <div className="mt-auto space-y-5">
            <div className="flex items-center justify-between py-3 border-y border-slate-50 text-[11px] font-bold text-slate-400">
               <div className="flex items-center gap-1.5">
                 <Clock className="w-3.5 h-3.5" /> {course.duration}
               </div>
               <div className="flex items-center gap-1.5">
                 <Target className="w-3.5 h-3.5" /> {course.lessons} 关卡
               </div>
               <div className="flex items-center gap-1.5 text-amber-500">
                 <Trophy className="w-3.5 h-3.5" /> {course.xpReward} XP
               </div>
            </div>

            <div className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-indigo-600 transition-all">
              立即探索 <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
));

CourseCard.displayName = 'CourseCard';

/**
 * 探索地图页面组件
 */
export default function CoursesPage() {
  const { totalXP, completedLevels, isLoaded } = useProgress();

  const getDifficultyStars = (level: string) => {
    switch (level) {
      case '入门': return 1;
      case '初级': return 2;
      case '中级': return 3;
      case '高级': return 4;
      case '专家': return 5;
      default: return 1;
    }
  };

  const rows = [
    courses.slice(0, 3),
    courses.slice(3, 6)
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col bg-slate-50">
      {/* 移除背景装饰 blob，改为更轻量的渐变背景 */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-50/30 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 flex flex-col w-full">
        {/* Header Area */}
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
              <Map className="w-3 h-3" />
              大师之路进度
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              探索<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">地图</span>
            </h1>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-2xl opacity-10"></div>
            <div className="relative bg-white rounded-2xl border border-amber-100 p-3 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest">总经验</p>
                <p className="text-xl font-black text-slate-900 tabular-nums">
                  {totalXP} <span className="text-[10px] font-bold text-slate-400 ml-1">经验值</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* S-Path Map Container */}
        <div className="relative flex-1 flex flex-col justify-center py-4">
          {/* SVG Path Connector - 使用 --color-indigo-600 实线 */}
          <div className="absolute inset-0 pointer-events-none hidden md:block will-change-transform">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path 
                d="M 166 150 L 500 150 L 833 150 C 950 150 950 450 833 450 L 500 450 L 166 450" 
                fill="none" 
                stroke="var(--color-indigo-600)" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="space-y-16">
            {rows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-12 px-4 ${
                  rowIndex === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {row.map((course) => {
                  const stars = getDifficultyStars(course.level);
                  const isLastWorld = course.id === 6;
                  
                  // 计算该课程完成的关卡数
                  const courseCompletedLevels = course.syllabus?.filter(s => 
                    completedLevels.includes(`${course.id}-${s.levelId}`)
                  ).length || 0;
                  const totalLessons = course.syllabus?.length || 0;

                  return (
                    <CourseCard 
                      key={course.id}
                      course={course}
                      stars={stars}
                      isLastWorld={isLastWorld}
                      completedLessons={courseCompletedLevels}
                      totalLessons={totalLessons}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
