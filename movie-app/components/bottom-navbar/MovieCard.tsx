import React from 'react'
import { Text } from 'react-native'
import { MovieResult } from '../../interfaces/TopPopularResponseApi'

const MovieCard = ({ movie }: { movie: MovieResult }) => {
  return (
    <>
      <Text>{movie.overview}</Text>
    </>
  )
}

export default MovieCard
