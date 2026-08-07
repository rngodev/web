# Channel

A **channel** models any interface to your system and can be either of the following:

- a **subject**: code that you own, that you'd like to test, e.g. your web app, API or CLI
- a **fixture**: a runtime dependency of your code, e.g. a database, cache or SaaS

## CLI

The CLI uses channels to apply effects against the correct interfaces. For example, consider the following simulation:

```yaml
channels:
  sqlite:
    format:
      type: sql
    target:
      type: stream
      command: sqlite3 db1.sqlite
effects:
  user.create:
    channel: sqlite
    metadata:
      table: users
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
          pattern: .{0,36}
```

Things to note:

1. We've defined a channel called `sqlite`, and we've assigned it to the `users` entity.
2. Our `sqlite` definition includes a `format` which means that effect data will be formatted as SQL before being sent to the `target`.
3. We've specified a `target` of type "stream", which expects a `command`. When you run the simulation via `rngo run`, the CLI will execute the command locally and pipe `users` data to stdin.

## Subject

A subject channel is code that you own that you'd like to test. It could be any of:

- web app
- mobile app
- API
- CLI
- MCP Server

## Fixture

A fixture channel is a runtime dependency of your code, and is probably owned by someone else. It could be any of:

- database
- file system
- object storage
- cache
- SaaS
