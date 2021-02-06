import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from './screens/SplashScreen.js';
import PickServer from './screens/PickServer.js';
import LoginScreen from './screens/LoginScreen.js';

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
        console.log(value);
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
        console.log(value);
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

  logout() {
    this.setState({token: undefined});
    this.setState({url: undefined});
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
    if (this.state.url == undefined) {
      return (
        <PickServer refresh={() => this.getLink()}/>
      );
    }
    if (this.state.token == undefined) {
      return (
        <LoginScreen url={this.state.url} run={(tok) => this.saveToken(tok)} />
      );
    }
    return (
      <NavigationContainer>
        <MainNavigator url={this.state.url} token={this.state.token}
            logout={() => this.logout()}/>
      </NavigationContainer>
    );
  }
}
