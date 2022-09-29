import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { getPopularMovie, getTopRatedMovie, requestGetProvidersOfMovie } from '../apiRequest/apiRequest'
import { getMoviesWithProviders } from '../apiRequest/apiService'
import MovieCard from '../components/bottom-navbar/MovieCard'
import { MovieResultWithProviders, MoviesWithProviders } from '../interfaces/MovieWithProviders'
import { MovieResult, TopPopularResponseApi } from '../interfaces/TopPopularResponseApi'

const MostPopularMovie = () => {
  const [movies, setMovies] = useState<MovieResultWithProviders[]>([])
  const [totalPage, setTotalPage] = useState<number>()
  const [nextPage, setNextPage] = useState<number>(1)

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    try {
      const data: MoviesWithProviders = await getMoviesWithProviders(nextPage)
      // console.log(data.results[0].providers)

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

  const updateMovie = (moviesToAdd: MovieResultWithProviders[]) => {
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
          <View style={styles.containeurOfCard}>
            <MovieCard movie={item} />
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  containeurOfCard: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MostPopularMovie
