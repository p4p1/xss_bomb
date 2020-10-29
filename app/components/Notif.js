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
        <Text style={styles.header}>{this.props.data.route}</Text>
        <Text style={styles.para}>{this.props.data["user-agent"]}</Text>
        <Text style={styles.para}>{JSON.stringify(this.props.data.content)}</Text>
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
});