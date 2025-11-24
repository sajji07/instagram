/**
 * Story Data Schema and Types
 */

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  type: 'image' | 'video';
  media: string;
  caption?: string;
  createdAt: string;
  expiresAt: string;
  viewCount: number;
  viewedBy: string[];
  duration?: number;
}

export interface StoryGroup {
  user: User;
  stories: Story[];
  hasViewed: boolean;
  unviewedCount: number;
}

export interface ViewTracking {
  storyId: string;
  viewedAt: string;
  viewedBy: string;
}

export interface StoryContextType {
  currentGroupIndex: number;
  currentStoryIndex: number;
  storyGroups: StoryGroup[];
  isLoading: boolean;
  nextStory: () => void;
  previousStory: () => void;
  markAsViewed: (storyId: string, userId: string) => void;
  getViewers: (storyId: string) => User[];
}
