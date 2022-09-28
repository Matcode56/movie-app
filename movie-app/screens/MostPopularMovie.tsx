import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { getPopularMovie, getTopRatedMovie } from '../apiRequest/apiRequest'
import { MovieResult, TopPopularResponseApi } from '../interfaces/TopPopularResponseApi'

const MostPopularMovie = () => {
  const [movies, setMovies] = useState<MovieResult[]>()
  const [totalPage, setTotalPage] = useState<number>()
  const [nextPage, setNextPage] = useState<number>(1)

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    console.log(nextPage)

    try {
      const data: TopPopularResponseApi = await getPopularMovie(nextPage)
      const movies = data.results
      const totalPage = data.total_pages
      const page = data.page
      setMovies(movies)
      setTotalPage(totalPage)
      updateNextPage(page)
    } catch (err) {
      console.log(err)
    }
  }

  const updateNextPage = (nextPage: number) => {
    if (totalPage <= totalPage) {
      setNextPage(null)
    }
    setNextPage(nextPage)
  }
  return <Text>FeedScreen</Text>
}

export default MostPopularMovie
