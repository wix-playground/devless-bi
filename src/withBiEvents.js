import React, {Component} from 'react';
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
      if (this.state.biDevModeEnabled) {
        const {biId} = this.props;
        EventsRegistry.notifyOnButtonPressed({biId});
      } else {
        const {onPress} = this.props;
        if(onPress) {
          onPress();
        }
      }
    };

    _render() {
      return (
        <WrappedComponent {...this.props} onPress={this._onPress}/>
      );
    }

    render() {
      const {biId} = this.props;
      if (this.state.biDevModeEnabled && biId) {
        const {WrapperComponent, propsGenerator} = ComponentRegistry.getButtonRenderWrapper();
        if (WrapperComponent) {
          const props = propsGenerator({biId});
          return (
            <WrapperComponent {...props}>
              {this._render()}
            </WrapperComponent>
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