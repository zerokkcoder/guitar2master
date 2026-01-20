'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 用户进度管理 Hook
 * 处理已完成关卡的记录、XP 累加以及持久化到 localStorage
 */
export function useProgress() {
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化加载
  useEffect(() => {
    const savedLevels = localStorage.getItem('guitar_completed_levels');
    const savedXP = localStorage.getItem('guitar_total_xp');

    if (savedLevels) {
      try {
        setCompletedLevels(JSON.parse(savedLevels));
      } catch (e) {
        console.error('Failed to parse completed levels', e);
      }
    }

    if (savedXP) {
      setTotalXP(parseInt(savedXP, 10) || 0);
    }
    
    setIsLoaded(true);
  }, []);

  // 持久化到 localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('guitar_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('guitar_total_xp', totalXP.toString());
  }, [totalXP, isLoaded]);

  /**
   * 完成关卡
   * @param courseId 课程 ID
   * @param levelId 关卡 ID (如 '1-1')
   * @param xpReward 该关卡奖励的 XP
   */
  const completeLevel = useCallback((courseId: number, levelId: string, xpReward: number) => {
    const compositeId = `${courseId}-${levelId}`;
    
    setCompletedLevels(prev => {
      if (prev.includes(compositeId)) return prev;
      
      // 只有第一次完成才加 XP
      setTotalXP(curr => curr + xpReward);
      return [...prev, compositeId];
    });
  }, []);

  /**
   * 检查关卡是否已完成
   */
  const isLevelCompleted = useCallback((courseId: number, levelId: string) => {
    return completedLevels.includes(`${courseId}-${levelId}`);
  }, [completedLevels]);

  /**
   * 重置所有进度 (用于测试或重新开始)
   */
  const resetProgress = useCallback(() => {
    setCompletedLevels([]);
    setTotalXP(0);
    localStorage.removeItem('guitar_completed_levels');
    localStorage.removeItem('guitar_total_xp');
  }, []);

  return {
    completedLevels,
    totalXP,
    completeLevel,
    isLevelCompleted,
    resetProgress,
    isLoaded
  };
}
