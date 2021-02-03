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
      user: '',
      pass: ''
    }

    this.setUser = this.setUser.bind(this);
    this.setPass = this.setPass.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (this.props.url.length > 0) {
      this.setState({ value: this.props.url });
    }
  }

  setUser(text) {
    this.setState({ user: text });
  }

  setPass(text) {
    this.setState({ pass: text });
  }

  login() {
    fetch(`${this.props.url}auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.user,
        password: this.state.pass,
        notificationId: 'testing'
      }),
    }).then((response) => response.json()).then((json) => {
      alert(json.msg);
      if (json.token) {
        this.props.run(json.token);
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
          placeholderTextColor={'#fff'} placeholder={"username"} value={this.state.user} />
        <TextInput style={styles.header} secureTextEntry={true} placeholder={"password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextButton text="Login" run={() => {this.login()}} />
      </View>
    );
  }
}

CredsScreen.propTypes = {
  url: PropTypes.string,
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
