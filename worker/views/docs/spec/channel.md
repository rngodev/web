# Channel

**Channels** are proxies through which a simulation sends inputs and receives outputs
from the system-under-test. For example:

```yaml
channels:
  db:
    format:
      type: sql
    target:
      type: stream
      command: psql -q $DATABASE_URL
  api:
    format:
      type: template
      template: curl -sS -X {{method}} $API_BASE_URL{{path}}
    target:
      type: exec
  log:
    target:
      type: stream
      command: tail -F logs/app.log
```

## Output

A channel _may_ produce outputs, which could be either:

- **interactive**, or explicitly caused by one input, e.g. a response to an HTTP request
- **ambient**, or having ambiguous causality, e.g. an application log line

In either case, every output is added to the log and may be included in a [signal](/docs/spec/signal).

Interactive outputs always include an `input_id` foreign key to the input that caused it. Currently, these will only come from channels with `exec` targets.

Ambient outputs come from channels with `stream` targets. They may come from channels that take inputs, or from read-only channels.

## Parameters

### `target` — required

Defines how the channel sends input to and receives outputs from the system.

There are two supported types:

- [exec](/docs/spec/target/exec)
- [stream](/docs/spec/target/stream)

### `format` — optional

Defines how it will transform an input prior to sending it to the target. If no format is specified, the input's JSON-encoded data will be sent.

There are two supported type:

- [template](/docs/spec/format/template)
- [sql](/docs/spec/format/sql)

## Examples

### cURL

You can use cURL as an **exec** `target` for an API channel. This example uses a template
that expects the effect data to include `method` and `path` fields.

```yaml
format:
  type: template
  template: curl -sS -X {{data.method}} ${API_BASE_URL:-http://localhost:5173}{{data.path}}
target:
  type: exec
```

### PostgreSQL

Use a **stream** `target` and **sql** `format` to pipe SQL statements into `psql`'s stdin.

```yaml
format:
  type: sql
target:
  type: stream
  command: psql -q $DATABASE_URL
```

### Log File

Use a **stream** `target` to receive signals from a log file. This is an example of a read-only channel,
meaning no effects will be sent to it.

```yaml
target:
  type: stream
  command: tail -F logs/app.log
```
