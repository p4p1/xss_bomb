import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import SplashScreen from './SplashScreen';
import TextButton from '../components/TextButton.js';

const logo = '../assets/icon.png';

export default class UserScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }
  }

  componentDidMount() {
    fetch(`${this.props.url}user/get_user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({ data: json });
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.props.logout();
    });
  }

  render () {
    if (this.state.data == undefined) {
      return (<SplashScreen />);
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require(logo)} />
        <Text style={styles.header}>{this.state.data.username}</Text>
        <Text style={styles.para}>{this.state.data.api_id}</Text>
        <TextButton text="Logout" run={() => {this.props.logout()}} />
      </View>
    );
  }
}

UserScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 5,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  para: {
    fontSize: 25,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 20,
  }
});
