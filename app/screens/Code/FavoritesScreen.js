import React from 'react';
import { Text, RefreshControl, StyleSheet, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Code from '../../components/Code.js';

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
  }

  async onRefresh() {
    this.setState({refreshing: true});
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:code');
      if (value !== null) {
        this.setState({ data: JSON.parse(value) });
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({refreshing: false});
  }

  async remove(index) {
    var new_data = this.state.data.filter(item => item !== this.state.data[index]);
    try {
      await AsyncStorage.setItem(
        '@xss_bomb:code',
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
        <ScrollView style={{width:'100%', height:'100%' }}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}/>}>
          <View style={{height: 50}}></View>
          {
            this.state.data.length == 0 ?
              <View>
                <Text style={styles.header}>Nothing saved as favorite!</Text>
              </View>
            :
              this.state.data.map(
                (codeData,i) => <Code data={codeData}
                  run={() => this.props.navigation.navigate('InspectFavCode', {"data" : codeData})} key={i} />
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
