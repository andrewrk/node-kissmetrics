# kissmetrics-client

[![NPM version](https://badge.fury.io/js/kissmetrics-client.png)](http://badge.fury.io/js/kissmetrics-client)

KISSmetrics client for node.js

## Usage

```js
// create a new KM Client instance:
var Kissmetrics = require('kissmetrics-client');
var kmClient = new Kissmetrics({ key: KM_KEY });

// record an event
kmClient.event('blah@example.com', 'signed up');
```

## Why the Fork?

 * simpler less error-prone code
 * ability to not console.log on error
 * this module has tests
 * documentation moved to readme for better accessibility
 * default kissmetrics endpoint uses SSL
 * pull request was [denied](https://github.com/glesperance/node-kissmetrics/pull/3)

## Documentation

KISSmetrics REST client constructor.

```JavaScript
KissmetricsClient(options)
```

+ **options**
	*Object*
		The options object defining the REST client to instantiate. Its possible parameters are :

	+ **key** *String* your KISSmetrics API key.
	+ **endpoint** *String* (optional) The tracker endpoint to which the client connects to. Defaults to 'https://trk.kissmetrics.com'

---

Sets properties on a person without recording an event by making a request.

```JavaScript
client.set(person, properties, [callback])
```

+ **person** *String* The identity of the person.

This is limited to 255 chars and all commas (,), and colons (:) will
automatically be changed to spaces (KISSmetrics will convert foo:bar,baz to
foo bar baz).

+ **properties** *Object* An object containing the properties to be set on
`person`.

+ **callback** *Function* (optional) A function of the form `function(err)`.
The default callback logs erroneous requests to stderr.

---

Aliases the user identified by `person` with `aliases`.

```JavaScript
client.alias(person, aliases, [callback])
```

+ **person** *String* The identity of the person.

This is limited to 255 chars and all commas (,), and colons (:) will
automatically be changed to spaces (KISSmetrics will convert foo:bar,baz to
foo bar baz).

+ **alias** | **aliases** *String* | *Array* The alias to apply to the person.

This is limited to 255 chars and all commas (,), and colons (:) will
automatically be changed to spaces (KISSmetrics will convert foo:bar,baz to
foo bar baz).

Can either be a *String* or an array of *String* if multiple alias are supplied.

+ **callback** *Function* (optional) A function of the form `function(err)`.
The default callback logs erroneous requests to stderr.

---

Records `event` for `person. Also sets `properties` on the person if
specified.

```JavaScript
client.event(person, event, properties, [callback])
```

+ **person** *String* The identity of the person.

This is limited to 255 chars and all commas (,), and colons (:) will
automatically be changed to spaces (KISSmetrics will convert foo:bar,baz to
foo bar baz).

+ **event** *String* The name of the event you want to record.

This is limited to 255 chars and all commas (,), and colons (:) will
automatically be changed to spaces (KISSmetrics will convert foo:bar,baz to
foo bar baz).

+ **properties** *Object* (optional) An object containing the properties to
be set on `person`.

+ **callback** *Function* (optional) A function of the form `function(err)`.
The default callback logs erroneous requests to stderr.

---

Performs the given request on the KISSmetrics tracker host.

```JavaScript
client.request(pathname, params, [callback])
```

+ **pathname** *String* The path section of the URL, that comes after the
host and before the query, including the initial slash if present.

+ **params** *Object*

+ **callback** *Function* (optional) A function of the form `function(err)`.
The default callback logs erroneous requests to stderr.
