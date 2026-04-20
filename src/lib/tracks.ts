export interface Track {
  id: string;
  title: string;
  audioSrc: string;
  coverSrc: string;
  loreChapter?: string;
  loreTitle?: string;
}

export const tracks: Track[] = [
  {
    id: "let-me-out",
    title: "Let Me Out",
    audioSrc: "/audio/let-me-out.m4a",
    coverSrc: "/covers/let-me-out.jpg",
    loreChapter: "Chapter I",
    loreTitle: "The Hat in the Dust",
  },
  {
    id: "mango-fruit-girl",
    title: "Mango Fruit Girl",
    audioSrc: "/audio/mango-fruit-girl.m4a",
    coverSrc: "/covers/mango-fruit.jpg",
    loreChapter: "Chapter II",
    loreTitle: "The Enchantress & Her Fruit Stand",
  },
  {
    id: "pull-me-under",
    title: "Pull Me Under",
    audioSrc: "/audio/pull-me-under.m4a",
    coverSrc: "/covers/pull-me-under.jpg",
    loreChapter: "Chapter III",
    loreTitle: "The Mermaid's Song",
  },
  {
    id: "my-mistake",
    title: "My Mistake",
    audioSrc: "/audio/my-mistake.m4a",
    coverSrc: "/covers/my-mistake.jpg",
    loreChapter: "Chapter IV",
    loreTitle: "Washed Up — The Aftermath",
  },
  {
    id: "pour-out-the-bottle",
    title: "Pour Out the Bottle",
    audioSrc: "/audio/pour-out-the-bottle.m4a",
    coverSrc: "/covers/pour-out-the-bottle.jpg",
  },
];

export const socialLinks = {
  spotify: "https://open.spotify.com/artist/5MkblgFYqw5F91W1cMcSiK",
  tiktok: "https://www.tiktok.com/@bucketthekid",
  instagram: "https://www.instagram.com/bucketthekid/",
  youtube: "https://youtube.com/channel/UCUPjxlk-XRp4TgWk4lhzERw",
};
