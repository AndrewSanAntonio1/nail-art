export type GallerySource = "Facebook" | "TikTok" | "Instagram" | "Pinterest" | "Bewtee";

export type GalleryDesign = {
  id: string;
  title: string;
  source: GallerySource;
  tags: string[];
  imageUrl: string;
  width: number;
  height: number;
  isVideo?: boolean;
};

export const CHIP_LABELS = [
  "Simple",
  "Easy",
  "Gel",
  "Beautiful",
  "Wedding",
  "Summer",
  "Elegant",
  "Glitter",
  "Pink",
  "Acrylic",
  "French",
  "Ombre",
] as const;

export const CHIP_COLORS: Record<string, string> = {
  Simple: "#f5f0eb",
  Easy: "#bbf7d0",
  Gel: "#fbcfe8",
  Beautiful: "#f9a8d4",
  Wedding: "#ffffff",
  Summer: "#fdba74",
  Elegant: "#1e1b4b",
  Glitter: "#fde68a",
  Pink: "#ec4899",
  Acrylic: "#c4b5fd",
  French: "#fef3c7",
  Ombre: "#93c5fd",
};

const img = (n: number) => `/images/${n}.png`;

type Row = [id: string, title: string, source: GallerySource, tags: string[], n: number, w: number, h: number, video?: boolean];

const ROWS: Row[] = [
  ["g1", "Trendy Nail Art Designs 2025: Simple & Elegant Nude", "Pinterest", ["Simple", "Elegant"], 1, 398, 502],
  ["g2", "Easy Pink Gel Nails You Can Do at Home", "TikTok", ["Easy", "Pink", "Gel"], 2, 387, 516, true],
  ["g3", "Beautiful Wedding French Tips With Pearl Accents", "Instagram", ["Wedding", "French", "Beautiful"], 3, 678, 452],
  ["g4", "Summer Ombre Sunset Nails in Coral and Gold", "Facebook", ["Summer", "Ombre"], 4, 395, 506],
  ["g5", "Glitter Acrylic Coffin Nails for a Night Out", "TikTok", ["Glitter", "Acrylic"], 5, 447, 447, true],
  ["g6", "Simple White Gel Nails With a Glossy Finish", "Pinterest", ["Simple", "Gel"], 6, 452, 678],
  ["g7", "Elegant French Ombre for Bridesmaids", "Bewtee", ["Elegant", "French", "Ombre", "Wedding"], 7, 494, 619],
  ["g8", "Pink Summer Nails With Tiny Daisy Art", "Instagram", ["Pink", "Summer", "Beautiful"], 8, 447, 447],
  ["g9", "Easy Acrylic Nails for Beginners, Step by Step", "TikTok", ["Easy", "Acrylic"], 9, 515, 595, true],
  ["g10", "Beautiful Glitter Gradient Party Nails", "Facebook", ["Beautiful", "Glitter"], 10, 452, 678],
  ["g11", "Classic Red Gel Nails, Simple and Elegant", "Pinterest", ["Simple", "Gel", "Elegant"], 11, 493, 621],
  ["g12", "Wedding Day Nails: Soft Pink Acrylic Almonds", "Instagram", ["Wedding", "Pink", "Acrylic"], 12, 447, 447],
  ["g13", "Summer French Tips With Neon Smiles", "TikTok", ["Summer", "French"], 13, 447, 447, true],
  ["g14", "Ombre Lavender Gel Nails for Spring", "Bewtee", ["Ombre", "Gel", "Beautiful"], 14, 493, 621],
  ["g15", "Easy Glitter Accent Nail Tutorial", "Facebook", ["Easy", "Glitter"], 15, 447, 447],
  ["g16", "Elegant Black-Tie Acrylic Nails in Deep Plum", "Pinterest", ["Elegant", "Acrylic"], 16, 420, 730],
  ["g17", "Pink and White Ombre Baby-Boomer Nails", "Instagram", ["Pink", "Ombre", "French"], 17, 420, 730],
  ["g18", "Silver Chrome Manicure That Lasts Three Weeks", "TikTok", ["Simple", "Gel", "Easy"], 18, 738, 414, true],
  ["g19", "Milky White Minimal Nails for Everyday Wear", "Pinterest", ["Simple", "Elegant", "Gel"], 19, 478, 641],
  ["g20", "Chocolate Glaze Nails for Fall Evenings", "Instagram", ["Beautiful", "Gel"], 20, 487, 628],
  ["g21", "Cute Teddy Bear Nail Art in Caramel", "TikTok", ["Beautiful", "Pink", "Easy"], 21, 378, 393, true],
  ["g22", "Cherry Red Fruit Nails With Leafy Stems", "Facebook", ["Summer", "Beautiful"], 22, 495, 618],
  ["g23", "Galaxy Nebula Nails in Midnight Indigo", "Pinterest", ["Beautiful", "Glitter", "Easy"], 23, 638, 480],
  ["g24", "Black French Tips With a Smoked Base", "TikTok", ["French", "Elegant"], 24, 447, 447, true],
  ["g25", "Gothic Lace Nails in Black and White", "Instagram", ["Elegant", "Beautiful"], 25, 554, 554],
  ["g26", "Leopard Print Nails With Golden Rosettes", "TikTok", ["Beautiful", "Acrylic"], 26, 800, 1200, true],
  ["g27", "Carrara Marble Nails With Soft Grey Veins", "Pinterest", ["Simple", "Elegant", "Beautiful"], 27, 736, 1104],
  ["g28", "Black and White Checkerboard Skater Nails", "Facebook", ["Easy", "Beautiful"], 28, 1080, 1920],
  ["g29", "Blush Aura Nails With a Soft Halo Glow", "Instagram", ["Pink", "Simple", "Beautiful"], 29, 736, 1313],
  ["g30", "Sakura Blossom Nails for Springtime", "Bewtee", ["Beautiful", "Pink", "Elegant"], 30, 736, 1104],
  ["g31", "Puffy 3D Heart Nails in Jelly Pink", "TikTok", ["Pink", "Beautiful", "Easy"], 31, 683, 1024, true],
  ["g32", "Glazed Soap Bubble Nails in Puddle Blue", "Facebook", ["Beautiful", "Gel", "Easy"], 32, 544, 630],
  ["g33", "Mirror Chrome Nails Buffed to a Shine", "Instagram", ["Beautiful", "Elegant"], 33, 736, 736],
  ["g34", "Alpine Snowflake Nails in Crisp White", "Pinterest", ["Wedding", "Elegant", "Beautiful"], 34, 736, 981],
  ["g35", "Holiday Pine Nails With Ruby Baubles", "Facebook", ["Beautiful", "Easy"], 35, 736, 1104],
  ["g36", "Haunted Halloween Nails With Bats", "TikTok", ["Easy", "Beautiful"], 36, 736, 1104, true],
  ["g37", "Valentine Sweetheart Nails in Candy Pink", "Instagram", ["Pink", "French", "Beautiful"], 37, 736, 736],
  ["g38", "Birthday Confetti Nails in Pastel Pop", "Facebook", ["Pink", "Easy", "Beautiful"], 38, 736, 736],
  ["g39", "Bridal Pearl Veil Nails in Sheer White", "Pinterest", ["Wedding", "Elegant", "French"], 39, 749, 739],
  ["g40", "Nail Art Compilation: 40 Looks in One Place", "Bewtee", ["Beautiful", "Easy", "Gel"], 40, 736, 1104, true],
];

export const GALLERY_DESIGNS: GalleryDesign[] = ROWS.map(([id, title, source, tags, n, w, h, video]) => ({
  id,
  title,
  source,
  tags,
  imageUrl: img(n),
  width: w,
  height: h,
  ...(video ? { isVideo: true } : {}),
}));
