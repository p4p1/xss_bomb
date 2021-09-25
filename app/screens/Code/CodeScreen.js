import React from 'react';
import { ScrollView, Modal, RefreshControl, TextInput, StyleSheet, View } from 'react-native';
import Textarea from 'react-native-textarea';

import SaveButton from '../../components/SaveButton.js';
import ShareButton from '../../components/ShareButton.js';
import TextButton from '../../components/TextButton.js';

import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      modal: false,
      code: `functiom some_js_code() {
  console.log(document.cookie);
}`,
      name: "",
      description: ""
    };

    this.showModal = this.showModal.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.setName = this.setName.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.save = this.save.bind(this);
    this.share = this.share.bind(this);
  }

  setName(value) {
    this.setState({name: value});
  }

  setDescription(value) {
    this.setState({description: value});
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
      this.showModal();
    }).catch((err) => {
      console.error(err);
      alert("Error: please check url format");
    });
  }

  changeCode(text) {
    this.setState({ code: text });
  }

  showModal() {
    this.setState({ modal: !this.state.modal });
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
        <Modal animationType={"slide"} transparent={true}
            visible={this.state.modal} onRequestClose={this.showModal}>
          <View style={styles.center}>
            <View style={styles.popup}>
              <TextInput value={this.state.name} style={styles.input_text}
                placeholder="name" onChangeText={text => this.setName(text)}/>
              <TextInput value={this.state.description} style={styles.input_text}
                placeholder="description" onChangeText={text => this.setDescription(text)}/>
              <TextButton text="share" run={() => {this.share()}} />
            </View>
          </View>
        </Modal>
        <ScrollView contentContainerStyle={styles.container} style={{width: '100%', height: '100%', marginTop: 30}}
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
          <ShareButton run={() => {this.showModal()}} />
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
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: '80%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#555555',
  },
  input_text: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '90%',
  },
});
