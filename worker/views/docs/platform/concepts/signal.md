# Signal

A **signal** is an output from a [system](/docs/concepts/system), which could be either:

- **interactive**, or explicitly caused by one [effect](/docs/concepts/effect), e.g. a response to an HTTP request
- **ambient**, or having ambiguous causality, e.g. an application log line

In either case, every signal is stored in the simulation log and may be the target of an [invariant](/docs/concepts/invariant).

Interactive signals always include an `effect_id` foreign key to the effect that caused it. Currently, this will only come from systems with `exec`-type imports.

Ambient signals come from systems with `stream`-type import. They may come from systems that take effects, e.g.:

```yaml
format:
  type: sql
import:
  type: stream
  command: psql -q $DATABASE_URL
```

Or from systems that do not expect effects (and therefore do not need a format) e.g.:

```yaml
import:
  type: stream
  command: tail -F logs/app.log
```

Both systems will produce ambient signals - i.e. without an effect FK - because they are asynchronous, so causality is generally ambiguous.
