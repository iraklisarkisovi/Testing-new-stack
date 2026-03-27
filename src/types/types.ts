export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  description_raw: string;
  rating_top: number;
  description: string;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  reviews_count: number;

  added: number;
  added_by_status: AddedByStatus;

  metacritic: number;
  playtime: number;
  suggestions_count: number;

  updated: string;
  user_game: any | null;

  saturated_color: string;
  dominant_color: string;

  platforms: PlatformWrapper[];
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface PlatformWrapper {
  platform: Platform;
  released_at: string;
  requirements_en: Requirements | null;
  requirements_ru: Requirements | null;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

export interface Requirements {
  minimum?: string;
  recommended?: string;
}
