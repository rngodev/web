This week in [rngo 0.39.0](https://github.com/rngodev/rngo/releases/tag/0.39.0), I broke a few things. My goal is to get rngo to a stable place, but first I want the naming and structure of the spec and CLI to be as intuitive as possible.

## `rngo run` is now `rngo eval`

I want to emphasize that the rngo [spec](/docs/spec) is a description of a system's behavior, and that the CLI's primary job is to evaluate whether that description holds for a given deployment.

The command flags are unchanged. See the [`rngo eval` reference](/docs/cli/eval) for more details.

## Schemas are now Generators

Originally, an [effect](/docs/spec/effect) described its inputs using [JSON Schema](https://json-schema.org), but I eventually realized that this just wasn't expressive enough for some (most?) systems.

I ended up adding new types that really weren't describing a schema, but were very useful in describing realistic inputs (e.g. [reference](/docs/spec/generator/reference), [function](/docs/spec/generator/function), [context](/docs/spec/generator/context), etc).

So, to avoid confusion, I renamed the concept to **generator**, which makes a lot more sense (although I still aim for specs to be a superset of JSON Schema).

Consequently, the `schema` parameter in an effect is now `generator` and custom generators are under the `generators` key - or in repositories, they move from `.rngo/schemas` to `.rngo/generators`

## Flat Channels

I've flattened channels to go from this:

```yaml
channels:
  db:
    format:
      type: sql
    target:
      type: stream
      command: psql -q $DATABASE_URL
```

to this:

```yaml
channels:
  db:
    type: stream
    command: psql -q $DATABASE_URL
    format:
      type: sql
```

This is because `format` is really specific to the `stream` and `exec` channel types. These happen to be the only two supported types currently, but I plan on adding other channel types (including support for custom types), for which `format` may not make sense.

## Agent Skill

[rngo agent 0.5.0](https://github.com/rngodev/agent/releases/tag/0.5.0) updates the `rngo` skill's references for the new docs structure and the changes above.

You can update your skills by running:

```bash
❯ rngo skills install
```
