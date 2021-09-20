import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import MainScreen from '../../screens/Code/MainScreen.js';
import CodeScreen from '../../screens/Code/CodeScreen.js';
import SubmitedScreen from '../../screens/Code/SubmitedScreen.js';
import FavoritesScreen from '../../screens/Code/FavoritesScreen.js';

const Stack = createStackNavigator();
const navbarHeight = 65;

export default class CodeNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="CodeMain">
        <Stack.Screen name="CodeMain" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <MainScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="CodeEditor" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <CodeScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="CodeFavorites" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <FavoritesScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="CodeSubmited" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <SubmitedScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

CodeNavigator.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  logout: PropTypes.function,
}
