import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, PlayCircle, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { courses } from '../lib/data';
import { PracticeMode } from '../components/PracticeMode';

export function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900">课程未找到</h2>
        <Link to="/courses" className="text-indigo-600 hover:text-indigo-500 mt-4 inline-block">
          返回课程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/courses"
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        返回课程列表
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group">
             <img 
               src={course.image} 
               alt={course.title} 
               className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" 
             />
             <div className="z-10 text-center p-6">
                <PlayCircle className="w-16 h-16 text-white mx-auto mb-4 opacity-90 group-hover:scale-110 transition-transform" />
                <p className="text-white font-medium text-lg">点击开始学习</p>
             </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{course.title}</h1>
            <div className="prose prose-slate max-w-none prose-a:text-indigo-600 hover:prose-a:text-indigo-500 mb-12">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>
                 {course.content || '暂无内容'}
               </ReactMarkdown>
            </div>

            {/* Practice Mode Section */}
            {course.practice && course.practice.length > 0 && (
              <div className="border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="bg-indigo-600 w-2 h-8 rounded-full mr-3"></span>
                  实战跟练
                </h2>
                <div className="space-y-8">
                  {course.practice.map((exercise) => (
                    <PracticeMode key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Syllabus */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
              课程大纲
            </h3>
            
            <div className="space-y-3">
              {course.syllabus?.map((lesson, index) => (
                <div 
                  key={index}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-medium flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              继续学习
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
