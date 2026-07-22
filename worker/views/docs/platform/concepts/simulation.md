# Simulation

A **simulation** is a collection of [systems](/docs/concepts/system) and [effects](#effects). When run, a simulation emits an interleaved stream of events from each of its effects, over the configured period of time.

A simulation is specified using a **spec** (usually in YAML). For example:

```yaml
seed: 41
start: now - years(5)
systems:
  sqlite:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  user.create:
    system: sqlite
    format:
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
```

You can run a spec using the [`rngo run`](/docs/cli/run) CLI command.

## Seed

`seed` is used to make the simulation's random number generator deterministic. It must be a positive integer, and defaults to `1`.

Changing `seed` lets you get a fresh set of data for an otherwise identical simulation.

## Systems

`systems` is a map of named systems, or stateful interfaces. Any system referenced by an effect must be included in this map.

See [System](/docs/concepts/system) for syntax details.

## Effects

`effects` is a map of named effects, or system interactions. It must contain at least one entry, but usually contains many.

See [Effect](/docs/concepts/effect) for syntax details.

## Schemas

`schemas` is a map of named custom schemas that can be reused across effects to produce similar data.

See [Schema](/docs/concepts/schema) for syntax details.
