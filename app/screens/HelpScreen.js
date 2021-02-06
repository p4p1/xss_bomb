import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import SplashScreen from './SplashScreen';

const logo = '../assets/icon.png';

export default class HelpScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      api_id: undefined,
    };
  }

  componentDidMount() {
    fetch(`${this.props.url}user/get_api`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
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
        <ScrollView>
          <View style={styles.center}>
            <Image style={styles.logo} source={require(logo)} />
          </View>
          <Text style={styles.header}>What is XSS_BOMB?</Text>
          <Text style={styles.para}>
            XSS_BOMB is an app that follows the same vain as "xss hunter", it will
            notify you when your xss payload is ran on a target victim. The best use
            case is for blind xss research.
          </Text>
          <Text style={styles.header}>Who do I use this app?</Text>
          <Text style={styles.para}>
            When you find a potential XSS vulnerability on a website you can add your
            unique xss_bomb link ({this.props.url}{this.state.api_id}) when the backend
            receives a request it will send you a notification and you will be able to
            inspect it on your mobile device.
          </Text>
          <Text style={styles.header}>Who built this?</Text>
          <Text style={styles.para}>
            This app was built by me (p4p1) over on github and is provided for free
            there if you wish to support me this app will probably be on the store for
            2$ ish.
          </Text>
          <Text style={styles.header}>Is this open source?</Text>
          <Text style={styles.para}>
            Yes this app is open source and you can contribute over on github.
          </Text>
          <Text style={styles.header}>Can I host my own instance?</Text>
          <Text style={styles.para}>
            Yes you can host your own instance of this app and it's backend there
            is a tutorial on the official wiki of the app over on github.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

HelpScreen.propTypes = {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  para: {
    fontSize: 18,
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
    borderRadius: 20,
  },
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
