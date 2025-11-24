import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import StoryViewer from "@/components/StoryViewer";
import ViewersModal from "@/components/ViewersModal";
import { getStoryGroups, getUserById } from "@/data/stories";
import { StoryGroup, User } from "@/types/schema";

interface StoryPageProps {
  user: User;
  storyGroup: StoryGroup;
  allUsers: User[];
}

export default function StoryPage({ user, storyGroup, allUsers }: StoryPageProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showViewers, setShowViewers] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const currentStory = storyGroup.stories[currentStoryIndex];
  const currentUserIndex = allUsers.findIndex((u) => u.id === user.id);

  const handleNext = () => {
    if (currentStoryIndex < storyGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < allUsers.length - 1) {
      // Go to next user's stories
      const nextUserId = allUsers[currentUserIndex + 1].id;
      window.location.href = `/stories/${nextUserId}`;
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      // Go to previous user's stories
      const prevUserId = allUsers[currentUserIndex - 1].id;
      window.location.href = `/stories/${prevUserId}`;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left - go to next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right - go to previous
      handlePrevious();
    }
    setTouchStart(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") {
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious]);

  return (
    <>
      <Head>
        <title>{`${user.name}'s Stories - Instagram`}</title>
        <meta
          name="description"
          content={`View ${user.name}'s stories on Instagram`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${user.name}'s Stories`} />
        <meta
          property="og:image"
          content={currentStory.media}
        />
      </Head>

      <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <StoryViewer
          story={currentStory}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        {/* Viewers button */}
        <button
          onClick={() => setShowViewers(true)}
          className="absolute bottom-8 left-8 z-10 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition-all"
        >
          {currentStory.viewCount} views
        </button>

        {/* Close button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-8 right-8 z-10 text-white text-3xl hover:opacity-75 transition-opacity"
        >
          ×
        </button>

        {/* Viewers Modal */}
        {showViewers && (
          <ViewersModal
            isOpen={showViewers}
            viewers={currentStory.user ? [currentStory.user] : []}
            onClose={() => setShowViewers(false)}
            storyCaption={currentStory.caption}
          />
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyGroups = getStoryGroups();
  const paths = storyGroups.map((group) => ({
    params: { userId: group.user.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StoryPageProps> = async ({
  params,
}) => {
  const userId = params?.userId as string;
  const user = getUserById(userId);
  const storyGroups = getStoryGroups();
  const storyGroup = storyGroups.find((g) => g.user.id === userId);
  const allUsers = storyGroups.map((g) => g.user);

  if (!user || !storyGroup) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      storyGroup,
      allUsers,
    },
    revalidate: 60,
  };
};
