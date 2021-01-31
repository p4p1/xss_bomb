import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Textarea from 'react-native-textarea';
import { javascript_code_small, php_code_small, php_bash } from '../components/code.js';

import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      language: 'none',
      code: `functiom some_js_code() {
  console.log(document.cookie);
}`,
    };

    this.changeCode = this.changeCode.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  changeCode(text) {
    this.setState({ code: text });
    fetch(`${this.props.url}/setstager`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.user,
        password: this.props.pass,
        source: text
      }),
    }).then((response) => response.json()).then((json) => {
      if (json.data == 'ko') {
        alert("Error: please check server credentials");
      }
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  onRefresh() {
    this.setState({refreshing: true});
    console.log(`${this.props.url}/stager`);
    fetch(`${this.props.url}/stager`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user-agent': 'xss_bomb_app'
      },
    }).then((response) => response.text()).then((body) => {
      this.setState({code: body});
      this.setState({refreshing: false});
    }).catch((err) => {
      console.error(err);
      this.setState({refreshing: false});
      alert("Error: please check url format");
    });
  }

  componentDidMount() {
    this.onRefresh();
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container} style={{width: '100%', height: '100%'}}
            refreshControl={<RefreshControl refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}/>}>
          <Picker selectedValue={this.state.language} style={styles.pick}
              onValueChange={(itemValue) => {
                this.setState({language: itemValue});
                if (itemValue == 'javascript') {
                  this.setState({code: javascript_code_small});
                } else if (itemValue == 'php') {
                  this.setState({code: php_code_small});
                } else if (itemValue == 'php_bash') {
                  this.setState({code: php_bash });
                } else {
                  this.setState({code: '' });
                }
            }} mode='dropdown'>
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Testing Javascript" value="javascript" />
            <Picker.Item label="Testing PHP" value="php" />
            <Picker.Item label="PHPbash" value="php_bash" />
          </Picker>
          <Textarea containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={this.changeCode}
            defaultValue={this.state.code}
            placeholder={this.state.code}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  url: PropTypes.string,
  user: PropTypes.string,
  pass: PropTypes.string
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
  textareaContainer: {
    height: '90%',
    width: '90%',
    padding: 5,
    backgroundColor: '#333333',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: '100%',
    fontSize: 14,
    color: '#fff',
  },
  pick: {
    color: '#fff',
    backgroundColor: '#333333',
    width: '90%',
    height: 50,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  }
});
