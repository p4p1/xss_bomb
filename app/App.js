import Constants from 'expo-constants';
import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from './screens/SplashScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import NotificationScreen from './screens/NotificationScreen.js';
import CredsScreen from './screens/CredsScreen.js';

const Drawer = createDrawerNavigator();

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
      notif_token: undefined,
      notification: undefined,
      user: '',
      pass: ''
    }

    this._handleNotification = this._handleNotification.bind(this)
    this._handleNotificationResponse = this._handleNotificationResponse.bind(this)
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
    this.loading = this.loading.bind(this);
    this.sendTkn = this.sendTkn.bind(this);
  }

  _handleNotification(notification) {
    this.setState({ notification: notification });
    alert(notification);
  }

  _handleNotificationResponse(response) {
    console.log(response);
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

  async loading() {
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
  }

  sendTkn(url, user, pass) {
    fetch(`${url}/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: this.state.notif_token,
        },
        username: user,
        password: pass
      }),
    }).then((response) => response.json()).then((json) => {
      if (json.data == 'ko') {
        alert("Error: please check server credentials");
      } else {
        alert("Url has been saved you will receive notifications in time");
      }
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
    this.setState({value: url});
    this.setState({user: user});
    this.setState({pass: pass});
  }

  componentDidMount() {
    this.loading();
  }

  render () {
    if (this.state.isLoading) {
      return (<SplashScreen />);
    }
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Payload">
          <Drawer.Screen name="Payload">
            {props => <HomeScreen {...props} url={this.state.value}
                    pass={this.state.pass} user={this.state.user} />}
          </Drawer.Screen>
          <Drawer.Screen name="Notification">
            {props => <NotificationScreen {...props} url={this.state.value}
                    pass={this.state.pass} user={this.state.user} />}
          </Drawer.Screen>
          <Drawer.Screen name="Creds">
            {props => <CredsScreen {...props} run={this.sendTkn} url={this.state.value} token={this.state.notif_token} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
