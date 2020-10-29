import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Image } from 'react-native';
import Textarea from 'react-native-textarea';

import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      code: `functiom some_js_code() {
  console.log(document.cookie);
}`,
    };

    this.changeCode = this.changeCode.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  changeCode(text) {
    this.setState({ code: text });
  }

  onRefresh() {
    this.setState({refreshing: true});
    console.log(`${this.props.url}/stager`);
    fetch(`${this.props.url}/stager`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
            <Textarea containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onChange}
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
    backgroundColor: '#444666',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: '100%',
    fontSize: 14,
    color: '#fff',
  },
});
