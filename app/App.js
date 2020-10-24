import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeScreen.js';
import SplashScreen from './screens/SplashScreen.js';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
});

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: true,
      notif_token: undefined
    }

    this._handleNotification = this._handleNotification.bind(this)
    this._handleNotificationResponse = this._handleNotificationResponse.bind(this)
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
  }

  _handleNotification(notification) {
    this.setState({ notification: notification });
    alert(notification);
  }

  _handleNotificationResponse(response) {
    console.log(response);
    alert(response);
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  async componentDidMount() {
    let token = await this.registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({ notif_token: token });
    try {
      const link = await AsyncStorage.getItem('link');

      if (link !== null) {
        this.setState({ value: link});
      }
      this.setState({ isLoading: false });
    } catch(error) {
      console.error(error);
    }
    alert(token);
  }

  render () {
    if (this.state.isLoading) {
      return (<SplashScreen />);
    }
    return (
      <View style={styles.container}>
        <HomeScreen url={this.state.value} token={this.state.notif_token} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
