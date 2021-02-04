import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';

export default class Notif extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.data.link}</Text>
        <Text style={styles.date}>{this.props.data.date}</Text>
        <Text style={styles.para}>{this.props.data.userAgent}</Text>
        <Text style={styles.para}>{this.props.data.ipAddress}</Text>
      </View>
    );
  }
}

Notif.propTypes = {
  data: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  para: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  date: {
    fontSize: 13,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 5,
  },
});
