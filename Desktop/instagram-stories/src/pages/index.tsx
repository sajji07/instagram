import { GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import StoriesList from "@/components/StoriesList";
import StoryUploadModal from "@/components/StoryUploadModal";
import { getStoryGroups } from "@/data/stories";
import { StoryGroup, Story } from "@/types/schema";

interface HomeProps {
  storyGroups: StoryGroup[];
}

export default function Home({ storyGroups: initialStoryGroups }: HomeProps) {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>(initialStoryGroups);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadStory = (newStory: Omit<Story, "id" | "createdAt" | "expiresAt" | "viewedBy">) => {
    const storyWithDefaults: Story = {
      id: `story${Date.now()}`,
      ...newStory,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      viewedBy: [],
    };

    setStoryGroups((prevGroups) => {
      const existingUserIndex = prevGroups.findIndex(
        (g) => g.user.id === newStory.userId
      );

      if (existingUserIndex >= 0) {
        const updatedGroups = [...prevGroups];
        updatedGroups[existingUserIndex] = {
          ...updatedGroups[existingUserIndex],
          stories: [storyWithDefaults, ...updatedGroups[existingUserIndex].stories],
        };
        return updatedGroups;
      }

      return prevGroups;
    });

    setShowUploadModal(false);
  };
  return (
    <>
      <Head>
        <title>Instagram Stories - Share Your Moments</title>
        <meta
          name="description"
          content="View and share stories from your favorite users. Experience Instagram-like story viewing with progress tracking and viewer information."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Instagram Stories" />
        <meta
          property="og:description"
          content="View and share stories from your favorite users"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1502945150912-b8fdf2c39576?w=1200&h=630&fit=crop"
        />
        <meta property="og:url" content="https://instagram-stories.example.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Stories" />
        <meta
          name="twitter:description"
          content="View and share stories from your favorite users"
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 pt-[100px] flex items-center justify-center font-italic gap-2">
          <h1 className="text-2xl font-bold-italic">Instagram </h1>
          <br />
      
        </div>

        {/* Stories */}
        <div className="pt-16">
          <StoriesList 
            storyGroups={storyGroups}
            onYourStoryClick={() => setShowUploadModal(true)}
          />
        </div>

        {/* Upload Modal */}
        <StoryUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUploadStory}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const storyGroups = getStoryGroups();

  return {
    props: {
      storyGroups,
    },
    revalidate: 60,
  };
};
