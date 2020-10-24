import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

export default class TextButton extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.opacity} onPress={this.props.run}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

TextButton.propTypes = {
  text: PropTypes.string,
  run: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  opacity: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    paddingLeft: 20,
    paddingRight: 5,
    color: "#24FF1F",
    fontSize: 20,
  },
});
