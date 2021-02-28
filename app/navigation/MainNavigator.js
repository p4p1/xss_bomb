import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';

import EditUserNavigation from './EditUserNavigation.js';
import FavoritesScreen from '../screens/FavoritesScreen.js';
import CodeScreen from '../screens/CodeScreen.js';
import NotificationScreen from '../screens/NotificationScreen.js';
import HelpScreen from '../screens/HelpScreen.js';

const Drawer = createDrawerNavigator();

export default class MainNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer.Navigator initialRouteName="Notifications" drawerContentOptions={{
        activeTintColor:'#24FF1F',
        inactiveTintColor:'#fff',
      }} drawerStyle={{
        backgroundColor: '#222222',
      }}>
        <Drawer.Screen name="Notifications">
          {props => <NotificationScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
        <Drawer.Screen name="Favorites">
          {props => <FavoritesScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
        <Drawer.Screen name="Code">
          {props => <CodeScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
        <Drawer.Screen name="Account">
          {props => <EditUserNavigation {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
        <Drawer.Screen name="Help">
          {props => <HelpScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

MainNavigator.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  logout: PropTypes.function,
}
