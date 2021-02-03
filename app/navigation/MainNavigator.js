import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';

import HomeScreen from '../screens/HomeScreen.js';
import NotificationScreen from '../screens/NotificationScreen.js';

const Drawer = createDrawerNavigator();

export default class MainNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer.Navigator initialRouteName="Notifications" drawerContentOptions={{
        activeTintColor:'#444333',
      }}>
        <Drawer.Screen name="Notifications">
          {props => <NotificationScreen {...props} logout={this.props.run}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
        <Drawer.Screen name="Payload">
          {props => <HomeScreen {...props} logout={this.props.run}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

MainNavigator.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  run: PropTypes.func,
  location: PropTypes.object,
}
