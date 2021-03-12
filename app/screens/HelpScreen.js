import React from 'react';
import { Text, Linking, Button, StyleSheet, Image, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import SplashScreen from './SplashScreen';

const logo = '../assets/icon.png';
const githubURL = "https://github.com/p4p1/xss_bomb";
const wikiURL= "https://github.com/p4p1/xss_bomb/wiki";
const trelloURL= "https://github.com/p4p1/xss_bomb/projects";
const playURL = "https://play.google.com/store/apps/details?id=com.p4p1.xss_bomb";
const meURL = "https://leosmith.xyz";

const version = "V0.1.0";

export default class HelpScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      api_id: undefined,
      gh_version_name: undefined,
      newVerURL: undefined
    };

    this.openURL = this.openURL.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
  }

  async openURL(url) {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("This link is not supported by your device");
    }
  }

  getUpdate() {
    fetch("https://api.github.com/repos/p4p1/xss_bomb/releases/latest", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({gh_version_name: json.tag_name});
      this.setState({newVerURL: json.assets[0].browser_download_url});
    }).catch((err) => {
      console.error(err);
      alert("Error: Could not connect");
      this.props.logout();
    });
  }

  componentDidMount() {
    this.getUpdate();
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
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.center}>
            <Image style={styles.logo} source={require(logo)} />
            <Text style={styles.para}>
              Version: {version}
            </Text>
          </View>
          <Text style={styles.header}>What is XSS_BOMB?</Text>
          <Text style={styles.para}>
            XSS_BOMB is an app that follows the same vain as "xss hunter", it will
            notify you when your xss payload is ran on a target victim. The best use
            case is for blind xss research.
          </Text>
          <Text style={styles.header}>How do I use this app?</Text>
          <Text style={styles.para}>
            When you find a potential XSS vulnerability on a website you can add your
            unique xss_bomb link ({this.props.url}api/{this.state.api_id}) when the backend
            receives a request it will send you a notification and you will be able to
            inspect it on your mobile device.
          </Text>
          <Button title={"Open wiki"} onPress={() => this.openURL(wikiURL)}/>
          <View style={styles.padding}></View>
          <Text style={styles.header}>Who built this?</Text>
          <Text style={styles.para}>
            This app was built by me (p4p1) over on github and is provided for free
            there if you wish to support me this app will probably be on the store for
            $2 ish.
          </Text>
          <Button title={"About author"} onPress={() => this.openURL(meURL)}/>
          <View style={styles.padding}></View>
          <Button title={"Support me (Google Play)"} onPress={() =>
            this.openURL(playURL)} color={'#2CAA4C'}/>
          <View style={styles.padding}></View>
          <Text style={styles.header}>Is this open source?</Text>
          <Text style={styles.para}>
            Yes this app is open source and you can contribute over on github.
          </Text>
          <Button title={"View on github"} onPress={() => this.openURL(githubURL)}/>
          <View style={styles.padding}></View>
          <Text style={styles.header}>Can I host my own instance?</Text>
          <Text style={styles.para}>
            Yes you can host your own instance of this app and it's backend there
            is a tutorial on the official wiki of the app over on github.
          </Text>
          <Text style={styles.header}>Updates?</Text>
          <Text style={styles.para}>
            All of the updates are first pushed on github then the rest. If you wish
            to see how this app is evolving you can view the project page.
          </Text>
          { (this.state.gh_version_name !== version) ?
              <View>
                <Button title={"Update now you are using an older version"}
                  onPress={() => this.openURL(this.state.newVerURL)} color={'#ED1D5D'}/>
                <View style={styles.padding}></View>
              </View>
            :
              <View></View>
          }
          <Button title={"Open project logs"} onPress={() => this.openURL(trelloURL)}/>
          <View style={styles.padding}></View>
          <Text style={styles.header}>Bugs or an idea?</Text>
          <Text style={styles.para}>
            If you find a bug or you just have and idea for the app please open
            an issue on github so that I can fix it as soon as possible.
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
    borderRadius: 20,
    marginBottom: 5,
  },
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  padding: {
    marginBottom: 20,
  }
});
