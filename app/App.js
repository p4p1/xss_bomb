import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from './screens/SplashScreen.js';

import LoginNavigator from './navigation/LoginNavigator.js';
import MainNavigator from './navigation/MainNavigator.js';

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      token: undefined,
      isLoading: true
    };

    this.getLink = this.getLink.bind(this);
    this.getToken = this.getToken.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  async getLink() {
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:server');
      if (value !== null) {
        this.setState({ url: value });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getToken() {
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:token');
      if (value !== null) {
        this.setState({ token: value });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveToken(tkn) {
    try {
      this.setState({ token: tkn });
      await AsyncStorage.setItem(
        '@xss_bomb:token',
        tkn
      );
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      this.setState({ url: undefined });
      this.setState({ token: undefined });
      await AsyncStorage.removeItem('@xss_bomb:server');
      await AsyncStorage.removeItem('@xss_bomb:token');
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    await this.getLink();
    await this.getToken();
    this.setState({ isLoading: false });
  }

  render () {
    if (this.state.isLoading) {
      return (<SplashScreen />);
    }
    if (this.state.url == undefined || this.state.token == undefined) {
      return (
        <NavigationContainer>
          <LoginNavigator url={this.state.url} saveToken={(tok) => this.saveToken(tok)}
            getLink={() => this.getLink()}/>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <MainNavigator url={this.state.url} token={this.state.token}
              logout={() => this.logout()}/>
        </NavigationContainer>
      );
    }
  }
}
