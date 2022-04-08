import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Clipboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const iconSize = 45;

import PropTypes from 'prop-types';

import SplashScreen from '../SplashScreen.js';
import TextButton from '../../components/TextButton.js';

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
        <View style={styles.helpButtonCont}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("Help")}}>
            <FontAwesomeIcon size={iconSize} style={styles.icons} icon={ faQuestionCircle }/>
          </TouchableOpacity>
        </View>
        <View style={styles.mainCont}>
          <Text style={styles.header}>{this.state.data.username} (posts: {this.state.data.posts.length})</Text>
          <TouchableOpacity style={styles.save_clip}
            onPress={() => Clipboard.setString(this.props.url + "api/" + this.state.data.api_id)}>
            <Text style={styles.para}>{this.props.url}api/{this.state.data.api_id}</Text>
            <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.save_clip}
            onPress={() => Clipboard.setString(this.props.url + "api/" + this.state.data.api_id + "/pic")}>
            <Text style={styles.para}>{this.props.url}api/{this.state.data.api_id}/pic</Text>
            <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.save_clip}
            onPress={() => Clipboard.setString(this.props.url + "api/" + this.state.data.api_id + "/code")}>
            <Text style={styles.para}>{this.props.url}api/{this.state.data.api_id}/code</Text>
            <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.save_clip}
            onPress={() => Clipboard.setString(this.props.url.replace("https://", "wss://") + this.state.data.api_id)}>
            <Text style={styles.para}>{this.props.url.replace("https://", "wss://")}{this.state.data.api_id}</Text>
            <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
          </TouchableOpacity>
          <TextButton text="Change username and password" run={() => {this.props.navigation.navigate('Edit')}} />
          <TextButton text="Delete account" run={() => {this.props.navigation.navigate('Delete')}} />
          <TextButton text="Logout" run={() => {this.props.logout()}} />
        </View>
      </View>
    );
  }
}

UserScreen.propTypes = {
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
  },
  mainCont: {
    width: '100%',
    height: '90%',
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
    width: '100%',
    marginBottom: 15,
    textAlign: 'center',
  },
  para: {
    fontSize: 15,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  helpButtonCont: {
    width: '100%',
    height: '10%',
    flexDirection: 'row-reverse'
  },
  icons: {
    color: "#fff",
    marginTop: 40,
    marginRight: 20,
  },
});
