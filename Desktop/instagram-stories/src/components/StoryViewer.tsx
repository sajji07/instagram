"use client";

import { useState, useEffect } from "react";
import { Story } from "@/types/schema";
import { useViewTracking } from "@/hooks/useViewTracking";

interface StoryViewerProps {
  story: Story;
  duration?: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function StoryViewer({
  story,
  duration = 5,
  onNext,
  onPrevious,
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { markAsViewed } = useViewTracking();

  useEffect(() => {
    markAsViewed(story.id, "currentUser");
  }, [story.id, markAsViewed]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = story.media;
  }, [story.media]);

  useEffect(() => {
    if (isLoading) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration * 10);
        if (newProgress >= 100) {
          clearInterval(interval);
          onNext();
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, duration, onNext, story.id]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 z-40">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Story image */}
      <img
        src={story.media}
        alt={story.caption || "Story"}
        style={{ maxWidth: '100vw', maxHeight: '100vh', width: 'auto', height: 'auto' }}
        className="block"
      />

      {/* User info header */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center gap-3">
        <img
          src={story.user.avatar}
          alt={story.user.name}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <p className="font-semibold text-sm">{story.user.name}</p>
          <p className="text-xs opacity-75">@{story.user.username}</p>
        </div>
      </div>

      {/* Story caption */}
      {story.caption && (
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <p className="text-white text-sm bg-black bg-opacity-40 p-3 rounded">
            {story.caption}
          </p>
        </div>
      )}

      {/* View count */}
      <div className="absolute bottom-4 right-4 z-30">
        <div className="bg-black bg-opacity-60 text-white px-3 py-2 rounded-full flex items-center gap-2 text-xs">
          <span></span>
          <span>{story.viewCount}</span>
        </div>
      </div>

      {/* Navigation zones */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer transition-all story-nav-zone"
        onClick={onPrevious}
      ></div>
      <div
        className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer transition-all story-nav-zone"
        onClick={onNext}
      ></div>
    </div>
  );
}
