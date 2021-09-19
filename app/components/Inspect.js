import React from 'react';
import { Text, StyleSheet, View, Clipboard, TouchableOpacity, ScrollView } from 'react-native';

import CloseButton from './CloseButton.js';

import PropTypes from 'prop-types';

export default class Inspect extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    var method;

    if (this.props.selected === undefined) {
      this.props.run();
      return (<View></View>);
    }
    if (this.props.selected.method === "GET") {
       method = (<Text style={styles.header_GET}>{this.props.selected.method}</Text>);
    } else if (this.props.selected.method === "POST") {
       method = (<Text style={styles.header_POST}>{this.props.selected.method}</Text>);
    } else if (this.props.selected.method === "PUT") {
       method = (<Text style={styles.header_PUT}>{this.props.selected.method}</Text>);
    } else if (this.props.selected.method === "DELETE") {
       method = (<Text style={styles.header_DELETE}>{this.props.selected.method}</Text>);
    } else {
       method = (<Text style={styles.header_OTHER}>{this.props.selected.method}</Text>);
    }
    return (
      <View style={styles.modealContainer}>
        <View style={styles.inspector}>
          <ScrollView style={{marginTop: 40}}>
            <View style={styles.title}>
              {method}
            </View>
            <View style={styles.title}>
              <Text style={styles.header}>{this.props.selected.link}</Text>
            </View>
            <Text style={styles.para_norm}>
              {this.props.selected.ipAddress} / {this.props.selected.userAgent}
            </Text>
            <Text style={styles.para_norm}>
              {this.props.selected.date}
            </Text>
            <TouchableOpacity onPress={() => Clipboard.setString(this.props.selected.header[0].cookie)}>
              <Text style={styles.para}>
                {this.props.selected.header[0] ? this.props.selected.header[0].cookie: ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Clipboard.setString(this.props.selected.header[0].referer)}>
              <Text style={styles.para}>
                {this.props.selected.header[0] ? this.props.selected.header[0].referer: ""}
              </Text>
            </TouchableOpacity>
            <Text style={styles.para}>
              {this.props.selected.body !== undefined || this.props.selected.body.length == 0 ?
              this.props.selected.body : "The body is empty"}
            </Text>
          </ScrollView>
          <CloseButton run={this.props.run}/>
        </View>
      </View>
    );
  }
}

Inspect.propTypes = {
  run: PropTypes.function,
  selected: PropTypes.object
}

const styles = StyleSheet.create({
  inspector: {
    width: '85%',
    backgroundColor: '#222222',
    height: '95%',
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
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  para_norm: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  modealContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_OTHER: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'purple',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_GET: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_DELETE: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_PUT: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'cyan',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_POST: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'yellow',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  title: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
