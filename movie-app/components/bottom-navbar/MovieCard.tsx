import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MovieResult } from '../../interfaces/TopPopularResponseApi'

const MovieCard = ({ movie }: { movie: MovieResult }) => {
  console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}`)

  return (
    <View style={styles.containeur}>
      <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text>Release date: {movie.release_date}</Text>
      <Text>
        Note: {movie.vote_average}/10
        {'\n'}
        <Text> Votes number: {movie.vote_count}</Text>
      </Text>

      <Text>
        <Text>Overview:</Text>
        {'\n'}
        {movie.overview}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  image: {
    width: 225,
    height: 240,
    padding: 10,
  },
  containeur: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#FFFDFA',
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: '80%',
  },
})
export default MovieCard
