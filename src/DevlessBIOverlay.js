import React, {PureComponent} from 'react';
import {Switch, StyleSheet, Text, View} from 'react-native';
import {EventsRegistry} from 'react-native-ui-lib';

export default class DevlessBIOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      biDevModeEnabled: false
    };
  }

  onBiDevModeChanged = (value) => {
    if (value) {
      this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(({biId}) => alert(`button pressed with biId "${biId}"`));
      this.buttonRenderWrapperListener = EventsRegistry.registerButtonRenderWrapper(View, ({biId}) => ({style: {backgroundColor: 'red'}}));
    } else {
      this.onbuttonPressedListener.remove();
      this.buttonRenderWrapperListener.remove();
    }
    EventsRegistry.notifyBiDevModeChanged(value);
    this.setState({biDevModeEnabled: value});
  };

  render() {
    return (
      <View row centerH margin-10 style={styles.banner}>
        <Text text70 centerV>Highlight BI elements  </Text>
        <Switch value={this.state.biDevModeEnabled} onValueChange={this.onBiDevModeChanged}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 38,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'white'
  },
});
