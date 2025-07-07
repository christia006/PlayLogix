export type GameType = {
  id: number;
  consoles: ConsoleType[];
  description: string;
  genres: GenreType[];
  name: string;
  rating: number;
  gameplayHours: string;
  price: string;
  releaseYear: string;
  stars: string[];
  photos: string[];
  thumbnail: string;
  trailer: string;
  writers: string[];
  reviews: ReviewType[];
};

export type ReviewType = {
  id?: number;
  createdAt?: string;
  gameId?: number;
  content: string;
  rating: number | null;
  userId: number;
  user: UserType;
};

export type UserType = {
  id?: number;
  role: "USER" | "ADMIN";
  email: string;
  fullName: string;
  image: string;
  createdDate: string;
  active: boolean;
};

export type UsersResponseType = {
  count: number;
  users:UserType[]
}

export type ConsoleType = {
  console: {
    image: string;
    id: number;
  };
};

export type GenreType = {
  genre: {
    name: string;
  };
};

export type LoginCredentialsType = {
  email: string;
  password: string;
};

export type SignUpCredentialsType = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type AccountSettingsType = {
  fullName: string;
  email: string;
};

export type GameReviewType = {
  rating: number | null;
  content: string;
};

export type NewReviewResponseType = {
  review: ReviewType;
  avgRating: string;
};

export type MyReviewType = {
  content: string;
  createdAt: string;
  game: {
    name: string;
    thumbnail: string;
    averageRating: string;
  };
  gameId: number;
  id: number;
  rating: number;
  userId: number;
};
