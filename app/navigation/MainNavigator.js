import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';

import BottomTabBar from './BottomTabBar.js';


import EditUserNavigation from './User/EditUserNavigation.js';
import NotifNavigator from './Notif/NotifNavigator.js';
import CodeNavigator from './Code/CodeNavigator.js';
import WebsocketScreen from '../screens/Websockets/WebsocketScreen.js';

const Tab = createBottomTabNavigator();

export default class MainNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator  initialRouteName="Notifications"
        tabBar={(props) => <BottomTabBar {...props} />}>
        <Tab.Screen name="Notifications">
          {props => <NotifNavigator{...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
        <Tab.Screen name="Websocket">
          {props => <WebsocketScreen {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
        <Tab.Screen name="Code">
          {props => <CodeNavigator{...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
        <Tab.Screen name="Account">
          {props => <EditUserNavigation {...props} logout={() => this.props.logout()}
          token={this.props.token} url={this.props.url} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

MainNavigator.propTypes = {
  url: PropTypes.String,
  token: PropTypes.string,
  logout: PropTypes.function,
}
