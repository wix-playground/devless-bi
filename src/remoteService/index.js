const EventDTO = require('../EventDTO').default;
import {NativeModules} from 'react-native';

class RemoteService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getEvents() {
    try {
      const response = await fetch(`${this.baseURL}/events`, {
        method: 'GET'
      });
      const json = await response.json();
      return json.items.map((item) => new EventDTO(item));
    } catch (e) {
      console.error(e);
    }
  }

  async updateComponent({biId, screenName, author}) {
    try {
      let componentBase64Capture = '';
      if (NativeModules.RNViewShot) {
        componentBase64Capture = await NativeModules.RNViewShot.captureScreen({
          format: "jpg",
          quality: 0.2,
          result: 'base64'
        });
      }

      const response = await fetch(`${this.baseURL}/component`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({biid: biId, screenName, author, image: componentBase64Capture})
      });

      if (!response.ok) {
        throw Error("Transport Error: Cannot update component. Status: " + response.status + "\nResponse: " + JSON.stringify(response));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default RemoteService;