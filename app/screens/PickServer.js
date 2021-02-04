import React from 'react';
import { StyleSheet, ScrollView, Modal, Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import TextButton from '../components/TextButton.js';
import SplashScreen from './SplashScreen';

/*
 * This link should never change if you wish to add your own instance just edit
 * the file in the root of the project and issue a pull request
 */
const public_instances = "https://raw.githubusercontent.com/p4p1/xss_bomb/main/public_instances.json";

export default class PickServer extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      instances: [],
      link: "",
      modal: false
    }

    this.saveServer = this.saveServer.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setLink = this.setLink.bind(this);
  }

  setLink(value) {
    this.setState({link: value});
  }

  componentDidMount() {
    fetch(public_instances).then((response) => response.json()).then((json) => {
      this.setState({ instances: json });
    }).catch((err) => console.error(err));
  }

  showModal() {
    this.setState({ modal: !this.state.modal });
  }

  async saveServer(link) {
    this.setState({ modal: false });
    try {
      await AsyncStorage.setItem(
        '@xss_bomb:server',
        link
      );
      this.props.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  render () {
    if (this.state.instances == undefined || this.state.instances.length < 1) {
      return (<SplashScreen />);
    }
    console.log(this.state.instances);
    return (
      <View style={styles.container}>
        <Modal animationType={"slide"} transparent={true}
            visible={this.state.modal} onRequestClose={this.showModal}>
          <View style={styles.center}>
            <View style={styles.popup}>
              <TextInput value={this.state.link} style={styles.input_text} 
                placeholder="https://link_here" onChangeText={text => this.setLink(text)}/>
              <TextButton text="Save link" run={() => {this.saveServer(this.state.link)}} />
            </View>
          </View>
        </Modal>
        <View style={styles.server_picker}>
          <View style={styles.header}>
            <Text style={styles.white_text}>Choose a server</Text>
          </View>
          <ScrollView>
            {this.state.instances.map((data, key) => {
              return (
                <TouchableOpacity key={key} style={styles.server_btn}
                    onPress={() => this.saveServer(data.link)}>
                  <Text style={styles.btn_text} key={key}>{data.link}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.server_btn} onPress={this.showModal}>
              <Text style={styles.btn_text}>+++ Custom Server +++</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

PickServer.propTypes = {
  refresh: PropTypes.function
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
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  server_picker: {
    width: '90%',
    height: '60%',
    borderRadius: 20,
    backgroundColor: '#222000',
  },
  popup: {
    width: '80%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#555000',
  },
  header: {
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '100%',
    height: '15%',
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
  white_text: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  btn_text: {
    textAlign: 'center',
    width: '95%',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'monospace',
  },
  server_btn: {
    width: '100%',
    marginBottom: 20,
  }
});
