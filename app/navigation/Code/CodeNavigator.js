import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import CodeScreen from '../../screens/Code/CodeScreen.js';

const Stack = createStackNavigator();
const navbarHeight = 65;

export default class CodeNavigator extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="CodeEditor">
        <Stack.Screen name="CodeEditor" options={{ headerStyle: { height: navbarHeight },
          title: '', headerTransparent: true }}>
          {props => <CodeScreen {...props} logout={() => this.props.logout()}
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
