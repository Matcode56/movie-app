import axios from 'axios'
import { tokenTMDB } from 'react-native-dotenv'
import { ProvidersResponseApi } from '../interfaces/ProvidersResponseApi'
import { TopPopularResponseApi } from '../interfaces/TopPopularResponseApi'

const headersToken = { Authorization: `bearer ${tokenTMDB}` }
const baseURL = 'https://api.themoviedb.org/3/movie'

export const getTopRatedMovie = async (page: number): Promise<TopPopularResponseApi> => {
  try {
    const res = await axios.get<TopPopularResponseApi>(`${baseURL}/top_rated?page=${page}`, { headers: headersToken })
    return res.data
  } catch (err) {
    return err
  }
}

export const getPopularMovie = async (page: number): Promise<TopPopularResponseApi> => {
  try {
    const res = await axios.get<TopPopularResponseApi>(`${baseURL}/popular?page=${page}`, { headers: headersToken })
    return res.data
  } catch (err) {
    return err
  }
}

export const getProvidersOfMovie = async (movieId: number): Promise<ProvidersResponseApi> => {
  try {
    const res = await axios.get<ProvidersResponseApi>(`/${movieId}/watch/providers`, { headers: headersToken })
    return res.data
  } catch (err) {
    return err
  }
}
