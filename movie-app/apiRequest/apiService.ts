import { MovieResultWithProviders, MoviesWithProviders } from '../interfaces/MovieWithProviders'
import { Provider, ProvidersByCountry } from '../interfaces/ProvidersResponseApi'
import { MovieResult, TopPopularResponseApi } from '../interfaces/TopPopularResponseApi'
import { getPopularMovie, requestGetProvidersOfMovie } from './apiRequest'

export const getMoviesWithProviders = async (page: number): Promise<MoviesWithProviders> => {
  try {
    const response: TopPopularResponseApi = await getPopularMovie(page)

    const moviesWithProviders: MovieResultWithProviders[] = await getProvidersOfMovies(response)

    const responseMoviesWithProviders: MoviesWithProviders = { ...response, results: moviesWithProviders }
    return responseMoviesWithProviders
  } catch (err) {
    return err
  }
}

const getProvidersOfMovies = async (response: TopPopularResponseApi) => {
  try {
    const movies = response.results

    const moviesWithProviders = await Promise.all(
      movies.map(async (movie: MovieResult) => {
        const movieWithProviders = await getProvidersOfMovie(movie)

        return movieWithProviders
      })
    )

    return moviesWithProviders
  } catch (err) {
    return err
  }
}

const getProvidersOfMovie = async (movie: MovieResult) => {
  try {
    const id = movie.id
    const providers = await requestGetProvidersOfMovie(id)

    const movieWithProviders = mergeMovieWithProviders(providers.results, movie)
    return movieWithProviders
  } catch (err) {
    return err
  }
}

const mergeMovieWithProviders = (providers: ProvidersByCountry, movie: MovieResult): MovieResultWithProviders => {
  const providersFrance = providers['FR']
  if (!providersFrance) {
    const movieWithProvider = { ...movie, providers: null }
    return movieWithProvider
  }
  const movieWithProvider = { ...movie, providers: providersFrance }
  return movieWithProvider
}
