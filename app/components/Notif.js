import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { /*faQuestion,*/ faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

export default class Notif extends React.Component
{
  constructor(props) {
    super(props);
    this.swipeData = [
      {
        text: <FontAwesomeIcon color={'white'} icon={faHeart} size={25} />,
        backgroundColor: 'green',
        onPress: () => { this.props.save(this.props.data) }
      },
      /*{ // TODO: add a more information feature to the notifications
        text: <FontAwesomeIcon color={'white'} icon={faQuestion} size={25} />,
        backgroundColor: 'blue',
        onPress: () => { this.props.delete(this.props.data._id) }
      },*/
      {
        text: <FontAwesomeIcon color={'white'} icon={faTrash} size={25} />,
        backgroundColor: 'red',
        onPress: () => { this.props.delete(this.props.data._id) }
      }
    ];
  }

  render() {
    return (
      <Swipeout style={styles.swiper} right={this.swipeData} autoClose='true'
          backgroundColor='transparent'>
        <View style={styles.container}>
          <Text style={styles.header}>{this.props.data.link}</Text>
          <Text style={styles.date}>{this.props.data.date}</Text>
          <Text style={styles.para}>{this.props.data.userAgent}</Text>
          <Text style={styles.para}>{this.props.data.ipAddress}</Text>
        </View>
      </Swipeout>
    );
  }
}

Notif.propTypes = {
  data: PropTypes.object,
  delete: PropTypes.function,
  save: PropTypes.function
}

const styles = StyleSheet.create({
  swiper: {
    marginBottom: 10,
    marginTop: 10,
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
});
