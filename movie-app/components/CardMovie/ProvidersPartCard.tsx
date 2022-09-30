import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ProvidersFormattedToDisplay } from '../../interfaces/ProvidersFormattedToDispay'
import { Provider, Providers } from '../../interfaces/ProvidersResponseApi'
import { formatDuplicateProviders } from '../../utils/MoviesService'

const ProvidersPartCard = ({ providers }: { providers: Providers[] }) => {
  const [isProviders, setIsProviders] = useState<boolean>()
  const [flatrateProviders, setFlatrateProviders] = useState<Provider[]>()
  const [rentProviders, setRentProviders] = useState<Provider[]>()
  const [buyProviders, setBuyProviders] = useState<Provider[]>()
  const [buyAndRentProviders, setBuyAndRentProviders] = useState<Provider[]>()

  useEffect(() => {
    checkProviders(providers)
  }, [])
  const checkProviders = (providers: Providers[]) => {
    if (!providers) {
      return setIsProviders(false)
    } else {
      formatProvidersToDisplay()
      return setIsProviders(true)
    }
  }

  const formatProvidersToDisplay = () => {
    const flatrate = providers['flatrate']
    const buy = providers['buy']
    const rent = providers['rent']
    const providersFormatted: ProvidersFormattedToDisplay = formatDuplicateProviders(flatrate, rent, buy)

    setRentProviders(providersFormatted['rent'])
    setBuyProviders(providersFormatted['buy'])
    setFlatrateProviders(providersFormatted['flatrate'])
    setBuyAndRentProviders(providersFormatted['buyAndRent'])
  }

  return (
    <View>
      <Text style={styles.secondTitle}>Where to watch this movie in France?</Text>
      <View style={styles.providers}>
        {!isProviders && <Text style={styles.emptyProviders}>No providers or film still shown in cinema</Text>}
        {flatrateProviders &&
          flatrateProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text style={styles.typeProvider}>Streaming</Text>
              </View>
            )
          })}
        {buyAndRentProviders &&
          buyAndRentProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text style={styles.typeProvider}>Buy or Rent</Text>
              </View>
            )
          })}
        {rentProviders &&
          rentProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text style={styles.typeProvider}>Rent</Text>
              </View>
            )
          })}

        {buyProviders &&
          buyProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text style={styles.typeProvider}>Buy</Text>
              </View>
            )
          })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  secondTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 15,
    marginTop: 10,
  },
  providers: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  provider: {
    width: '33%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameProvider: {
    paddingTop: 10,
    fontSize: 10,
    textAlign: 'center',
  },
  typeProvider: {
    fontSize: 12,
  },
  emptyProviders: {},
})
export default ProvidersPartCard
