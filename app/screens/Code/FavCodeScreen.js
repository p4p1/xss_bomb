import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';

import SplashScreen from '../SplashScreen.js';
import TextButton from '../../components/TextButton.js';

export default class FavCodeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }

    this.setCode = this.setCode.bind(this);
  }

  setCode() {
    fetch(`${this.props.url}user/set_code`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        code: this.state.data.code,
      }),
    }).then((response) => response.json()).then((body) => {
      alert(body.msg);
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  componentDidMount() {
    /*fetch(`${this.props.url}code/get_code/${this.props.route.params["codeId"]}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
    }).then((response) => response.json()).then((json) => {
      this.setState({data: json});
    }).catch((err) => {
      console.error(err);
    });*/
    this.setState({data: this.props.route.params["data"]});
  }

  render () {
    if (this.state.data== undefined) {
      return (<SplashScreen />);
    }
    return (
      <View style={styles.container}>
        <View style={styles.mainCont}>
          <Text style={styles.header}>{this.state.data.name}</Text>
          <Text style={styles.para}>{this.state.data.description}</Text>
          <View style={styles.sourceCode}>
            <Text style={styles.para}>{this.state.data.code}</Text>
          </View>
          <TextButton text="Set as my own!" run={() => {this.setCode()}} />
        </View>
      </View>
    );
  }
}

FavCodeScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  route: PropTypes.object,
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
    paddingTop: 80,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  header: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  para: {
    width: '100%',
    fontSize: 15,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  sourceCode: {
    width: '100%',
    height: '60%',
    backgroundColor: '#444666',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
