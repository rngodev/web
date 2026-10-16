# stream

Runs the specified `command` in a sub-shell prior to the start of a simulation, then pipes each input to the sub-shell's stdin.

Similar to [`exec`](/docs/spec/target/exec), the `command` can take advantage of shell features and reference environment variables in the local `.env`.

Any data received from stdout or stderr is recorded as an ambient [output](/docs/spec/channel#output), i.e. one that does not reference any input.

A stream target may also be used to implement a read-only channel - i.e. one that no input is routed to - since the channel records stdout and stderr regardless of effect input.

## Parameters

### `command` — required

The command to run in a sub-shell.

## Examples

Send SQL inputs to PostgreSQL:

```yaml
format:
  type: sql
target:
  type: stream
  command: psql -q $DATABASE_URL
```

Receive outputs from a log file, as a read-only channel:

```yaml
target:
  type: stream
  command: tail -F logs/app.log
```
