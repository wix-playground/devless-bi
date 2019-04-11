import _ from 'lodash';
import EventEmitterManager from './EventEmitterManager';

export default class EventsRegistry {
  static eventEmitter = new EventEmitterManager();

  static addListener = (globalID, callback) => {
    return EventsRegistry.eventEmitter.listenOn(globalID, callback);
  };

  static notifyListeners = (globalID, args) => {
    EventsRegistry.eventEmitter.emitEvent(globalID, args);
  };

  //---------

  static registerOnButtonPressed = (callback) => {
    return EventsRegistry.addListener('buttonPressedEvent', callback);
  };

  static notifyOnButtonPressed = (args) => {
    EventsRegistry.notifyListeners('buttonPressedEvent', args);
  };

  //---------

  static registerBiDevModeChanged = (callback) => {
    return EventsRegistry.addListener('biDevModeChanged', callback);
  };

  static notifyBiDevModeChanged = (args) => {
    EventsRegistry.notifyListeners('biDevModeChanged', args);
  };
}