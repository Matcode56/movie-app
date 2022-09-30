import axios from 'axios'
import { tokenTMDB } from 'react-native-dotenv'
import { ProvidersResponseApi } from '../interfaces/ProvidersResponseApi'
import { MovieResponseApi } from '../interfaces/MovieResponseApi'

const headersToken = { Authorization: `bearer ${tokenTMDB}` }
const baseURL = 'https://api.themoviedb.org/3/movie'

export const requestGetTopRatedMovie = async (page: number): Promise<MovieResponseApi> => {
  try {
    const res = await axios.get<MovieResponseApi>(`${baseURL}/top_rated?page=${page}`, { headers: headersToken })
    return res.data
  } catch (err) {
    return err
  }
}

export const requestGetPopularMovie = async (page: number): Promise<MovieResponseApi> => {
  try {
    const res = await axios.get<MovieResponseApi>(`${baseURL}/popular?page=${page}`, { headers: headersToken })
    return res.data
  } catch (err) {
    return err
  }
}

export const requestGetProvidersOfMovie = async (movieId: number): Promise<ProvidersResponseApi> => {
  try {
    const res = await axios.get<ProvidersResponseApi>(`${baseURL}/${movieId}/watch/providers`, {
      headers: headersToken,
    })

    return res.data
  } catch (err) {
    return err
  }
}
