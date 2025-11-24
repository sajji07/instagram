"use client";

import { useState, useRef } from "react";
import { Story } from "@/types/schema";

interface StoryUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (story: Omit<Story, "id" | "createdAt" | "expiresAt" | "viewedBy">) => void;
}

export default function StoryUploadModal({
  isOpen,
  onClose,
  onUpload,
}: StoryUploadModalProps) {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !preview) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);

    try {
      // Create a story object
      const newStory: Omit<Story, "id" | "createdAt" | "expiresAt" | "viewedBy"> = {
        userId: "currentUser",
        user: {
          id: "currentUser",
          username: "your_username",
          name: "Your Name",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        },
        type: "image",
        media: preview,
        caption: caption || undefined,
        viewCount: 0,
      };

      onUpload(newStory);

      // Reset form
      setCaption("");
      setFile(null);
      setPreview(null);
      onClose();
    } catch (error) {
      console.error("Error uploading story:", error);
      alert("Failed to upload story");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Story</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Image Preview */}
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Story preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <svg
                className="w-12 h-12 text-gray-400 mb-2"
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
              <p className="text-gray-600 font-medium">Click to upload image</p>
              <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption (optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption to your story..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!preview || isLoading}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Uploading..." : "Share Story"}
          </button>
        </div>
      </div>
    </div>
  );
}
