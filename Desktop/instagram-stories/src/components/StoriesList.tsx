"use client";

import { StoryGroup } from "@/types/schema";
import Link from "next/link";

interface StoriesListProps {
  storyGroups: StoryGroup[];
  onYourStoryClick?: () => void;
}

export default function StoriesList({ storyGroups, onYourStoryClick }: StoriesListProps) {
  return (
    <div className="bg-white  ">
      <div className="flex gap-5 overflow-x-auto pb-2 stories-container"><br/>
        {/* Your Story */}
        <button
          onClick={onYourStoryClick}
          className="flex flex-col items-center gap-2 flex-shrink-0 group hover:opacity-80 transition-opacity"
        >
          <div className="relative w-16 h-16 rounded-full bg-gray-100 p-0.5 flex items-center justify-center border-2 border-gray-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs text-center font-medium truncate w-16 group-hover:underline">
            Your story
          </p>
        </button>

        {/* Other Stories */}
        {storyGroups.map((group) => (
          <Link
            key={group.user.id}
            href={`/stories/${group.user.id}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div
              className={`relative w-16 h-16 rounded-full p-0.5 transition-all ${
                group.hasViewed
                  ? "bg-gradient-to-r from-gray-200 to-gray-300"
                  : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500"
              }`}
            >
              <img
                src={group.user.avatar}
                alt={group.user.name}
                className="w-full h-full rounded-full border-2 border-white object-cover"
              />
              {group.unviewedCount > 0 && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-white">
                  {group.unviewedCount}
                </div>
              )}
            </div>
            <p className="text-xs text-center font-medium truncate w-16 group-hover:underline">
              {group.user.name.split(" ")[0]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
