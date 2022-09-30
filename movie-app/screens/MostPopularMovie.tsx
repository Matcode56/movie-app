import React, { FC, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { getPopularMoviesWithProviders } from '../utils/MoviesService'
import MovieCard from '../components/CardMovie/MovieCard'
import { MovieResultWithProviders, MoviesWithProviders } from '../interfaces/MovieWithProviders'

const MostPopularMovie: FC = () => {
  const [movies, setMovies] = useState<MovieResultWithProviders[]>([])
  const [totalPage, setTotalPage] = useState<number>()
  const [nextPage, setNextPage] = useState<number>(1)

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async (): Promise<void> => {
    try {
      const data: MoviesWithProviders = await getPopularMoviesWithProviders(nextPage)
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
      return setNextPage(null)
    }
    return setNextPage(nextPagee)
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
          <View style={styles.containeurOfCards}>
            <MovieCard movie={item} />
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  containeurOfCards: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MostPopularMovie
