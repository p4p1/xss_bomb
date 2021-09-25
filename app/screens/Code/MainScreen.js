import React from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';

import TextButton from '../../components/TextButton.js';

export default class MainScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }
  }

  componentDidMount() {
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.mainCont}>
          <TextButton text="Edit Code" run={() => {this.props.navigation.navigate('CodeEditor')}} />
          <TextButton text="Favorites" run={() => {this.props.navigation.navigate('CodeFavorites')}} />
          <TextButton text="User Submited Code" run={() => {this.props.navigation.navigate('CodeSubmited')}} />
          {/*<TextButton text="Burp Payload List" run={() => {this.props.navigation.navigate('CodeEditor')}} />*/}
        </View>
      </View>
    );
  }
}

MainScreen.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  logout: PropTypes.function,
  navigation: PropTypes.object
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 5,
  },
  save_clip:{
    flexDirection: 'row'
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    marginBottom: 15,
    textAlign: 'center',
  },
  para: {
    fontSize: 15,
    color: '#aaaaaa',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  helpButtonCont: {
    width: '100%',
    height: '10%',
    flexDirection: 'row-reverse'
  },
  icons: {
    color: "#fff",
    marginTop: 40,
    marginRight: 20,
  },
});
