"use client";

import { useState } from "react";
import { User } from "@/types/schema";

interface ViewersModalProps {
  isOpen: boolean;
  viewers: User[];
  onClose: () => void;
  storyCaption?: string;
}

export default function ViewersModal({
  isOpen,
  viewers,
  onClose,
  storyCaption,
}: ViewersModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-2xl max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Viewed by ({viewers.length})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {viewers.length > 0 ? (
            viewers.map((viewer) => (
              <div
                key={viewer.id}
                className="p-3 flex items-center gap-3 hover:bg-gray-50"
              >
                <img
                  src={viewer.avatar}
                  alt={viewer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{viewer.name}</p>
                  <p className="text-xs text-gray-500">@{viewer.username}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Follow
                </button>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No one has viewed this story yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
