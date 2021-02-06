import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Clipboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

import SplashScreen from './SplashScreen';
import TextButton from '../components/TextButton.js';

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
        <Text style={styles.header}>{this.state.data.username}</Text>
        <TouchableOpacity style={styles.save_clip}
          onPress={() => Clipboard.setString(this.props.url + this.state.data.api_id)}>
          <Text style={styles.para}>{this.props.url + this.state.data.api_id}</Text>
          <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
        </TouchableOpacity>
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
  save_clip:{
    flexDirection: 'row'
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
    fontSize: 15,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
});
