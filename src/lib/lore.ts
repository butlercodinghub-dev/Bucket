export interface LoreChapter {
  id: string;
  number: string;
  title: string;
  excerpt: string;
  trackId?: string;
  bgClass: string;
  imageSrc?: string;
}

export const loreChapters: LoreChapter[] = [
  {
    id: "prologue",
    number: "Prologue",
    title: "The Quiet Before the Color",
    excerpt:
      "Bucket was just a kid. Not special-special. Not chosen-one, prophecy-carved-in-stone special. Just a kid from a small town where the loudest thing on any given Tuesday was the ice cream truck. He made beats in his bedroom. Not because anyone asked him to — because the silence was too heavy and the world outside his window felt like it was waiting for a soundtrack it hadn't heard yet.",
    bgClass: "bg-hero-gradient",
  },
  {
    id: "chapter-1",
    number: "Chapter I",
    title: "The Hat in the Dust",
    excerpt:
      'It was a Saturday — the kind of lazy, sun-drenched afternoon where nothing happens and everything changes. On a shelf behind a stack of warped vinyl records, half-hidden under a dust cloth that might\'ve been white once — a bucket hat. The moment his fingers touched the fabric, color detonated. Not slowly. Not like a sunrise. Like a drop — like the moment a beat kicks in and the whole track transforms.',
    trackId: "let-me-out",
    bgClass: "bg-hero-gradient",
    imageSrc: "/covers/let-me-out.jpg",

  },
  {
    id: "chapter-2",
    number: "Chapter II",
    title: "Mango Fruit",
    excerpt:
      "Sweet. Ripe. Tropical and heavy in a way that made the air itself feel like it had flavor. ISLAND JUICE & EXOTIC BLENDS, read a hand-painted sign on a bamboo frame. And behind the stand, arranging the fruit with an effortless grace — Her. She had eyes like the ocean. She smiled at him the way a song smiles when it hits the hook — inevitable, magnetic, the kind of thing you replay in your head long after it's over.",
    trackId: "mango-fruit-girl",
    bgClass: "bg-sunset-gradient",
    imageSrc: "/covers/mango-fruit.jpg",
  },
  {
    id: "chapter-3",
    number: "Chapter III",
    title: "Pull Me Under",
    excerpt:
      'Her legs shimmered, fused, and became scales — iridescent, pink and purple and blue, catching the moonlight like a thousand tiny mirrors. "Come deeper," she whispered. Her voice was a melody now. Each word carried a tone, wrapping around his thoughts like vines. He was drowning. Drowning in the most beautiful song he\'d ever heard. Then — CLICK. The bucket hat moved. Pull Down Mode.',
    trackId: "pull-me-under",
    bgClass: "bg-ocean-gradient",
    imageSrc: "/covers/pull-me-under.jpg",
  },
  {
    id: "chapter-3b",
    number: "Chapter IV",
    title: "Washed Up",
    excerpt:
      'Bucket lay on the sand, chest heaving, staring at a sky that didn\'t care about what had just happened. The bucket hat sat on his head, back in its normal position. The clouds on its surface swirled slowly — calm now, like a lullaby after a storm. Faintly warm. Almost reassuring. Like a friend putting a hand on your shoulder without saying anything. "I\'m an idiot," Bucket said. The hat pulsed once, gently. It didn\'t disagree, but it didn\'t pile on either.',
    trackId: "my-mistake",
    bgClass: "bg-ocean-gradient",
    imageSrc: "/covers/my-mistake.jpg",
  },
  {
    id: "chapter-4",
    number: "Chapter V & VI",
    title: "Chikun & Scoob",
    excerpt:
      '"I TOLD you the shortcut was left at the glowing rock—" Two creatures bickering in the jungle. Chikun, a proud iridescent rooster who flickered between animal forms. Scoob, a lanky hound whose shadow never matched his shape. "Your hat broke her frequency. That means something," Chikun said. "It means you\'re either really important or really unlucky," Scoob added. "Historically, those are the same thing."',
    bgClass: "bg-hero-gradient",
  },
];
