import React from 'react';
import { Text, RefreshControl, StyleSheet, ScrollView, View } from 'react-native';
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
    }

    this.onRefresh = this.onRefresh.bind(this);
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


  componentDidMount() {
    this.onRefresh();
  }

  render () {
    return (
      <View style={styles.container}>
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
                  delete={(data) => this.remove(data)}
                  save={(data) => this.save(data)}/>
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
  }
});
