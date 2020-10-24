import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import PropTypes from 'prop-types';

import TextButton from '../components/TextButton.js';
const logo = '../assets/icon.png';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://xss-notification-server/',
    }

    this.saveURI = this.saveURI.bind(this);
    this.setURI = this.setURI.bind(this);
  }

  componentDidMount() {
    if (this.props.url.length > 0) {
      this.setState({ value: this.props.url });
    }
  }

  setURI(text) {
    this.setState({ value: text });
  }

  async saveURI() {
    alert("Url has been saved you will receive notifications in time");

    try {
      if (this.state.value == null) {
        await AsyncStorage.removeItem('link');
      } else {
        await AsyncStorage.setItem('link', this.state.value);
      }
    } catch(error) {
      console.error(error);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require(logo)} />
        <TextInput style={styles.header} onChangeText={text => this.setURI(text)} value={this.state.value} />
        <TextButton text="Save Url" run={this.saveURI} />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  url: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '90%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  }
});
