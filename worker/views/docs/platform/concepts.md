# Concepts

rngo checks a system's behavior by running a [spec](/docs/spec) in four steps:

1. a [simulation](#simulation) generates inputs from the spec's [effects](/docs/spec/effect)
2. a [proxy](#proxy) routes them to the system under test and collects what comes back
3. everything is recorded in the [log](#log)
4. an [audit](#audit) checks the log against the spec's [signals](/docs/spec/signal)

The [`rngo run`](/docs/cli/run) command performs all four and prints a summary of the simulation and the audit:

```bash
Simulation
time: 2026-08-13 13:14:12
db: 73104 effects, 0 signals
api: 11 effects, 11 signals

Audit
api-minimum-title-length: 0 (passed)
1 passed
```

## Simulation

A **simulation** is a run of a spec. It generates a stream of inputs from the spec's effects, delivers them to the system under test, and records everything that happens.

### Time

A simulation covers the period between the spec's `start` and `end`, which may be in the past, the future or both. Every input is stamped with a _logical_ timestamp within that period, and the log records it as a single millisecond integer.

By default, inputs are sent to the system under test immediately, regardless of their timestamps. Pass [`--realtime`](/docs/cli/run) to send each one as close as possible to its timestamp instead. Backdated inputs, whose timestamps have already elapsed, are unaffected by that flag.

### Determinism

A simulation's random number generator is seeded by the spec's `seed`, so running the same spec with the same seed generates the same inputs. Change the `seed` to get a fresh set of data for an otherwise identical simulation.

### Inputs, Outputs and Metadata

A simulation produces three kinds of data, all of which are recorded in the log:

- an [effect](/docs/spec/effect) produces **inputs**, which are sent to a channel
- a [channel](/docs/spec/channel) _may_ produce **outputs**, i.e. what the system under test sends back
- an effect may also produce **metadata**

## Proxy

A **proxy** sits between a simulation and the system under test. It routes each input from an effect to that effect's [channel](/docs/spec/channel), and records everything the channels send back.

A spec doesn't configure a proxy directly. rngo builds one from the spec's channels:

```yaml
channels:
  db:
    format:
      type: sql
    target:
      type: stream
      command: psql -q $DATABASE_URL
  log:
    target:
      type: stream
      command: tail -F logs/app.log
effects:
  users.create:
    channel: db
    schema: ...
```

In this case the proxy sends every input from `users.create` to the `db` channel, which [formats](/docs/spec/format/sql) it as SQL and delivers it to the [target](/docs/spec/target/stream). The `log` channel receives no inputs, but the proxy still records whatever its target writes to stdout.

### Routing

An input is routed by its effect's `channel`. If an effect doesn't specify one, the input isn't sent anywhere, but it is still recorded in the log.

### Outputs

The proxy adds every [output](/docs/spec/channel#output) to the log, either:

- **interactive**, with the ID of the input that caused it, or
- **ambient**, with no causal input

[`rngo run --stdout`](/docs/cli/run) skips channel routing and writes all inputs to stdout instead.

## Audit

An **audit** is a collection of signals evaluated against the log of a simulation. It's the step that turns a recorded run into a pass or a fail.

`rngo run` performs an audit after every simulation, using the signals defined in the spec. For example, given these signals:

```yaml
signals:
  no-errors:
    type: sql
    query: select count(*) from outputs where level = 'error';
    expect: result == 0
  some-inputs:
    type: sql
    query: select count(*) from inputs;
    expect: result > 0
  warnings:
    type: sql
    query: select count(*) from outputs where level = 'warn';
```

the CLI prints:

```bash
Audit
no-errors: 3096 (failed - expected 'result == 0')
some-inputs: 1556 (passed)
warnings: 16
1 passed
1 failed
```

### Results

Each signal is calculated as a `value`. A signal that has an `expect` also gets a `result`:

- **passed** if the expectation held
- **failed** if it didn't

A signal without an `expect`, like `warnings` above, is reported but is neither passed nor failed.

If any expectation fails, the CLI exits with code 1. That makes an audit usable in CI.

### Recording

The audit writes its results to the `signals` table in the run's `log.sqlite`, alongside the data it audited:

```
sqlite> select * from signals;
+-------------+-------+--------+-------+
|     key     | value | result | error |
+-------------+-------+--------+-------+
| no-errors   | 3096  | failed |       |
| some-inputs | 1556  | passed |       |
| warnings    | 16    |        |       |
+-------------+-------+--------+-------+
```

## Log

The **log**, or run log, is the complete record of a simulation. It's a [SQLite](https://sqlite.org) database that holds every input, output and piece of metadata the simulation produced, plus the results of the audit.

Each run gets its own directory, e.g. `.rngo/runs/01a005e6-1e8f-72b2-abfc-2da7a7a8dbdf/`, which contains the resolved `spec.yml` and `log.sqlite`. The most recent run is symlinked at `.rngo/runs/last`.

The log is the data source for [signals](/docs/spec/signal), which query it during the audit, and for [`reference`](/docs/spec/schema/reference) schemas, which sample values from earlier inputs.

See the [log reference](/docs/reference/log) for its location and table schemas.
