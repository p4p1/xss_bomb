import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { /*faQuestion,*/ faTrash } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

export default class FavNotif extends React.Component
{
  constructor(props) {
    super(props);
    this.swipeData = [
      /*{ // TODO: add a more information feature to the notifications
        text: <FontAwesomeIcon color={'white'} icon={faQuestion} size={25} />,
        backgroundColor: 'blue',
        onPress: () => { this.props.info(this.props.data._id) }
      },*/
      {
        text: <FontAwesomeIcon color={'white'} icon={faTrash} size={25} />,
        backgroundColor: 'red',
        onPress: () => { this.props.delete(this.props.data._id) }
      }
    ];
  }

  render() {
    var method;

    if (this.props.data.method === "GET") {
       method = (<Text style={styles.header_GET}>{this.props.data.method}</Text>);
    } else if (this.props.data.method === "POST") {
       method = (<Text style={styles.header_POST}>{this.props.data.method}</Text>);
    } else if (this.props.data.method === "PUT") {
       method = (<Text style={styles.header_PUT}>{this.props.data.method}</Text>);
    } else if (this.props.data.method === "DELETE") {
       method = (<Text style={styles.header_DELETE}>{this.props.data.method}</Text>);
    } else {
       method = (<Text style={styles.header_OTHER}>{this.props.data.method}</Text>);
    }
    return (
      <Swipeout style={styles.swiper} right={this.swipeData} autoClose='true'
          backgroundColor='transparent'>
        <View style={styles.container}>
          <View style={styles.title}>
            {method}
            <Text style={styles.header}>{this.props.data.link}</Text>
          </View>
          <Text style={styles.date}>{this.props.data.date}</Text>
          <Text style={styles.para}>{this.props.data.userAgent}</Text>
          <Text style={styles.para}>{this.props.data.ipAddress}</Text>
        </View>
      </Swipeout>
    );
  }
}

FavNotif.propTypes = {
  data: PropTypes.object,
  delete: PropTypes.function,
  info: PropTypes.function
}

const styles = StyleSheet.create({
  swiper: {
    marginBottom: 10,
    marginTop: 10,
  },
  header_OTHER: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'purple',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_GET: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_DELETE: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_PUT: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'cyan',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  header_POST: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'yellow',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
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
  title: {
    flexDirection: 'row',
  }
});
