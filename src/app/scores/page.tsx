'use client';

/**
 * 曲谱库页面组件
 * 展示可选曲谱列表，支持搜索、分类筛选和难度展示
 */

import { useState, useMemo } from 'react';
import { 
  Music, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  PlayCircle,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 曲谱数据接口
 */
interface MusicScore {
  id: number;
  title: string;
  artist: string;
  difficulty: '入门' | '初级' | '中级' | '高级' | '专家';
  category: string;
  duration: string;
  views: number;
  image: string;
}

const scores: MusicScore[] = [
  {
    id: 1,
    title: '平凡之路',
    artist: '朴树',
    difficulty: '初级',
    category: '流行',
    duration: '04:20',
    views: 12500,
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Hotel California',
    artist: 'Eagles',
    difficulty: '高级',
    category: '摇滚',
    duration: '06:30',
    views: 45000,
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: '晴天',
    artist: '周杰伦',
    difficulty: '中级',
    category: '流行',
    duration: '04:15',
    views: 32000,
    image: 'https://images.unsplash.com/photo-1510915363646-de3030d952e4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Wonderful Tonight',
    artist: 'Eric Clapton',
    difficulty: '初级',
    category: '蓝调',
    duration: '03:40',
    views: 18000,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: '那些花儿',
    artist: '朴树',
    difficulty: '入门',
    category: '民谣',
    duration: '04:50',
    views: 9800,
    image: 'https://images.unsplash.com/photo-1525201548942-d8b8c09ec8d5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    difficulty: '中级',
    category: '前卫摇滚',
    duration: '05:10',
    views: 22000,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a34e1?auto=format&fit=crop&q=80&w=800'
  }
];

const categories = ['全部', '流行', '民谣', '摇滚', '蓝调', '指弹'];

export default function MusicScoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredScores = useMemo(() => {
    return scores.filter(score => {
      const matchesSearch = score.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           score.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '全部' || score.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case '初级': return 'text-blue-500 bg-blue-50 border-blue-100';
      case '中级': return 'text-amber-500 bg-amber-50 border-amber-100';
      case '高级': return 'text-rose-500 bg-rose-50 border-rose-100';
      case '专家': return 'text-purple-500 bg-purple-50 border-purple-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col bg-slate-50/50">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-50/30 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
              <Music className="w-3 h-3" />
              Music Library
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              曲谱<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">宝库</span>
            </h1>
            <p className="text-slate-500 font-medium">发现、练习并掌握你最喜爱的旋律</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="搜索歌曲或艺人..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full sm:w-64 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md active:scale-95">
              <Filter className="w-4 h-4" /> 筛选器
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 scale-105"
                  : "bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScores.map((score) => (
            <div 
              key={score.id}
              className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <img 
                  src={`${score.image}&w=600&q=80`} 
                  alt={score.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className={cn(
                  "absolute top-4 left-4 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest",
                  getDifficultyColor(score.difficulty)
                )}>
                  {score.difficulty}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white mb-1 group-hover:translate-x-1 transition-transform">
                    {score.title}
                  </h3>
                  <p className="text-white/70 text-sm font-bold group-hover:translate-x-1 transition-transform delay-75">
                    {score.artist}
                  </p>
                </div>

                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                  <PlayCircle className="w-6 h-6 text-white fill-white/20" />
                </button>
              </div>

              {/* Info Container */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {score.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {score.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">
                    {score.category}
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <FileText className="w-3.5 h-3.5" /> 预览谱面
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                    <Download className="w-3.5 h-3.5" /> 离线下载
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredScores.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">未找到匹配曲谱</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto">尝试更换关键词或分类，继续探索你的音乐灵感。</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('全部');}}
              className="mt-6 text-indigo-600 font-black text-sm hover:underline"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
