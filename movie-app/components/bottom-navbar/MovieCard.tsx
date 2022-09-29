import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MovieResultWithProviders } from '../../interfaces/MovieWithProviders'
import { Provider, Providers } from '../../interfaces/ProvidersResponseApi'

const MovieCard = ({ movie }: { movie: MovieResultWithProviders }) => {
  const [isProviders, setIsProviders] = useState<boolean>()
  const [flatrateProviders, setFlatrateProviders] = useState<Provider[]>()
  const [rentProviders, setRentProvider] = useState<Provider[]>()
  const [buyProviders, setBuyProvider] = useState<Provider[]>()

  useEffect(() => {
    checkProviders(movie.providers)
  }, [])

  const checkProviders = (providers: Providers[]) => {
    if (!providers) {
      return setIsProviders(false)
    }

    const flatrate = providers['flatrate']
    const buy = providers['buy']
    const rent = providers['rent']

    rent && setRentProvider(rent)
    buy && setBuyProvider(buy)
    flatrate && setFlatrateProviders(flatrate)
    return setIsProviders(true)
  }

  return (
    <View style={styles.containeur}>
      <View style={styles.headerCard}>
        <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View>
        <Text style={styles.textInfos}>Release date: {movie.release_date}</Text>
        <Text style={styles.textInfos}>
          Note: {movie.vote_average} / 10
          {'\n'}
          <Text style={styles.textInfos}>Votes number: {movie.vote_count}</Text>
        </Text>
      </View>
      <Text style={styles.secondTitle}>Overview:</Text>
      <Text style={styles.overviewText}>{movie.overview}</Text>
      <View style={styles.providers}>
        <Text style={styles.secondTitle}>Where to watch this movie in France?</Text>
        {!isProviders ? (
          <Text>No providers or film still shown in theaters</Text>
        ) : (
          flatrateProviders &&
          flatrateProviders.map((value, index) => {
            return (
              <View key={index}>
                <Text> {value['provider_name']}</Text>
              </View>
            )
          })
        )}
      </View>
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
    width: 300,
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

  providers: {},
})
export default MovieCard
