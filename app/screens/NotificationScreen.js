import React from 'react';
import { Text, RefreshControl, StyleSheet, ScrollView, View, Clipboard, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

import SplashScreen from './SplashScreen';
import Notif from '../components/Notif.js';

import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      bugdata: [],
      api_id: undefined,
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.remove = this.remove.bind(this);
  }

  onRefresh() {
    this.setState({refreshing: true});
    fetch(`${this.props.url}user/get_notifications`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({ data: json });
      this.setState({refreshing: false});
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.setState({refreshing: false});
      this.props.logout();
    });
  }

  remove(notification_id) {
    fetch(`${this.props.url}user/notification`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        id: notification_id
      }),
    }).then((response) => response.json()).then((json) => {
      this.onRefresh();
      console.log(json);
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.props.logout();
    });
  }

  componentDidMount() {
    this.onRefresh();
    fetch(`${this.props.url}user/get_api`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({ api_id: json.token });
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.props.logout();
    });
  }

  render () {
    if (this.state.api_id == undefined) {
      return (<SplashScreen />);
    }
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'90%', height:'80%' }}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}/>}>
          {
            this.state.data.length == 0 ?
              <View>
                <Text style={styles.header}>Waiting for requests on</Text>
                <TouchableOpacity style={styles.save_clip}
                  onPress={() => Clipboard.setString(this.props.url + "api/" + this.state.api_id)}>
                  <Text style={styles.para}>{this.props.url}api/{this.state.api_id}</Text>
                  <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
                </TouchableOpacity>
              </View>
            :
              this.state.data.reverse().map(
                (notifData,i) => <Notif data={notifData} key={i}
                  delete={(data) => this.remove(data)} />
              )
          }
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
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
    justifyContent: 'center',
    flexDirection: 'row'
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    marginTop: 100,
    textAlign: 'center',
    width: '100%',
  },
  para: {
    fontSize: 15,
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
    borderRadius: 30,
  }
});
