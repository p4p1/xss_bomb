import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import Textarea from 'react-native-textarea';

import SaveButton from '../../components/SaveButton.js';
import ShareButton from '../../components/ShareButton.js';

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
      name: "",
      description: ""
    };

    this.changeCode = this.changeCode.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.save = this.save.bind(this);
    this.share = this.share.bind(this);
  }

  save() {
    fetch(`${this.props.url}user/set_code`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        code: this.state.code,
      }),
    }).then((response) => response.json()).then((body) => {
      alert(body.msg);
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  share() {
    fetch(`${this.props.url}code/share`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
      }),
    }).then((response) => response.json()).then((body) => {
      alert(body.msg);
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  changeCode(text) {
    this.setState({ code: text });
  }

  onRefresh() {
    this.setState({refreshing: true});
    fetch(`${this.props.url}user/get_code`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
    }).then((response) => response.json()).then((body) => {
      this.setState({code: body.code});
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
              onChangeText={this.changeCode}
              defaultValue={this.state.code}
              placeholder={this.state.code}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          <SaveButton run={() => {this.save()}} />
          <ShareButton run={() => {this.save()}} />
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string
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
