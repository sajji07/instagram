export function useViewTracking() {
  const STORAGE_KEY = "story_views";

  const markAsViewed = (storyId: string, userId: string) => {
    if (typeof window === "undefined") return;

    const views = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    if (!views[storyId]) {
      views[storyId] = [];
    }
    if (!views[storyId].includes(userId)) {
      views[storyId].push(userId);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  };

  const hasViewed = (storyId: string, userId: string): boolean => {
    if (typeof window === "undefined") return false;

    const views = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    return views[storyId]?.includes(userId) || false;
  };

  const getViewers = (storyId: string): string[] => {
    if (typeof window === "undefined") return [];

    const views = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    return views[storyId] || [];
  };

  return { markAsViewed, hasViewed, getViewers };
}
