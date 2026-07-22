# System

A **system** models any stateful interface in your environment and can be either of the following:

- a **subject**: code that you own, that you'd like to test, e.g. your web app, API or CLI
- a **fixture**: a runtime dependency of your code, e.g. a database, cache or SaaS

## CLI

The CLI uses systems to apply effects against the correct interfaces. For example, consider the following simulation:

```yaml
systems:
  sqlite:
    format:
      type: sql
    import:
      command: sqlite3 db1.sqlite
effects:
  user.create:
    system: sqlite
    format:
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

1. We've defined a system called `sqlite`, and we've assigned it to the `users` entity.
2. Our `sqlite` definition includes a `format` which tells the API that the `users` entity data should be formatted as SQL.
3. We've specified `import.command`. When you run the simulation via `rngo run`, the CLI will execute the command locally and pipe `users` data to stdin.

## Subject

A subject system is usually code that you own that you'd like to test. It could be any of:

- web app
- mobile app
- API
- CLI
- MCP Server

## Fixture

A fixture system is a runtime dependency of your code, and is probably owned by someone else. It could be any of:

- database
- file system
- object storage
- cache
- SaaS
