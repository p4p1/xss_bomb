import React from 'react';
import { Keyboard, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faBell, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const iconSize = 25;

export default class BottomTabBar extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      keyboard: false
    };

    this.navigateNotifications = this.navigateNotifications.bind(this);
    this.navigateWebSocket = this.navigateWebSocket.bind(this);
    this.navigateCode = this.navigateCode.bind(this);
    this.navigateProfile = this.navigateProfile.bind(this);
  }

  navigateNotifications() {
    this.props.navigation.navigate('Notifications');
    this.setState({selected: 0});
  }
  navigateWebSocket() {
    this.props.navigation.navigate('Notifications');
    this.setState({selected: 1});
  }
  navigateCode() {
    this.props.navigation.navigate('Code');
    this.setState({selected: 2});
  }
  navigateProfile() {
    this.props.navigation.navigate('Account');
    this.setState({selected: 3});
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboard: true});
    });
    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboard: false});
    });
  }

  render () {
    if (this.state.keyboard === true) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.button_container}>
          <TouchableOpacity onPress={this.navigateNotifications} style={(this.state.selected == 0) ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faBell }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateWebSocket} style={(this.state.selected == 1) ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faBars }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateCode} style={(this.state.selected == 2) ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faEdit }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateProfile} style={(this.state.selected == 3) ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faUserCircle }/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
BottomTabBar.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button_container: {
    backgroundColor: '#000',
    width: '50%',
    height: '70%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: "200",
    fontSize: 10,
    color: '#fff',
  },
  icons: {
    color: "#24FF1F",
  },
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  btn_container_selected: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#555555",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 15,
  }
});
