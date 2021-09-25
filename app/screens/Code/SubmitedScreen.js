import React from 'react';
import { Text, RefreshControl, StyleSheet, FlatList, View } from 'react-native';

import Code from '../../components/Code.js';

import PropTypes from 'prop-types';

export default class SubmitedScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loadingMore: true,
      data: [],
      page: 0,
      selected: undefined
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  onRefresh() {
    this.setState({refreshing: true});
    fetch(`${this.props.url}code/0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({page: 0});
      this.setState({data: json});
      this.setState({refreshing: false});
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.setState({refreshing: false});
      this.props.logout();
    });
  }

  loadMore() {
    var current_page = this.state.page + 1;
    fetch(`${this.props.url}code/${current_page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
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
  }

  render () {
    if (this.state.data.length == 0) {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Nothing has been shared yet!</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList style={{width:'100%', height:'100%' }}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}/>} keyExtractor={item => item._id} data={this.state.data}
          renderItem={({item}) => (
            <Code data={item} run={() => this.props.setCode(item._id)} />
          )} onEndReached={this.loadMore} onEndReachedThreshold={0.5} initialNumToRender={10}
          ListFooterComponent={<View style={{height:80}}></View>}
          ListHeaderComponent={<View style={{height:50}}></View>} />
      </View>
    );
  }
}

SubmitedScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  setCode: PropTypes.function,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
    alignItems: 'center',
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
});
