import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';

export default class Code extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data === undefined) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.run}>
          <View style={styles.title}>
            <Text style={styles.header}>{this.props.data.name}</Text>
          </View>
          <Text style={styles.date}>{this.props.data.description}</Text>
          <Text style={styles.para}>{this.props.data.code.substring(0, 200)}</Text>
          <Text style={styles.para}>Popularity: {this.props.data.downloads}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Code.propTypes = {
  data: PropTypes.object,
  run: PropTypes.function
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#333333',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
  },
  header: {
    width: '100%',
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
  title: {
    flexDirection: 'row',
  }
});