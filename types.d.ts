type Movies = {
  id: string;
  director: string;
  title: string;
  tagLine: string;
  imageLink: string;
  audioLink: string;
  rating: string;
  releaseYear: string;
  type: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  movieDescription: string;
}

type MoviesResponse = {
  data: Movies[]
}

type MovieItem = {
  id: string;
  type: string;
  subscriptionRequired: boolean;
  director: string;
  title: string;
  releaseYear: string;
  tagLine: string;
  tags: string[];
  audioLink: string;
  summary: string;
  movieDescription: string;
  rating: string;
  imageLink: string;
}

type MovieItemResponse = {
  data: MovieItem
}
