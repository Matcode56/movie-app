import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MovieResultWithProviders } from '../interfaces/MovieWithProviders'
import ProvidersPartCard from './ProvidersPartCard'

const MovieCard = ({ movie }: { movie: MovieResultWithProviders }) => {
  useEffect(() => {}, [])

  return (
    <View style={styles.containeur}>
      <View style={styles.headerCard}>
        <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View>
        <Text style={styles.textInfos}>
          {movie.vote_average === 0 ? (
            <Text>Note: No note at this moment</Text>
          ) : (
            <Text>Note: {movie.vote_average} / 10</Text>
          )}
          {'\n'}
          <Text style={styles.textInfos}>Nombre de votes: {movie.vote_count}</Text>
        </Text>
      </View>
      <Text style={styles.secondTitle}>Overview:</Text>
      <Text style={styles.overviewText}>{movie.overview}</Text>
      <ProvidersPartCard providers={movie.providers} />
    </View>
  )
}

const styles = StyleSheet.create({
  containeur: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#FFFDFA',
    padding: 15,
    marginTop: 10,
    borderRadius: 3,
    width: 350,
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
  },
  headerCard: {
    paddingRight: 35,
    paddingLeft: 35,
    paddingBottom: 5,
  },

  textInfos: {
    fontSize: 15,
    fontWeight: '400',
  },
  overviewText: {
    fontSize: 14,
    fontWeight: '400',
  },
  secondTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 270,
    padding: 10,
  },
})
export default MovieCard
