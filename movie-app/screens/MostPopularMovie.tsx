import React, { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import { getPopularMovie, getTopRatedMovie } from '../apiRequest/apiRequest'
import MovieCard from '../components/bottom-navbar/MovieCard'
import { MovieResult, TopPopularResponseApi } from '../interfaces/TopPopularResponseApi'

const MostPopularMovie = () => {
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [totalPage, setTotalPage] = useState<number>()
  const [nextPage, setNextPage] = useState<number>(1)

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    console.log('work')

    try {
      const data: TopPopularResponseApi = await getPopularMovie(nextPage)
      const movies = data.results
      const totalPage = data.total_pages
      const page = data.page
      updateMovie(movies)
      setTotalPage(totalPage)
      updateNextPage(page)
    } catch (err) {
      console.log(err)
    }
  }

  const updateNextPage = (currentPage: number) => {
    const nextPagee = currentPage + 1
    if (totalPage < nextPagee) {
      setNextPage(null)
    }
    setNextPage(nextPagee)
  }

  const updateMovie = (moviesToAdd: MovieResult[]) => {
    const oldDataMovies = movies
    return setMovies([...oldDataMovies, ...moviesToAdd])
  }

  const fetchMoreData = async () => {
    if (nextPage) getMovies()
  }
  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.original_title}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.2}
      renderItem={({ item }) => {
        return (
          <>
            <MovieCard movie={item} />
          </>
        )
      }}
    />
  )
}

export default MostPopularMovie
