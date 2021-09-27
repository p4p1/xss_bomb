import React from 'react';
import { Modal, Text, RefreshControl, StyleSheet, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import FavNotif from '../../components/FavNotif.js';
import Inspect from '../../components/Inspect.js';

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
      console.error(error);
    }
    this.setState({refreshing: false});
  }

  info(index) {
    this.setState({selected: this.state.data[index]});
    this.setState({modal: !this.state.modal});
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
          <Inspect selected={this.state.selected} run={() =>
            this.setState({modal: !this.state.modal})} />
        </Modal>
        <ScrollView style={{width:'100%', height:'80%' }}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}/>}>
          <View style={{height: 80}}></View>
          {
            this.state.data.length == 0 ?
              <View>
                <Text style={styles.header}>You do not have any favorites!</Text>
              </View>
            :
              this.state.data.reverse().map(
                (notifData,i) => <FavNotif data={notifData} key={i}
                  delete={() => this.remove(i)}
                  info={() => this.info(i)} />
              )
          }
          <View style={{height: 80}}></View>
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
});
