import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PropTypes from 'prop-types';

import TextButton from '../components/TextButton.js';

export default class HomeScreen extends React.Component
{
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading</Text>
      </View>
    );
  }
}

TextButton.propTypes = {
  text: PropTypes.string
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
  header: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    width: '90%',
  },
});
