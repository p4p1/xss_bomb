import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import TopTabBar from './TopTabBar.js';

import FavoritesScreen from '../screens/Notifications/FavoritesScreen.js';
import NotificationScreen from '../screens/Notifications/NotificationScreen.js';

const Tab = createMaterialTopTabNavigator();

export default class NotifNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Main" swipeEnabled={false} screenOptions={{swipeEnabled: false}}
        tabBar={(props) => <TopTabBar {...props} />}>
        <Tab.Screen name="Main">
          {props => <NotificationScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {props => <FavoritesScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

NotifNavigator.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  logout: PropTypes.function,
}
