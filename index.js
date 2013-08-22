var superagent = require('superagent')
  , Batch = require('batch')

var DEFAULT_TRACKER_ENDPOINT = "https://trk.kissmetrics.com";

module.exports = KissmetricsClient;

function KissmetricsClient(options) {
  options = options || {};
  this.endpoint = options.endpoint || DEFAULT_TRACKER_ENDPOINT;
  this.key = options.key;
  this.autoTimestamp = options.autoTimestamp == null ? false : true;
}

KissmetricsClient.prototype.request = function(pathname, params, callback) {
  callback = callback || defaultCallback;
  var request = superagent.get(this.endpoint + pathname);
  request.query(params);
  request.query({ '_k': this.key });
  if (this.autoTimestamp) {
    request.query({
      '_d': 1,
      '_t': params._t || Date.now(),
    });
  }
  request.end(function (err, resp) {
    if (err) {
      callback(err);
    } else if (! resp.ok) {
      callback("kissmetrics http " + resp.status + " " + resp.text);
    } else {
      callback(null, resp);
    }
  });
}

KissmetricsClient.prototype.set = function(person, properties, callback) {
  properties._p = person;
  this.request('/s', properties, callback);
}

KissmetricsClient.prototype.alias = function(person, aliases, callback) {
  var self = this;
  aliases = Array.isArray(aliases) ? aliases : [aliases];

  var batch = new Batch();
  aliases.forEach(function(alias) {
    batch.push(function(callback) {
      var params = {
        '_p': person,
        '_n': alias,
      };
      self.request('/a', params, callback);
    });
  });
  batch.end(callback);
}

KissmetricsClient.prototype.event = function(person, event, properties, callback) {
  if (typeof properties === 'function') {
    callback = properties;
    properties = {};
  }
  properties = properties || {};

  properties._p = person;
  properties._n = event;

  this.request('/e', properties, callback);
}

function defaultCallback(err) {
  if (err) console.error("KISSmetrics error:", err.stack);
}
