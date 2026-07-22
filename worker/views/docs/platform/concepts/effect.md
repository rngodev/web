# Effect

An **effect** models interactions with a system. For example, the following effect generates user creation events roughly once per hour:

```yaml
trigger: hz(1, hour)
system: db
format:
  table: USERS
schema:
  type: object
  properties:
    name:
      type: string
      pattern: .{10,50}
    age:
      type: number
      minimum: 18
      scale: 0
```

## Schema

An effect must specify a **schema**, which defines the structure and content of its events.

See the [Schema reference](/docs/schema) for more details.

## Trigger

An effect's **trigger** defines when it emits events. If not specified, an effect will emit roughly one event per day.

The value is in Hertz but is also an expression, so you can use the more readable `hz` function instead of `0.0833`:

```
hz(5, minute)
```

rngo builds in variance, so the observed rate over any sub-interval of the simulation may be higher or lower than the configured one.

You can also configure growth by referencing `offset`:

```
hz(3, hour) + (0.0001 * offset)
```

The expression is sampled periodically over the course of the simulation, so the observed frequency will change in steps.

Trigger frequency will always be adjusted to be greater than or equal to zero and less than 1000 Hz.

## System

All effects are bound to a **system**:

```yaml
systems:
  mydb:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  users.create:
    system: mydb
    schema: ...
```

If a `system` is not explicitly configured, the events will be written to the file system.

## Format

An effect's **format** extends the format of its system. For example, it's often used to set the table name in a SQL system:

```yaml
effects:
  create.article:
    system: mysql
    format:
      table: Article
    schema: ...
```

If the effect has an explicit `system`, its `format` will not override anything in the system format.

If no `system` is set, the full effect `format` will be used:

```yaml
effects:
  create.comment:
    format:
      type: sql
      table: user_comments
    schema: ...
```

If neither `system` nor `format` is configured, JSON will be used as the default format.
