# Welcome!

rngo is a CLI that helps you understand what your code does by simulating usage and recording everything.

A rngo [simulation](/docs/concepts/simulation) models your code's interfaces in terms of [systems](/docs/concepts/system) and [effects](/docs/concepts/effect), using an intuitive specification language that your coding agent can write. For example:

```yaml
seed: 1
start: now - years(2)
systems:
  db:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  users.create:
    system: db
    format:
      table: USERS
    trigger: hz(100, day)
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
        email:
          type: function
          expression: "'user' + number + '@example.com'"
          variables:
            number:
              type: number
              minimum: 10000
              maximum: 99999
              scale: 0
  posts.create:
    system: db
    format:
      table: POSTS
    trigger: hz(120, hour)
    schema:
      type: object
      properties:
        id:
          type: number
          minimum: 1
          scale: 0
          step: 1
        title:
          type: select
          options:
            - schema:
                type: constant
                value: Lorem Ipsum
            - schema:
                type: constant
                value: Dolor Sit Amet
            - schema:
                type: constant
                value: Sed Mattis Eu Erat
        date:
          type: context
          path: ["clock", "now"]
        authorId:
          type: function
          expression: user.id
          variables:
            user:
              type: reference
              effect: users.create
```

You can run this simulation like this:

```
rngo run
```

The CLI will generate effects, apply them to the database and capture responses in the local filesystem.

---

## Next Step

Visit [Quick Start](/docs/guides/quick-start) for a step-by-step guide running your first simulation in just a few minutes.
