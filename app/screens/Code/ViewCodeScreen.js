import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';

import SplashScreen from '../SplashScreen.js';
import TextButton from '../../components/TextButton.js';

export default class ViewCodeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }

    this.downloadCode = this.downloadCode.bind(this);
    this.favoriteCode = this.favoriteCode.bind(this);
  }

  async favoriteCode(code_data) {
    try {
      const value = await AsyncStorage.getItem('@xss_bomb:code');
      if (value !== null) {
        const new_value = JSON.parse(value);
        try {
          await AsyncStorage.setItem(
            '@xss_bomb:code',
            JSON.stringify([ ...new_value, code_data ])
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await AsyncStorage.setItem(
            '@xss_bomb:code',
            JSON.stringify([ code_data ])
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  downloadCode() {
    fetch(`${this.props.url}code/dl/${this.props.route.params["codeId"]}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
    }).then((response) => response.json()).then((json) => {
      alert("You have set this code as your own :)");
    }).catch((err) => {
      console.error(err);
    });
  }

  componentDidMount() {
    fetch(`${this.props.url}code/get_code/${this.props.route.params["codeId"]}`, {
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
    });
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
          <TextButton text="Set as my own!" run={() => {this.downloadCode()}} />
          <TextButton text="Save as a favorite!" run={() => {this.favoriteCode(this.state.data)}} />
        </View>
      </View>
    );
  }
}

ViewCodeScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  navigation: PropTypes.object,
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
    paddingTop: 50,
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
