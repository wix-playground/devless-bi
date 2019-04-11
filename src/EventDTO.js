
class EventDTO {
  constructor(event) {
    this._event = event;
  }

  get biId() {
    return this._event.biid;
  }

  get evid() {
    return this._event.evid;
  }

  get src() {
    return this._event.src;
  }

  get params() {
    return JSON.parse(this._event.extraParams);
  }

  isValid() {
    return this.src !== undefined && this.evid !== undefined && this.biId !== undefined;
  }
}

export default EventDTO;
