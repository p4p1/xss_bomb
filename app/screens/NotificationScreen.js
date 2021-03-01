import React from 'react';
import { Text, Modal, RefreshControl, StyleSheet, ScrollView, View, Clipboard, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
      api_id: undefined,
      modal: false,
      selected: undefined
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.info = this.info.bind(this);
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
      this.setState({ data: json });
      this.setState({refreshing: false});
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.setState({refreshing: false});
      this.props.logout();
    });
  }

  async save(notification_data) {
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:notification');
      if (value !== null) {
        const new_value = JSON.parse(value);
        try {
          await AsyncStorage.setItem(
            '@xss_bomb:notification',
            JSON.stringify([ ...new_value, notification_data ])
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await AsyncStorage.setItem(
            '@xss_bomb:notification',
            JSON.stringify([ notification_data ])
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.props.logout();
    });
  }

  info(key) {
    fetch(`${this.props.url}user/get_notification/${key}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({modal: !this.state.modal});
      this.setState({selected: json[0]});
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
        <Modal animationType={"slide"} transparent={true}
            visible={this.state.modal} onRequestClose={() =>
            this.setState({modal: !this.state.modal})}>
          <View style={styles.modealContainer}>
            <View style={styles.inspector}>
              <Text style={styles.header}>
                {this.state.selected !== undefined ? this.state.selected.method : ""} 
                {this.state.selected !== undefined ? this.state.selected.link: ""}
              </Text>
              <Text style={styles.para}>
                {this.state.selected !== undefined && (this.state.selected.body !== undefined &&
                this.state.selected.body.length == 0) ? this.state.selected.body : "The body is empty"}
              </Text>
              <Text style={styles.para}>
                {this.state.selected !== undefined && this.state.selected.header[0]? this.state.selected.header[0].cookie : ""}
              </Text>
              <Text style={styles.para}>
                {this.state.selected !== undefined && this.state.selected.header[0]? this.state.selected.header[0].referer: ""}
              </Text>
            </View>
          </View>
        </Modal>
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
              this.state.data.map(
                (notifData,i) => <Notif data={notifData} key={i}
                  delete={(data) => this.remove(data)}
                  save={(data) => this.save(data)}
                  info={(data) => this.info(data)} />
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
  },
  inspector: {
    width: '85%',
    backgroundColor: '#222222',
    height: '95%'
  },
  modealContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
