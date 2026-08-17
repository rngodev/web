This week I added support for custom schema types in [rngo 0.30.0](https://github.com/rngodev/rngo/releases/tag/0.30.0).

This means that you can define a new schema type in terms of rngo's [primitive schema types](/docs/schema) - or any of your other custom schema types.

Here's an example:

```yaml
schemas:
  uuid:
    schema:
      type: string
      format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
  uniqueEmail:
    schema:
      type: function
      expression: 'user-' + uniqueId + '@example.com'
      variables:
        uniqueId:
          schema: uuid
effects:
  user.create:
    schema:
      type: object
      properties:
        email:
          type: uniqueEmail
```

Notice how the effect's schema references the custom `uniqueEmail` schema type, which itself references the custom `uuid` type.

The above spec would effectively expand to:

```yaml
effects:
  user.create:
    schema:
      type: object
      properties:
        email:
          type: function
          expression: 'user-' + uniqueId + '@example.com'
          variables:
            uniqueId:
              type: string
              format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
```

So, in this initial iteration, you can basically define reusable aliases for common schema patterns. See the [custom schema type docs](/docs/concepts/schema#custom-schema-types) for details.

## Looking Forward

In later weeks, I'll add support for parameterized custom schema types along with a strategy for [rngo CLI](/docs/cli) to resolve schema references outside of the current project (e.g. on the internet).

For next week, though, I plan on making it easy for coding agents to bootstrap a project by writing system, effect and custom schema type specs.
