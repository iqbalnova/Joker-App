// Interface untuk kategori jokes
export interface JokesCategoryResponse {
  error: boolean;
  categories: string[];
  categoryAliases: {alias: string; resolved: string}[];
  timestamp: number;
}

// Interface untuk satu joke
export interface Joke {
  category: string;
  type: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

// Interface untuk multiple jokes
export interface JokesResponse {
  error: boolean;
  amount?: number;
  jokes?: Joke[]; // Jika lebih dari 1 joke
  joke?: string; // Jika hanya 1 joke
}
