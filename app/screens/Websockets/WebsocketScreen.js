import React from 'react';
import { FlatList, Text, Modal, RefreshControl, StyleSheet, ScrollView, View, Clipboard, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

import SplashScreen from '../SplashScreen';
import Inspect from '../../components/Inspect.js';

import PropTypes from 'prop-types';

export default class WebsocketScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      refreshing: false,
      data: [],
      api_id: undefined,
      modal: false,
      selected: undefined
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  onRefresh() {
    this.setState({refreshing: true});
    fetch(`${this.props.url}websocket/0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({ data: json });
      this.setState({refreshing: false});
      this.setState({page: 0});
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.setState({refreshing: false});
      this.props.logout();
    });
  }

  loadMore() {
    var current_page = this.state.page + 1;
    fetch(`${this.props.url}websocket/${current_page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({data: [...this.state.data, ...json]});
      this.setState({page: current_page});
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
    if (this.state.data.length == 0) {
      return (
        <View style={styles.container}>
        <ScrollView style={{width:'90%', height:'80%' }}
        refreshControl={<RefreshControl refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}/>}>
          <View>
            <Text style={styles.header}>Waiting for requests on</Text>
            <TouchableOpacity style={styles.save_clip}
              onPress={() => Clipboard.setString(this.props.url.replace("https://", "wss://") + this.state.api_id)}>
              <Text style={styles.para}>{this.props.url.replace("https://", "wss://")}{this.state.api_id}</Text>
              <FontAwesomeIcon size={20} color={'#aaaaaa'} icon={ faCopy } />
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal animationType={"slide"} transparent={true}
            visible={this.state.modal} onRequestClose={() =>
            this.setState({modal: !this.state.modal})}>
          <Inspect selected={this.state.selected} run={() =>
            this.setState({modal: !this.state.modal})} />
        </Modal>
        <FlatList style={{width:'100%', height:'100%' }}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}/>} keyExtractor={item => item._id} data={this.state.data}
          renderItem={({item}) => (
            <Text style={styles.content}>{item.content}</Text>
          )} onEndReached={this.loadMore} onEndReachedThreshold={0.5} initialNumToRender={10}
          ListFooterComponent={<View style={{height:80}}></View>}
          ListHeaderComponent={<View style={{height:70}}></View>} />
      </View>
    );
  }
}

WebsocketScreen.propTypes = {
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
  content: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#333333',
    textAlign: 'left',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  },
});
