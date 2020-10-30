import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import PropTypes from 'prop-types';

import TextButton from '../components/TextButton.js';

export default class CredsScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://xss-notification-server/',
      user: 'xss',
      pass: 'bomb'
    }

    this.saveURI = this.saveURI.bind(this);
    this.setURI = this.setURI.bind(this);
  }

  componentDidMount() {
    if (this.props.url.length > 0) {
      this.setState({ value: this.props.url });
    }
  }

  setUser(text) {
    this.setState({ user: text });
    try {
      if (this.state.value == null) {
        AsyncStorage.removeItem('user');
      } else {
        AsyncStorage.setItem('user', this.state.user);
      }
    } catch(error) {
      console.error(error);
    }
  }

  setPass(text) {
    this.setState({ pass: text });
    try {
      if (this.state.value == null) {
        AsyncStorage.removeItem('pass');
      } else {
        AsyncStorage.setItem('pass', this.state.pass);
      }
    } catch(error) {
      console.error(error);
    }
  }

  setURI(text) {
    this.setState({ value: text });
    try {
      if (this.state.value == null) {
        AsyncStorage.removeItem('link');
      } else {
        AsyncStorage.setItem('link', this.state.value);
      }
    } catch(error) {
      console.error(error);
    }
  }

  saveURI() {
    fetch(`${this.state.value}/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: this.props.token,
        },
        username: this.state.user,
        password: this.state.pass
      }),
    }).then((response) => response.json()).then((json) => {
      if (json.data == 'ko') {
        alert("Error: please check server credentials");
      } else {
        alert("Url has been saved you will receive notifications in time");
      }
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.header} onChangeText={text => this.setUser(text)}
                                                      value={this.state.user} />
        <TextInput style={styles.header} secureTextEntry={true}
                onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextInput style={styles.header} onChangeText={text => this.setURI(text)}
                                                      value={this.state.value} />
        <TextButton text="Save Credentials" run={() => {this.props.run(this.state.value, this.state.user, this.state.pass)}} />
      </View>
    );
  }
}

CredsScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  run: PropTypes.func
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
