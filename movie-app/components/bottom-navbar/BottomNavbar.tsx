import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import TopRatedMovie from '../../screens/TopRatedMovie'
import MostPopularMovie from '../../screens/MostPopularMovie'

const BottomNavbar = () => {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'TopRatedMovie') {
              iconName = focused ? 'checkmark-circle-sharp' : 'checkmark-circle-outline'
            } else if (route.name === 'MostPopularMovie') {
              iconName = focused ? 'bar-chart-outline' : 'bar-chart-sharp'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },

          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='TopRatedMovie' component={TopRatedMovie} />
        <Tab.Screen name='MostPopularMovie' component={MostPopularMovie} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomNavbar
