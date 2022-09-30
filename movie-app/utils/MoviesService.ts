import { requestGetPopularMovie, requestGetProvidersOfMovie, requestGetTopRatedMovie } from '../api/apiRequest'
import { MovieResponseApi, MovieResult } from '../interfaces/MovieResponseApi'
import { MovieResultWithProviders, MoviesWithProviders } from '../interfaces/MovieWithProviders'
import { ProvidersFormattedToDisplay } from '../interfaces/ProvidersFormattedToDispay'
import { Provider, ProvidersByCountry } from '../interfaces/ProvidersResponseApi'

export const getPopularMoviesWithProviders = async (page: number): Promise<MoviesWithProviders> => {
  try {
    const response: MovieResponseApi = await requestGetPopularMovie(page)

    const moviesWithProviders: MovieResultWithProviders[] = await getProvidersOfMovies(response)

    const responseMoviesWithProviders: MoviesWithProviders = { ...response, results: moviesWithProviders }
    return responseMoviesWithProviders
  } catch (err) {
    return err
  }
}

export const getTopRatedMoviesWithProviders = async (page: number): Promise<MoviesWithProviders> => {
  try {
    const response: MovieResponseApi = await requestGetTopRatedMovie(page)

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

export const formatDuplicateProviders = (
  flatrateProviders: Provider[],
  rentProviders: Provider[],
  buyProviders: Provider[]
): ProvidersFormattedToDisplay => {
  const flatrate = flatrateProviders
  const buyAndRent = buyProviders ? findDuplicateProviders(buyProviders, rentProviders) : undefined

  if (buyAndRent !== undefined) {
    const buy = deleteDuplicateProviders(buyProviders, buyAndRent)
    const rent = deleteDuplicateProviders(rentProviders, buyAndRent)

    const providers = {
      flatrate,
      buyAndRent,
      rent,
      buy,
    }
    return providers
  }
  const rent = rentProviders
  const buy = buyProviders
  const providers = {
    buyAndRent,
    flatrate,
    rent,
    buy,
  }
  return providers
}

const findDuplicateProviders = (arrayProviders: Provider[], arrayToCompare: Provider[]) => {
  if (!arrayToCompare || arrayToCompare.length === 0) return undefined

  const duplicates: Provider[] = arrayProviders.filter((provider: Provider) => {
    const isIncludesInSecondArray = arrayToCompare.find(
      (providerToCompare: Provider) => providerToCompare['provider_name'] === provider['provider_name']
    )
    return isIncludesInSecondArray
  })

  if (duplicates.length === 0) return undefined
  else return duplicates
}

const deleteDuplicateProviders = (arrayProviders: Provider[], arrayToCompare: Provider[]) => {
  if (!arrayToCompare || arrayToCompare.length === 0) return undefined

  const arrayWithotuDuplicates: Provider[] = arrayProviders.filter((provider: Provider) => {
    const isIncludesInSecondArray = arrayToCompare.find(
      (providerToCompare: Provider) => providerToCompare['provider_name'] === provider['provider_name']
    )
    return !isIncludesInSecondArray
  })

  if (arrayWithotuDuplicates.length === 0) return undefined
  else return arrayWithotuDuplicates
}
