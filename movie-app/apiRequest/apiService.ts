import { MovieResultWithProviders, MoviesWithProviders } from '../interfaces/MovieWithProviders'
import { Provider, ProvidersByCountry } from '../interfaces/ProvidersResponseApi'
import { MovieResult, MovieResponseApi } from '../interfaces/MovieResponseApi'
import { requestGetPopularMovie, requestGetProvidersOfMovie } from './apiRequest'

export const getMoviesWithProviders = async (page: number): Promise<MoviesWithProviders> => {
  try {
    const response: MovieResponseApi = await requestGetPopularMovie(page)

    const moviesWithProviders: MovieResultWithProviders[] = await getProvidersOfMovies(response)

    const responseMoviesWithProviders: MoviesWithProviders = { ...response, results: moviesWithProviders }
    return responseMoviesWithProviders
  } catch (err) {
    return err
  }
}

const getProvidersOfMovies = async (response: MovieResponseApi): Promise<MovieResultWithProviders[]> => {
  try {
    const movies = response.results
    const moviesWithProviders: MovieResultWithProviders[] = await Promise.all(
      movies.map(async (movie: MovieResult): Promise<MovieResultWithProviders> => {
        const movieWithProviders = await getProvidersOfMovie(movie)

        return movieWithProviders
      })
    )

    return moviesWithProviders
  } catch (err) {
    return err
  }
}

const getProvidersOfMovie = async (movie: MovieResult): Promise<MovieResultWithProviders> => {
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
