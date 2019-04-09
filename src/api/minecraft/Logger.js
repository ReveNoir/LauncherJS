class Logger {

  constructor (prefix, style) {
    this._prefix = prefix
    this._style = style
  }

  log () {
    console.log.apply(null, [this._prefix, this._style, ...arguments])
  }

  warn () {
    console.warn.apply(null, [this._prefix, this._style, ...arguments])
  }

  error () {
    console.error.apply(null, [this._prefix, this._style, ...arguments])
  }

}

module.exports = (prefix, style) => new Logger(prefix, style)