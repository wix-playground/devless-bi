
class EventDTO {
  constructor(event) {
    this._event = event;
  }

  get biId() {
    return this._event.biId;
  }

  get evid() {
    return this._event.evid;
  }

  get params() {
    return JSON.parse(this._event.extraParams);
  }
}

export default EventDTO;
