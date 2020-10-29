import React from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';

import PropTypes from 'prop-types';

const loading_img = '../assets/loading.png';
const logo = '../assets/icon.png';

export default class SplashScreen extends React.Component
{
  constructor(props) {
    super(props);

    this.RotateValueHolder = new Animated.Value(0);

    this.StartImageRotateFunction = this.StartImageRotateFunction.bind(this);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction () {
    this.RotateValueHolder.setValue(0)
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction())
  }

  render () {
   const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require(logo)} />
        <Animated.Image style={{
          width: 50,
          height: 50,
          transform: [{rotate: RotateData}]
        }} source={require(loading_img)} />
      </View>
    );
  }
}

SplashScreen.propTypes = {
  text: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#444333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  }
});
