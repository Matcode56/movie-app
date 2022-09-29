import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { Provider, Providers } from '../interfaces/ProvidersResponseApi'

const ProvidersPartCard = ({ providers }: { providers: Providers[] }) => {
  const [isProviders, setIsProviders] = useState<boolean>()
  const [flatrateProviders, setFlatrateProviders] = useState<Provider[]>()
  const [rentProviders, setRentProvider] = useState<Provider[]>()
  const [buyProviders, setBuyProvider] = useState<Provider[]>()

  useEffect(() => {
    checkProviders(providers)
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
    <View>
      <Text style={styles.secondTitle}>Where to watch this movie in France?</Text>
      <View style={styles.providers}>
        {!isProviders && <Text>No providers or film still shown in theaters</Text>}
        {rentProviders &&
          rentProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text>Rent</Text>
              </View>
            )
          })}
        {buyProviders &&
          buyProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text>Buy</Text>
              </View>
            )
          })}
        {flatrateProviders &&
          flatrateProviders.map((value, index) => {
            return (
              <View key={index} style={styles.provider}>
                <Image style={styles.logo} source={{ uri: `https://image.tmdb.org/t/p/w500${value['logo_path']}` }} />
                <Text style={styles.nameProvider}> {value['provider_name']}</Text>
                <Text>Streaming</Text>
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
    marginBottom: 10,
    marginTop: 10,
  },
  providers: { flexDirection: 'row', flexWrap: 'wrap' },
  provider: {
    width: '50%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameProvider: {
    paddingTop: 10,
    fontSize: 10,
    textAlign: 'center',
  },
})
export default ProvidersPartCard
