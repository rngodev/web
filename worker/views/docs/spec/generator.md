# Generator

A **generator** defines an [effect's](/docs/spec/effect) inputs. Consider the following example:

```yaml
type: object
properties:
  email:
    type: function
    expression: username + '@' + domain
    variables:
      username:
        type: string
        pattern: .{2,64}
      domain:
        type: select
        options:
          - generator:
              type: constant
              value: example.com
          - generator:
              type: constant
              value: example.org
  age:
    type: number
    scale: 0
    minimum: 0
    maximum: 120
```

It will endlessly generate values that look like this:

```json
{ "email": "kjandfa@example.com", "age": 16 }
{ "email": "9jsm348vk@example.org", "age": 77 }
{ "email": "111//??@example.org", "age": 58 }
```

## Discriminator

The `type` field of a generator spec acts as the discriminator - i.e. it determines the other fields that you may (or must) specify in the spec.

In the above example, the top-level spec has type `object`, which requires a `properties` field, while its `age` property has type `number`, which accepts optional `minimum` and `maximum` fields.

## Composition

Generators compose in that some generator types expect other generators as inputs.

In the above example, we specify generators in the `variables` field of the `function` generator spec which is itself specified as part of the `properties` field of the top-level `object` generator spec.

See the left navigation for all available generators.

## Custom Generator Types

Ultimately, an [effect's](/docs/spec/effect) generator must be a composition of [primitive generator types](/docs/spec), but a spec may define custom generator types under the `generators` field that can be shared _across_ effects.

Here's how you'd define and use a custom `uuid` generator type:

```yaml
generators:
  uuid:
    generator:
      type: string
      pattern: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
effects:
  users.create:
    generator:
      type: object
      properties:
        id:
          type: uuid
        name:
          type: string
  posts.create:
    generator:
      type: object
      properties:
        id:
          type: uuid
        authorId:
          type: reference
          effect: users.create
```

This is effectively identical to the following spec, where the `uuid` generator has been inserted into the `id` properties:

```yaml
effects:
  users.create:
    generator:
      type: object
      properties:
        id:
          type: string
          pattern: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
        name:
          type: string
  posts.create:
    generator:
      type: object
      properties:
        id:
          type: string
          pattern: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
        authorId:
          type: reference
          effect: users.create
```

The only thing you need to define a custom generator type is a `generator` field, which defines the literal generator spec.

## Examples

### Incrementing ID

All natural numbers in order, starting with `1`.

```yaml
type: number
minimum: 1
scale: 0
step: 1
```

### Email

Random email addresses from a enumerated set of domains.

```yaml
type: function
expression: "local + '@' + domain"
variables:
  local:
    type: string
    pattern: "[a-z]{5,10}"
  domain:
    type: select
    options:
      - weight: 3
        generator: { type: constant, value: "gmail.com" }
      - weight: 2
        generator: { type: constant, value: "yahoo.com" }
      - weight: 2
        generator: { type: constant, value: "outlook.com" }
      - generator: { type: constant, value: "icloud.com" }
      - generator: { type: constant, value: "protonmail.com" }
```
