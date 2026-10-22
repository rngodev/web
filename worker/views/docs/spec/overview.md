# Spec

A **spec** is a JSON object that describes the behavior of a system by defining a _simulation_ and an _audit_.

The simulation models realistic usage of the system while the audit sets expectations for observed behavior.

Here's a contrived example:

```yaml
key: my-service
seed: 41
start: now - years(5)
end: now + minutes(3)
channels:
  sqlite:
    type: stream
    command: sqlite3 db.sqlite
    format:
      type: sql
effects:
  user.create:
    channel: sqlite
    metadata:
      table: USER
    generator:
      type: object
      properties:
        id:
          type: number
          minimum: 1
          scale: 0
          step: 1
        name:
          type: string
          pattern: .{0,36}
signals:
  no-errors:
    type: sql
    query: >
      select count(*) from metadata
      where level = 'error';
    expect: result == 0
```

The `signals` parameter configures the audit, while the other parameters configure the simulation.

The [`rngo eval`](/docs/cli/eval) CLI command evaluates whether a spec hold for a given deployment of a system by running the simulation against the system, logging all data and then auditing the log.

## Parameters

### `key` — required

A unique, meaningful identifier for the spec.

`rngo init` will set this to the name of the project's directory by default.

### `seed` — optional

Makes the simulation's random number generator deterministic.

Must be a positive integer, and defaults to `1`.

Changing `seed` lets you get a fresh set of data for an otherwise identical simulation.

### `start` — optional

When the simulation starts.

May be any time past or future, but must come before `end`. Defaults to `now - days(30)`.

May be expressed as either an [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) string, or a [time expression](/docs/reference/expressions#time).

### `end` — optional

When the simulation ends.

May be any time past or future, but must come after `start`. Defaults to `now`.

May be expressed as either an [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) string, or a [time expression](/docs/reference/expressions#time).

### `channels` — optional

How to send inputs to and receive outputs from the system during the simulation

Must be an object of named channels. See the [channel reference](/docs/spec/channel) for how to define one.

### `effects` — required

How to generate inputs during the simulation.

Must be an object of named effects. See the [effect reference](/docs/spec/effect) for how to define one.

### `signals` — optional

What patterns to look for in the log during the audit.

Must be an object of named signals. See the [signal reference](/docs/spec/signal) for how to define one.
