
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
    return this._event.source;
  }

  get params() {
    const result = (this._event.params || {}).map((param) => {
      const newParam = {};
      newParam[param.key] = param.value;
      return newParam;
    });
    return Object.assign({}, ...result);
  }

  isValid() {
    return this.src !== undefined && this.evid !== undefined && this.biId !== undefined;
  }
}

export default EventDTO;
