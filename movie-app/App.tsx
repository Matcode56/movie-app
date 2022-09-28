import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import TopRatedMovie from './screens/TopRatedMovie'
import MostPopularMovie from './screens/MostPopularMovie'
const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Top rated movie') {
              iconName = focused ? 'checkmark-circle-sharp' : 'checkmark-circle-outline'
            } else if (route.name === 'Popular movie') {
              iconName = focused ? 'bar-chart-outline' : 'bar-chart-sharp'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },

          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Top rated movie' component={TopRatedMovie} />
        <Tab.Screen name='Popular movie' component={MostPopularMovie} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
