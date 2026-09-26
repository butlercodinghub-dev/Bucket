export interface Track {
  id: string;
  title: string;
  audioSrc: string;
  coverSrc: string;
  /** ISO date (YYYY-MM-DD). Controls "latest release" and list order. */
  releaseDate: string;
}

// TODO: placeholder release dates — replace with the real ones.
// Order is newest first; My Mistake is the current latest release.
export const tracks: Track[] = [
  {
    id: "my-mistake",
    title: "My Mistake",
    audioSrc: "/audio/my-mistake.m4a",
    coverSrc: "/covers/my-mistake.jpg",
    releaseDate: "2026-04-01",
  },
  {
    id: "let-me-out",
    title: "Let Me Out",
    audioSrc: "/audio/let-me-out.m4a",
    coverSrc: "/covers/let-me-out.jpg",
    releaseDate: "2026-03-01",
  },
  {
    id: "mango-fruit-girl",
    title: "Mango Fruit Girl",
    audioSrc: "/audio/mango-fruit-girl.m4a",
    coverSrc: "/covers/mango-fruit.jpg",
    releaseDate: "2026-02-01",
  },
  {
    id: "pull-me-under",
    title: "Pull Me Under",
    audioSrc: "/audio/pull-me-under.m4a",
    coverSrc: "/covers/pull-me-under.jpg",
    releaseDate: "2026-01-01",
  },
  {
    id: "pour-out-the-bottle",
    title: "Pour Out the Bottle",
    audioSrc: "/audio/pour-out-the-bottle.m4a",
    coverSrc: "/covers/pour-out-the-bottle.jpg",
    releaseDate: "2025-12-01",
  },
].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

export const latestTrack = tracks[0];

export const socialLinks = {
  spotify: "https://open.spotify.com/artist/5MkblgFYqw5F91W1cMcSiK",
  tiktok: "https://www.tiktok.com/@bucketthekid",
  instagram: "https://www.instagram.com/bucketthekid/",
  youtube: "https://youtube.com/channel/UCUPjxlk-XRp4TgWk4lhzERw",
};
