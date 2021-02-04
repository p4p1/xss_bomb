import React from 'react';
import { Text, RefreshControl, StyleSheet, ScrollView, View } from 'react-native';

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
    }

    this.onRefresh = this.onRefresh.bind(this);
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
              <Text style={styles.header}>Scroll to refresh</Text>
            :
              this.state.data.reverse().map(
                  (notifData,i) => <Notif data={notifData} key={i}/>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  }
});
