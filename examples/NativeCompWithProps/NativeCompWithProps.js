import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class NativeCompWithProps extends Component {
  render() {
    return (
      <View>
        <Text>NativeCompWithProps</Text>
      </View>
    );
  }
}

NativeCompWithProps.propTypes = {};

export default NativeCompWithProps;
