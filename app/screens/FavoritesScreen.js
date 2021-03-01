import React from 'react';
import { Modal, Text, RefreshControl, StyleSheet, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import FavNotif from '../components/FavNotif.js';

import PropTypes from 'prop-types';

export default class FavoritesScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      modal: false,
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.remove = this.remove.bind(this);
    this.info = this.info.bind(this);
  }

  async onRefresh() {
    this.setState({refreshing: true});
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:notification');
      if (value !== null) {
        this.setState({ data: JSON.parse(value) });
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({refreshing: false});
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

  async remove(index) {
    var new_data = this.state.data.filter(item => item !== this.state.data[index]);
    try {
      await AsyncStorage.setItem(
        '@xss_bomb:notification',
        JSON.stringify(new_data)
      );
    } catch (error) {
      console.error(error);
    }
    this.onRefresh();
  }

  componentDidMount() {
    this.onRefresh();
  }

  render () {
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
                <Text style={styles.header}>You do not have any favorites!</Text>
              </View>
            :
              this.state.data.reverse().map(
                (notifData,i) => <FavNotif data={notifData} key={i}
                  delete={() => this.remove(i)}
                  info={(data) => this.info(data)} />
              )
          }
        </ScrollView>
      </View>
    );
  }
}

FavoritesScreen.propTypes = {
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
