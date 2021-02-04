import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../components/TextButton.js';

import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default class CredsScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    }

    this.setUser = this.setUser.bind(this);
    this.setPass = this.setPass.bind(this);
    this.login = this.login.bind(this);

    this._handleNotification = this._handleNotification.bind(this);
    this._handleNotificationResponse = this._handleNotificationResponse.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
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
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
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

  _handleNotification(notification) {
    this.setState({ notification: notification });
  }

  _handleNotificationResponse(response) {
    console.log(response);
  }

  componentDidMount() {
    if (this.props.url.length > 0) {
      this.setState({ value: this.props.url });
    }
  }

  setUser(text) {
    this.setState({ user: text });
  }

  setPass(text) {
    this.setState({ pass: text });
  }

  async login() {
    let not_token = await this.registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    fetch(`${this.props.url}auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.user,
        password: this.state.pass,
        notificationId: not_token
      }),
    }).then((response) => response.json()).then((json) => {
      alert(json.msg);
      if (json.token) {
        this.props.run(json.token);
      }
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.header} onChangeText={text => this.setUser(text)}
          placeholderTextColor={'#fff'} placeholder={"username"} value={this.state.user} />
        <TextInput style={styles.header} secureTextEntry={true} placeholder={"password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextButton text="Login" run={() => {this.login()}} />
      </View>
    );
  }
}

CredsScreen.propTypes = {
  url: PropTypes.string,
  run: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '90%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  }
});
