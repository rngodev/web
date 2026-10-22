# Channel

**Channels** are proxies through which a simulation sends inputs and receives outputs
from the system-under-test. For example:

```yaml
channels:
  db:
    type: stream
    command: psql -q $DATABASE_URL
    format:
      type: sql
  api:
    type: exec
    format:
      type: template
      template: curl -sS -X {{method}} $API_BASE_URL{{path}}
  log:
    type: stream
    command: tail -F logs/app.log
```

## Output

A channel _may_ produce outputs, which could be either:

- **interactive**, or explicitly caused by one input, e.g. a response to an HTTP request
- **ambient**, or having ambiguous causality, e.g. an application log line

In either case, every output is added to the log and may be included in a [signal](/docs/spec/signal).

Interactive outputs always include an `input_id` foreign key to the input that caused it. Currently, these will only come from `exec` channels.

Ambient outputs come from `stream` channels. They may come from channels that take inputs, or from read-only channels.

## Parameters

### `type` — required

Defines how the channel sends input to and receives outputs from the system.

There are two supported types:

- [exec](/docs/spec/channel/exec)
- [stream](/docs/spec/channel/stream)

### `format` — optional

Defines how it will transform an input prior to sending it to the system. If no format is specified, the input's JSON-encoded data will be sent.

There are two supported type:

- [template](/docs/spec/format/template)
- [sql](/docs/spec/format/sql)

## Examples

### cURL

You can use cURL as an **exec** channel for an API channel. This example uses a template
that expects the effect data to include `method` and `path` fields.

```yaml
type: exec
format:
  type: template
  template: curl -sS -X {{data.method}} ${API_BASE_URL:-http://localhost:5173}{{data.path}}
```

### PostgreSQL

Use a **stream** channel with a **sql** `format` to pipe SQL statements into `psql`'s stdin.

```yaml
type: stream
command: psql -q $DATABASE_URL
format:
  type: sql
```

### Log File

Use a **stream** channel to receive signals from a log file. This is an example of a read-only channel,
meaning no effects will be sent to it.

```yaml
type: stream
command: tail -F logs/app.log
```
