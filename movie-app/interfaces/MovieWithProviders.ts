import { Providers, ProvidersByCountry } from './ProvidersResponseApi'
import { MovieResult } from './TopPopularResponseApi'

export interface MoviesWithProviders {
  page: number
  results: MovieResultWithProviders[]
  total_pages: number
  total_results: number
}

export interface MovieResultWithProviders extends MovieResult {
  providers: Providers[]
}
