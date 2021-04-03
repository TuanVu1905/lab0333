import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LandingScreen';


import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// gọi thư viện redux
import { store } from './src/redux/store'
import {Provider} from 'react-redux'


//gọi các màn hình
import  {SearchScreen}  from './src/screens/SearchScreen';
import { RestaurentScreen } from './src/screens/RestaurentScreen';
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { CardScreen } from './src/screens/CardScreen';
import { OfferScreen } from './src/screens/OfferScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import {CartDetailScreen} from './src/screens/CartDetailScreen'



const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
      // search address screen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    }),

  },

  homeStack: createBottomTabNavigator({
    // Home tab Icon
    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurentPage: RestaurentScreen ,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          // nếu được click => icon màu đỏ, ngược lại màu trắng
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    // offer tab Icon
    Offer: {
      screen: createStackNavigator({
        OfferPage: OfferScreen,
        RestaurentPage: RestaurentScreen ,
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    // cart tab Icon
    Cart: {
      screen: createStackNavigator({
        CartPage: CardScreen,
        LoginPage : LoginScreen,
        CartDetailPage : CartDetailScreen,
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    // account tab Icon
    Account: {
      screen: createStackNavigator({
        AccountPage: AccountScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    }
  })
});


const AppNavigation = createAppContainer(switchNavigator);


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>

  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
});
