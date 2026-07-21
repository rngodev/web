# Quick Start

Install the rngo CLI with Homebrew:

```
brew install rngodev/tap/cli
```

Make a file called `rngo.yml` with this configuration:

```yaml
seed: 1
effects:
  users.create:
    schema:
      type: object
      properties:
        id:
          type: number
          minimum: 1
          scale: 0
          step: 1
        name:
          type: function
          expression: givenName + ' ' + familyName
          variables:
            givenName:
              type: select
              options:
                - schema:
                    type: constant
                    value: Alice
                - schema:
                    type: constant
                    value: Bob
                - schema:
                    type: constant
                    value: Carl
            familyName:
              type: select
              options:
                - schema:
                    type: constant
                    value: Agarwal
                - schema:
                    type: constant
                    value: Bates
                - schema:
                    type: constant
                    value: Chester
  posts.create:
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
            - weight: 5
              schema:
                type: constant
                value: Lorem Ipsum
            - weight: 3
              schema:
                type: constant
                value: Dolor Sit Amet
            - weight: 2
              schema:
                type: constant
                value: Sed Mattis Eu Erat
        authorId:
          type: function
          expression: user.id
          variables:
            user:
              type: reference
              effect: users.create
```

Now run the simulation like this:

```
rngo run --spec rngo.yml --stdout
```

This will output data that looks something like this:

```json
{"key":"users.create","offset":683878,"value":{"id":1,"name":"Alice Agarwal"}}
{"key":"users.create","offset":729698,"value":{"id":2,"name":"Bob Bates"}}
{"key":"posts.create","offset":1036600,"value":{"id":1,"title":"Lorem Ipsum","authorId":1}}
```

---

## Next Step

Learn more about [simulations](/docs/concepts/simulation) and how to model your application's interfaces.
