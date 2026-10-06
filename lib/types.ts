export type NailShape = "almond" | "square" | "oval" | "coffin" | "stiletto" | "round";

export type NailLength = "short" | "medium" | "long";

export interface NailDesign {
  id: string;
  name: string;
  category: string;
  colors: string[];
  style: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  tags: string[];
  image: string;
}

export interface UserPreferences {
  favoriteCategories: string[];
  favoriteColors: string[];
  preferredShape: NailShape;
  preferredLength: NailLength;
}

export interface GeneratedDesign extends NailDesign {
  generatedAt: string;
  basedOn: string[];
}
