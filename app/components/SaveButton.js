import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

export default class SaveButton extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.opacity} onPress={this.props.run}>
            <FontAwesomeIcon color={'white'} icon={faSave} size={25} />
          </TouchableOpacity>
        </View>
    );
  }
}

SaveButton.propTypes = {
  run: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
    position: 'absolute',
    top: 30,
    right: 10
  },
  opacity: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
