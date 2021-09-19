import React from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../../components/TextButton.js';

export default class ChangeLoginScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      user: '',
      pass: ''
    }

    this.setUser = this.setUser.bind(this);
    this.setPass = this.setPass.bind(this);
    this.login = this.login.bind(this);
  }

  setUser(text) {
    this.setState({ user: text });
  }

  setPass(text) {
    this.setState({ pass: text });
  }

  login() {
    if (this.state.user.length > 0) {
      fetch(`${this.props.url}user/change_username`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          username: this.state.user,
        }),
      }).then((response) => response.json()).then((json) => {
        alert(json.msg);
        this.props.logout();
      }).catch((err) => {
        console.error(err);
        alert("Error: Could not connect");
        this.props.logout();
      });
    }
    if (this.state.pass.length > 0) {
      fetch(`${this.props.url}user/change_password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          password: this.state.pass,
        }),
      }).then((response) => response.json()).then((json) => {
        alert(json.msg);
        this.props.logout();
      }).catch((err) => {
        console.error(err);
        alert("Error: Could not connect");
        this.props.logout();
      });
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Warning</Text>
        <Text style={styles.para}>On modification you will be asked to login with your new Id</Text>
        <TextInput style={styles.input} onChangeText={text => this.setUser(text)}
          placeholderTextColor={'#fff'} placeholder={"new username"} value={this.state.user} />
        <TextInput style={styles.input} secureTextEntry={true} placeholder={"new password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextButton text="Change" run={() => {this.login()}} />
      </View>
    );
  }
}

ChangeLoginScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  navigation: PropTypes.object
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
  input: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '90%',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  para: {
    fontSize: 15,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 35,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
});
