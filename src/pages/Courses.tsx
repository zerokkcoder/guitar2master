import { PlayCircle, Clock, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courses } from '../lib/data';

export function Courses() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">精选课程</h1>
        <p className="mt-2 text-slate-600">跟随我们的系统化路径，一步步成为吉他高手。</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {course.level}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {course.duration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                 <span className="text-xs text-slate-500 flex items-center gap-1">
                  <BarChart className="w-3 h-3" /> {course.lessons} 节课
                </span>
                <Link 
                  to={`/courses/${course.id}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  开始学习 <PlayCircle className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
