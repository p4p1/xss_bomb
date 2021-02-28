import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import PickServer from '../screens/Login/PickServer.js';
import LoginScreen from '../screens/Login/LoginScreen.js';
import RegisterScreen from '../screens/Login/RegisterScreen.js';

const Stack = createStackNavigator();
const navbarHeight = 65;

export default class LoginNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <PickServer {...props} refresh={() => this.props.getLink()} />}
        </Stack.Screen>
        <Stack.Screen name="Login" options={{ headerStyle: { height: navbarHeight },
          title: 'Login', headerTransparent: true }}>
          {props => <LoginScreen {...props} url={this.props.url}
            run={(tok) => this.props.saveToken(tok)} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerStyle: { height: navbarHeight },
          title: 'Register', headerTransparent: true }}>
          {props => <RegisterScreen {...props} url={this.props.url}
            run={(tok) => this.props.saveToken(tok)} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

LoginNavigator.propTypes = {
  getLink: PropTypes.function,
  saveToken: PropTypes.function,
  url: PropTypes.string,
}



