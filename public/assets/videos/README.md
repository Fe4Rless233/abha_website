# Video Placeholders

The following video files are referenced in the code:

- `bengali-culture-hero.mp4` - Hero background video for homepage
- `bengali-culture-hero.webm` - Hero background video for homepage (WebM format)
- `community-events.mp4` - Community events video for Events page

Notes:
- The hero video is optional. If autoplay is blocked or the user prefers reduced motion, the poster image will be shown instead.
- Keep the MP4 H.264 (Baseline/High) under ~8–12MB for faster start; add a WebM version for Chrome/Android when possible.
- Filenames are referenced from `public/assets/videos/` so they’re served as static files and support range requests on Netlify.
