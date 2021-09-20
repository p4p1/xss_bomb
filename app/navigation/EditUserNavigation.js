import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import ChangeLoginScreen from '../screens/EditUser/ChangeLoginScreen.js';
import UserScreen from '../screens/EditUser/UserScreen.js';
import DeleteScreen from '../screens/EditUser/DeleteScreen.js';
import HelpScreen from '../screens/EditUser/HelpScreen.js';

const Stack = createStackNavigator();
const navbarHeight = 65;

export default class EditUserNavigation extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <UserScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="Edit" options={{ headerStyle: { height: navbarHeight },
          title: 'Edit username or password', headerTransparent: true }}>
          {props => <ChangeLoginScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="Delete" options={{ headerStyle: { height: navbarHeight },
          title: 'Delete account', headerTransparent: true }}>
          {props => <DeleteScreen {...props} logout={() => this.props.logout()}
            token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
        <Stack.Screen name="Help" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <HelpScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

EditUserNavigation.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  logout: PropTypes.function,
}



