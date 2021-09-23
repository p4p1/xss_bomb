import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';

export default class ViewCodeScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }
  }

  componentDidMount() {
    console.log(this.props.token);
    fetch(`${this.props.url}code/dl/${this.props.route.params["codeId"]}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.props.token}`
      },
    }).then((response) => response.text()).then((json) => {
      console.log(json);
    }).catch((err) => {
      console.error(err);
    });
  }

  render () {
    if (this.state.data== undefined) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.mainCont}>
          <Text style={styles.header}>Hello</Text>
        </View>
      </View>
    );
  }
}

ViewCodeScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  navigation: PropTypes.object,
  route: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
  },
  mainCont: {
    width: '100%',
    height: '90%',
    paddingTop: 80,
    paddingBottom: 10,
    paddingRight: 10,
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
});
