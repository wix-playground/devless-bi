import React, {Component} from 'react';
import {View} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import EventsRegistry from './EventsRegistry';
import ComponentRegistry from './ComponentRegistry';

function withBiEvents(WrappedComponent) {
  class EventsContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        biDevModeEnabled: false,
        screenshotMode: false
      }

      this.componentScreenshotModeListener = EventsRegistry.registerComponentScreenshotMode(({biId, enabled, doneCallback}) => {
        if (this.props.biId === biId) {
          this.setState({screenshotMode: enabled}, doneCallback);
        }
      });
    }

    componentDidMount() {
      this._notifyEvent('visible');
      this.listener = EventsRegistry.registerBiDevModeChanged((value) => {
        this.setState({biDevModeEnabled: value})
      })
    }

    componentWillUnmount() {
      if (this.listener) {
        this.listener.remove();
      }
      this.componentScreenshotModeListener.remove();
    }

    _onPress = () => {
      this._notifyEvent('onPress');

      if (!this.state.biDevModeEnabled) {
        const {onPress} = this.props;
        if (onPress) {
          onPress();
        }
      }
    };

    _render() {
      return (
        <WrappedComponent {...this.props}
          onPress={this.props.ignoreBi ? this.props.onPress : this._onPress}
          ref={(ref) => this.ref = ref} />
      );
    }

    _notifyEvent(trigger) {
      const {biId} = this.props;
      if (biId) {
        EventsRegistry.notifyComponentEvent({biId, trigger, componentRef: this.ref});
      }
    }

    render() {
      const {biId} = this.props;
      if (this.state.biDevModeEnabled && biId) {
        const {OverlayComponent, propsGenerator} = ComponentRegistry.getButtonRenderOverlay();
        if (OverlayComponent) {
          const props = propsGenerator({biId});
          const screenshotStyle = this.state.screenshotMode ? {backgroundColor: 'rgba(241, 290, 11, 0.5)'} : {};
          return (
            <View>
              {this._render()}
              <OverlayComponent
                {...props}
                pointerEvents={'none'}
                style={[props.style, {position: 'absolute', left: 2, bottom: 2, top: 2, right: 2}, screenshotStyle]} />
            </View>
          );
        }
      }
      return this._render();
    }
  }

  hoistNonReactStatic(EventsContainer, WrappedComponent);
  return EventsContainer;
}

export default withBiEvents;