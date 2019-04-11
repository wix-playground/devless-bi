const EventDTO = require('../EventDTO').default;

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
    } catch(e) {
      console.error(e);
    }
  }
}

export default RemoteService;