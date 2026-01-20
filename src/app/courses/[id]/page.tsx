import { ArrowLeft, BookOpen, Trophy, Sparkles, CheckCircle2, Clock, Target, Share2, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { courses } from '@/lib/data';
import { PracticeMode } from '@/components/PracticeMode';

/**
 * 课程详情页面 (Server Component)
 */
export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ level?: string }>;
}) {
  const { id } = await params;
  const { level } = await searchParams;
  
  const courseId = Number(id);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  // 默认选中第一个关卡
  const activeLevelId = level || (course.syllabus && course.syllabus.length > 0 ? course.syllabus[0].levelId : null);
  
  let content = course.content || '';

  if (activeLevelId) {
    const filePath = path.join(process.cwd(), 'docs', 'tutorial', course.worldId, `level-${activeLevelId}.md`);
    try {
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
      }
    } catch (error) {
      console.error('Error reading markdown file:', error);
    }
  }

  const currentPractice = course.practice?.filter(p => p.id.includes(activeLevelId || ''));
  const currentSyllabusIndex = course.syllabus?.findIndex(s => s.levelId === activeLevelId) ?? 0;
  const progressPercent = Math.round(((currentSyllabusIndex + 1) / (course.syllabus?.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
      {/* 顶部导航 */}
      <nav className="flex items-center justify-between mb-12">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:shadow-md transition-all group border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回探索地图
        </Link>
        <div className="hidden md:flex items-center gap-6">
           <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{course.duration}</span>
           </div>
           <div className="w-px h-4 bg-slate-200" />
           <div className="flex items-center gap-2 text-indigo-500">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">+{course.xpReward} 经验值</span>
           </div>
        </div>
      </nav>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          <header className="relative p-10 md:p-14 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 min-h-[320px] flex items-end">
            {/* 封面图背景 */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={course.image} 
                alt={course.title}
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32 rounded-full z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-[80px] -ml-24 -mb-24 rounded-full z-0" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  第 {course.worldId.split('-')[1]} 世界 · 关卡 {activeLevelId}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {course.syllabus?.find(s => s.levelId === activeLevelId)?.title || course.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-medium">
                {course.description}
              </p>
            </div>
          </header>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-16">
              <div className="prose prose-slate max-w-none 
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h1:text-4xl prose-h1:mb-8
                prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100
                prose-h3:text-xl prose-h3:mt-10
                prose-p:text-slate-600 prose-p:leading-loose prose-p:text-lg
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-100 prose-img:my-12
                prose-ul:space-y-3 prose-li:text-slate-600 prose-li:text-lg
                ">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ src, alt }) => {
                      if (!src || typeof src !== 'string') return null;
                      const fileName = src.split('/').pop();
                      // Next.js 中静态资源路径优化
                      const resolvedSrc = `/docs/images/${fileName}`;
                      return (
                        <span className="block my-12 group relative">
                          <Image 
                            src={resolvedSrc} 
                            alt={alt || ''} 
                            width={800}
                            height={450}
                            className="rounded-3xl shadow-2xl border border-slate-100 mx-auto transition-transform duration-700 group-hover:scale-[1.02] w-auto h-auto"
                            unoptimized={resolvedSrc.endsWith('.svg')}
                          />
                          {alt && <span className="block text-center text-sm text-slate-400 mt-4 font-medium italic">{alt}</span>}
                        </span>
                      );
                    },
                    h2: ({ children }) => (
                      <h2 className="flex items-center gap-3">
                        <span className="block w-1.5 h-8 bg-indigo-500 rounded-full" />
                        {children}
                      </h2>
                    )
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Practice Mode Section */}
          {currentPractice && currentPractice.length > 0 && (
            <section className="space-y-8 animate-fade-in pt-8">
              <div className="flex items-center justify-between px-2">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Target className="w-8 h-8 text-rose-500" />
                    实战演练
                  </h2>
                  <p className="text-slate-500 font-medium">拿起吉他，完成本关卡的终极挑战</p>
                </div>
                <div className="px-5 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  互动实验室
                </div>
              </div>
              <div className="grid gap-8">
                {currentPractice.map((exercise) => (
                  <div key={exercise.id} className="bg-slate-950 rounded-4xl p-10 shadow-2xl shadow-indigo-200/40 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] -mr-48 -mt-48 rounded-full transition-opacity opacity-50 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mb-8">
                        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">挑战模式</span>
                        <h3 className="text-2xl font-black text-white mt-2">{exercise.title}</h3>
                      </div>
                      <PracticeMode 
                        exercise={exercise} 
                        courseId={course.id}
                        levelId={activeLevelId || ''}
                        xpReward={Math.round(course.xpReward / course.lessons)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 关卡切换 */}
          <div className="flex items-center justify-between pt-12 border-t border-slate-100">
             {currentSyllabusIndex > 0 ? (
               <Link 
                 href={`/courses/${id}?level=${course.syllabus![currentSyllabusIndex - 1].levelId}`}
                 className="flex flex-col items-start gap-2 group"
               >
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">上一关</span>
                 <span className="flex items-center gap-2 text-slate-900 font-black group-hover:text-indigo-600 transition-colors">
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                   {course.syllabus![currentSyllabusIndex - 1].title}
                 </span>
               </Link>
             ) : <div />}

             {currentSyllabusIndex < (course.syllabus?.length || 0) - 1 ? (
               <Link 
                 href={`/courses/${id}?level=${course.syllabus![currentSyllabusIndex + 1].levelId}`}
                 className="flex flex-col items-end gap-2 group text-right"
               >
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">下一关</span>
                 <span className="flex items-center gap-2 text-slate-900 font-black group-hover:text-indigo-600 transition-colors">
                   {course.syllabus![currentSyllabusIndex + 1].title}
                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
               </Link>
             ) : <div />}
          </div>
        </div>

        {/* Sidebar / Syllabus */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  关卡目录
                </h3>
                <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {course.lessons} 个任务
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {course.syllabus?.map((lesson, index) => {
                  const isActive = activeLevelId === lesson.levelId;
                  const isCompleted = index < currentSyllabusIndex;

                  return (
                    <Link 
                      key={index}
                      href={`/courses/${id}?level=${lesson.levelId}`}
                      className={`group flex items-center w-full text-left gap-4 p-5 rounded-2xl transition-all border ${
                        isActive 
                          ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-200' 
                          : 'bg-white border-slate-50 hover:bg-slate-50 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100'
                      }`}
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-2xl text-sm font-black flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : isCompleted ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 group-hover:bg-white'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : (lesson.levelId || index + 1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-black truncate transition-colors ${
                          isActive ? 'text-white' : 'text-slate-800 group-hover:text-slate-900'
                        }`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${
                            isActive ? 'text-indigo-100' : 'text-slate-400'
                          }`}>
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-12 p-8 bg-slate-950 rounded-4xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">当前进度</p>
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-2xl font-black text-white">{progressPercent}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">掌握度</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-900 py-4.5 rounded-3xl font-black text-sm uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all active:scale-95 group">
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                分享探索成就
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
