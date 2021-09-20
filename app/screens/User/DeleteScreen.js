import React from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../../components/TextButton.js';

export default class DeleteScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      pass: ''
    }

    this.setPass = this.setPass.bind(this);
    this.login = this.login.bind(this);
  }

  setPass(text) {
    this.setState({ pass: text });
  }

  login() {
    if (this.state.pass.length > 0) {
      fetch(`${this.props.url}user/nuke`, {
        method: 'DELETE',
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
        <Text style={styles.para}>This will delete all of your data and your account</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder={"Current password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextButton text="Delete Account" run={() => {this.login()}} />
      </View>
    );
  }
}

DeleteScreen.propTypes = {
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
