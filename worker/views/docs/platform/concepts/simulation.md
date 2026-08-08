# Simulation

A **simulation** is a collection of [channels](/docs/concepts/channel) and [effects](#effects). When run, a simulation emits an interleaved stream of events from each of its effects, over the configured period of time.

A simulation is specified using a **spec** (usually in YAML). For example:

```yaml
seed: 41
start: now - years(5)
channels:
  sqlite:
    format:
      type: sql
    target:
      command: sqlite3 db.sqlite
effects:
  user.create:
    channel: sqlite
    metadata:
      table: USER
    schema:
      type: object
      properties:
        id:
          type: myId
        name:
          type: string
          pattern: .{0,36}
schemas:
  myId:
    schema:
      type: number
      minimum: 1
      scale: 0
      step: 1
invariants:
  no-errors:
    type: sql
    query: >
      select count(*) from signals
      where level = 'error';
    expect: result == 0
```

You can run a spec using the [`rngo run`](/docs/cli/run) CLI command.

## Seed

`seed` is used to make the simulation's random number generator deterministic. It must be a positive integer, and defaults to `1`.

Changing `seed` lets you get a fresh set of data for an otherwise identical simulation.

## Channels

`channel` is a map of named channels, or system interfaces. Any channel referenced by an effect must be included in this map.

See [Channel](/docs/concepts/channel) for syntax details.

## Effects

`effects` is a map of named effects, or system interactions. It must contain at least one entry, but usually contains many.

See [Effect](/docs/concepts/effect) for syntax details.

## Schemas

`schemas` is a map of named custom schemas that can be reused across effects to produce similar data.

See [Schema](/docs/concepts/schema) for syntax details.

## Invariants

`invariants` is a map of named invariants that must hold in order for an audit to pass.

See [Invariant](/docs/concepts/invariant) for syntax details.
