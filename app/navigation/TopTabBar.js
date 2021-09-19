import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faStar } from '@fortawesome/free-solid-svg-icons'

const iconSize = 25;

export default class TopTabBar extends React.Component
{
  constructor(props) {
    super(props);

    this.navigateFirst = this.navigateFirst.bind(this);
    this.navigateSecond = this.navigateSecond.bind(this);
  }

  navigateFirst() {
    this.props.navigation.navigate('Main');
  }
  navigateSecond() {
    this.props.navigation.navigate('Favorites');
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.button_container}>
          <TouchableOpacity onPress={this.navigateFirst} style={this.props.navigationState.index == 0 ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faBell }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateSecond} style={this.props.navigationState.index == 1 ? styles.btn_container_selected : styles.btn_container}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faStar }/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TopTabBar.propTypes = {
  navigation: PropTypes.object,
  navigationState: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    backgroundColor: '#444333',
  },
  button_container: {
    backgroundColor: '#000',
    width: '20%',
    height: '50%',
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
