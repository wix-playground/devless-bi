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
        biDevModeEnabled: false
      }
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
          onPress={this._onPress}
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
          return (
            <View>
              {this._render()}
              <OverlayComponent
                {...props}
                pointerEvents={'none'}
                style={[props.style, {position: 'absolute', left: 0, bottom: 0, top: 0, right: 0}]} />
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