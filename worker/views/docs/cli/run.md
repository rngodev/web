# `rngo run`

Runs a simulation. By default, it:

1. builds a simulation spec based upon the `.rngo` directory
2. runs the simulation locally
3. routes the effects to the appropriate [systems](/docs/concepts/system)
4. stores all [effects](/docs/concepts/effect) and signals in the local run directory

## Building a Simulation

`rngo run` builds a simulation based upon the contents of the local `.rngo` directory.

The base of the simulation is the contents of `.rngo/config.yml`. If this file doesn't exist, the base will be an empty spec with a seed of 1.

From there, it will merge in each file under the `.rngo/effects` directory. For example, if there was a file at `.rngo/effects/user.create.yml` with the following value:

```yaml
schema:
  type: object
  properties:
    id:
      type: number
      minimum: 1
      scale: 0
      step: 1
    name:
      type: string
      pattern: .{2,64}
```

It will be inserted into the simulation like this:

```yaml
seed: 1
effects:
  user.create:
    schema:
      type: object
      properties:
        id:
          type: number
          minimum: 1
          scale: 0
          step: 1
        name:
          type: string
          pattern: .{2,64}
```

If the path already exists in `.rngo/config.yml`, the `.rngo/effects` file will be ignored. An analogous process happens for the files in the `.rngo/systems` and `.rngo/schemas` directories.

## Applying Effects

`rngo run` will run the simulation and routes the stream of events to the appropriate [system](/docs/concepts/system).

Consider the following excerpt from a simulation:

```yaml
systems:
  db1:
    format:
      type: sql
    import:
      command: sqlite3 db1.sqlite
effects:
  invoice.create:
    system: db1
    schema:
      type: object
      # ...
```

In this case, all events for the `invoice.create` effect will be piped into the `sqlite3 db1.sqlite` command.

You can specify a raw output for an effect, like this:

```yaml
effects:
  orders.create:
    format:
      type: json
    schema:
      type: object
      # ...
```

`rngo run` will route to a default system — in this case, it is effectively something like:

```yaml
output:
  type: json
import:
  command: cat > .rngo/runs/019f3fd6-8d2e-7101-9b68-b4b63cb2bb19/orders.jsonl
```

You can set the `--stdout` boolean flag, e.g.:

```
rngo run --stdout
```

This will skip system routing and write all event values to stdout.
