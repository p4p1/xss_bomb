import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from './screens/SplashScreen.js';
import PickServer from './screens/PickServer.js';
import LoginScreen from './screens/LoginScreen.js';


export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      isLoading: true
    };

    this.getLink = this.getLink.bind(this);
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

  async componentDidMount() {
    await this.getLink();
    this.setState({ isLoading: false });
  }

  render () {
    if (this.state.isLoading) {
      return (<SplashScreen />);
    }
    if (this.state.url == undefined) {
      return (
        <PickServer refresh={this.getLink}/>
      );
    }
    return (
      <LoginScreen url={this.state.url}/>
    );
  }
}
