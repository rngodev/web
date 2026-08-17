This week I replaced the original _systems_ concept in rngo with [channels](/docs/concepts/channel) in [rngo 0.33.0](https://github.com/rngodev/rngo/releases/tag/0.32.0).

A channel is an interface to the system-under-test through which rngo can push [effects](/docs/concepts/effect), pull [signals](/docs/concepts/signal) or do both.

For example, you might have the following in a project at `.rngo/channels/db.yml`:

```yaml
format:
  type: sql
target:
  type: stream
  command: sqlite3 db1.sqlite
```

A channel must specify a `target`, which defines how the channel sends raw input and receives raw output (analogous to `import` in a system).

In the above example, the target is of type **stream**, which means the CLI will start the specified `command` in a sub-shell prior to each simulation and send effects to stdin and receive signals from stdout and stderr.

A channel may also specify `format`, which defines how the channel will adapt an effect value prior to sending it to the `target`. Currently, the only supported type is **sql**.

If `format` is not specified, the JSON representation of the effect value will be sent to the `target`

## Effect

[Effects](/docs/concepts/effect) now reference a `channel`, naturally, and no longer have a `format` field, which has been replaced by `metadata`:

```yaml
widgets.update:
  trigger: hz(100, day)
  channel: db
  metadata:
    table: WIDGETS
  schema:
    type: object
    properties:
      id:
        type: number
        ...
```

`metadata` takes an arbitrary map, but its fields may be meaningful to the referenced channel. For example, in this case, the "db" channel will use `table` to format SQL statements.

## Read-Only Channels

Some channels are not intended to send input, but only receive output, e.g. a log file:

```yaml
target:
type: stream
command: tail -F logs/app.log
```

For these, there's of course no need to specify a `format`. The channel will just listen tostdout / stderr and output signals

## Looking Forward

Next week, my goal is to iterate on the [rngo agent skills](https://github.com/rngodev/agent) to streamline rngo spec definition both during project initialization and on an ongoing basis.

My goal is to for coding agents to be able to fully initialize rngo for a real-world project and run a simulation from a simple prompt.
