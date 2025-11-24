# Instagram Stories Feature

A modern, fully functional Instagram-like Stories application built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## ?? Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation & Running

```bash
# Navigate to project
cd c:\Users\hp\Desktop\instagram-stories

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

**Server runs at:** http://localhost:3000

##  Features

### Core Functionality
-  Full-screen story viewer with automatic progression
-  Tap/click navigation (left for previous, right for next)
-  Keyboard navigation (arrow keys, Escape to exit)
-  Progress bar showing story duration
-  Loading indicators for images
-  Multiple stories per user

### View Tracking
-  Session Storage integration for view tracking
-  Viewers modal showing who viewed each story
-  Unviewed story badges with count
-  Real-time view updates

### UI/UX
-  Instagram-style full-screen design
-  User profile header with avatar
-  Story captions
-  View count display
-  Gradient rings for unviewed stories
-  Fully responsive and mobile-friendly

### SEO & Performance
-  Open Graph meta tags for sharing
-  Twitter Card support
-  Server-side rendering (SSR)
-  Static generation (SSG)
-  Incremental Static Regeneration (ISR)

##  Project Structure

```
src/
 components/           # React components
    StoryViewer.tsx         # Main story display
    StoriesList.tsx         # Story feed with rings
    ViewersModal.tsx        # Who viewed modal
 data/
    stories.ts              # Hardcoded story data
 hooks/
    useViewTracking.ts      # Session storage hook
 pages/
    index.tsx               # Home page
    stories/[userId].tsx    # Story viewer page
 styles/
    globals.css             # Global styles
 types/
     schema.ts               # TypeScript interfaces
```

##  How to Use

### Viewing Stories
1. **Home Page**: Click any user's story avatar
2. **Navigation**: 
   - Tap/click right side  Next story
   - Tap/click left side  Previous story
   - Arrow Right/Left keys  Navigate
   - Escape key  Close stories
3. **Auto-Advance**: Each story auto-advances after 5 seconds

### Checking Viewers
1. Click the  icon (bottom-left) showing view count
2. Modal opens with viewer list
3. See viewer names and usernames

##  Data & Content

### Hardcoded Users (4 total)
- Sarah Miller (@sarah.miller)
- Alex Chen (@alex.chen)
- Jordan Williams (@jordan.williams)
- Emma Davis (@emma.davis)

### Hardcoded Stories (6 total)
Each story includes:
- Unique image (from Unsplash)
- Caption text
- View count
- Pre-populated viewer list
- Timestamps

To modify stories, edit: `src/data/stories.ts`

##  Customization

### Change Story Duration
**File**: `src/components/StoryViewer.tsx`
```typescript
// Change the duration parameter (default: 5 seconds)
duration = 5
```

### Add New Story
**File**: `src/data/stories.ts`
```typescript
const stories: Story[] = [
  // ... existing stories
  {
    id: "story7",
    userId: "user1",
    user: users.user1,
    type: "image",
    media: "https://...",
    caption: "Your caption here",
    // ... other fields
  }
];
```

### Customize Colors
**File**: `src/components/StoriesList.tsx`
Edit the gradient classes for unviewed stories:
```typescript
className={`bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500`}
```

##  Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (recommended)
```bash
npm install -g vercel
vercel
```

##  Browser Support

-  Chrome/Chromium (latest)
-  Firefox (latest)
-  Safari (latest)
-  Mobile browsers (iOS Safari, Chrome Mobile)

##  SEO Features

Each story page includes:
- **Dynamic Title**: "{User Name} Story - Instagram"
- **Open Graph Tags**: For link previews
  - og:title, og:description, og:image, og:url
- **Twitter Cards**: For Twitter sharing
- **Responsive Design**: Mobile-first approach
- **Semantic HTML**: Proper heading structure

##  Key Technologies

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | Framework with SSR/SSG |
| TypeScript | Type safety |
| React 19 | UI library |
| Tailwind CSS 4 | Styling |
| Turbopack | Fast builds |
| Session Storage | View tracking |

##  Notes

- **View Tracking**: Session-based (resets on refresh/tab close)
- **Images**: Sample URLs from Unsplash
- **Data**: Hardcoded for demo (easy to connect backend)
- **No Backend Required**: Ready to use immediately

##  Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000 (Windows PowerShell)
Get-Process | Where-Object {$_.Name -like "*node*"} | Stop-Process -Force

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -r .next node_modules
npm install
npm run dev
```

### Session Storage Not Working
- Check browser console (F12)
- Ensure JavaScript is enabled
- Verify using localStorage/sessionStorage tab in DevTools

##  Documentation

- **IMPLEMENTATION.txt** - Detailed technical documentation
- **FEATURES_SUMMARY.txt** - Complete feature list
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

##  Contributing

To extend this project:
1. Add video story support (update Story type)
2. Connect backend database
3. Implement user authentication
4. Add story creation flow
5. Implement real-time notifications

##  License

Open source - feel free to use and modify

---

**Status**:  Complete and Running
**Version**: 1.0.0
**Last Updated**: November 24, 2025
**Dev Server**: http://localhost:3000
