export interface MovieResponseApi {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export interface MovieResult {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}
