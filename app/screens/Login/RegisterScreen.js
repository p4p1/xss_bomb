import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import TextButton from '../../components/TextButton.js';

export default class RegisterScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      user: '',
      pass: '',
      pass_rep: ''
    }

    this.setUser = this.setUser.bind(this);
    this.setPass = this.setPass.bind(this);
    this.setPassRep = this.setPassRep.bind(this);
    this.register = this.register.bind(this);
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
  setPassRep(text) {
    this.setState({ pass_rep: text });
  }

  register() {
    if (this.state.pass === this.state.pass_rep) {
      fetch(`${this.props.url}auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.user,
          password: this.state.pass
        }),
      }).then((response) => response.json()).then((json) => {
        alert(json.msg);
        this.props.navigation.navigate('Login');
      }).catch((err) => {
        console.error(err);
        alert("Error: Are you connected to the internet?");
      });
    } else {
      alert("Password does not match");
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.header} onChangeText={text => this.setUser(text)}
          placeholderTextColor={'#fff'} placeholder={"username"} value={this.state.user} />
        <TextInput style={styles.header} secureTextEntry={true} placeholder={"password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPass(text)} value={this.state.pass} />
        <TextInput style={styles.header} secureTextEntry={true} placeholder={"repeat password"}
          placeholderTextColor={'#fff'} onChangeText={text => this.setPassRep(text)} value={this.state.pass_rep} />
        <TextButton text="Register" run={() => {this.register()}} />
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  url: PropTypes.string,
  run: PropTypes.func,
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
