import { Story, User, StoryGroup } from "@/types/schema";
import { use } from "react";


const users: Record<string, User> = {
  user1: {
    id: "user1",
    username: "sajid.mohd",
    name: "Sajid",
    avatar: "/user1.jpg",
  },
  user2: {
    id: "user2",
    username: "mud.sir",
    name: "mudasir",
    avatar: "/user2.jpg",
  },
  user3: {
    id: "user3",
    username: "faiz.ahmed",
    name: "faiz",
    avatar: "/user3.jpg",
  },
  user4: {
    id: "user4",
    username: "rimsha_afreen",
    name: "rimsha",
    avatar: "/user4.jpg",
  },
  user5: { 
    id: "user5",
    username: "john_doe",
    name: "John Doe",
    avatar: "/user5.jpg",
  },
};

const stories: Story[] = [
  {
    id: "story1",
    userId: "user1",
    user: users.user1,
    type: "image",
    media: "/story1.jpg",
    caption: "music vibes",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    viewCount: 342,
    viewedBy: ["user2", "user3"],
  },
  {
    id: "story2",
    userId: "user1",
    user: users.user1,
    type: "image",
    media: "/story2.jpg",
    caption: " vibes",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    viewCount: 128,
    viewedBy: ["user2"],
  },
  {
    id: "story3",
    userId: "user2",
    user: users.user2,
    type: "image",
    media: "/story3.jpg",
    caption: "Mine",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
    viewCount: 256,
    viewedBy: ["user1", "user3", "user4"],
  },
  {
    id: "story4",
    userId: "user2",
    user: users.user2,
    type: "image",
    media: "/story4.jpg",
    caption: "",
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 21.5 * 60 * 60 * 1000).toISOString(),
    viewCount: 178,
    viewedBy: ["user1"],
  },
  {
    id: "story5",
    userId: "user3",
    user: users.user3,
    type: "image",
    media: "/story5.jpg",
    caption: "love",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    viewCount: 423,
    viewedBy: ["user1", "user2"],
  },
  {
    id: "story6",
    userId: "user4",
    user: users.user4,
    type: "image",
    media: "/story6.jpg",
    caption: "sajid",
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22.5 * 60 * 60 * 1000).toISOString(),
    viewCount: 567,
    viewedBy: ["user1", "user2", "user3"],
  },
];

export function getStories(): Story[] {
  return stories;
}

export function getStoryGroups(): StoryGroup[] {
  const grouped = new Map<string, Story[]>();

  stories.forEach((story) => {
    if (!grouped.has(story.userId)) {
      grouped.set(story.userId, []);
    }
    grouped.get(story.userId)!.push(story);
  });

  return Array.from(grouped.entries()).map(([userId, userStories]) => ({
    user: users[userId],
    stories: userStories,
    hasViewed: userStories.some((s) => s.viewedBy.includes("currentUser")),
    unviewedCount: userStories.filter((s) => !s.viewedBy.includes("currentUser")).length,
  }));
}

export function getUserById(userId: string): User | undefined {
  return users[userId];
}

export function getStoryById(storyId: string): Story | undefined {
  return stories.find((s) => s.id === storyId);
}
