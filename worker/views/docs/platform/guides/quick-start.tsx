import { A, CodeBlock, Divider, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function QuickStart() {
  return (
    <DocsLayout section="Platform" active="Quick Start">
      <H1>Quick Start</H1>

      <P>Install the rngo CLI with Homebrew:</P>

      <CodeBlock>brew install rngodev/tap/cli</CodeBlock>

      <P>
        Make a file called <InlineCode>rngo.yml</InlineCode> with this configuration:
      </P>

      <CodeBlock>
        {`seed: 1
effects:
  users.create:
    schema:
      type: object
      properties:
        id:
          type: number
          min: 1
          scale: 0
          step: 1
        name:
          type: function
          expression: givenName + ' ' + familyName
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
          givenName:
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
          min: 1
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
`}
      </CodeBlock>

      <P>Now run the simulation like this:</P>

      <CodeBlock>rngo run --spec rngo.yml --stdout</CodeBlock>

      <P>This will output data that looks something like this:</P>

      <CodeBlock>
        {`{"entity":"users","offset":683878,"value":{"id": 1, "name": "Alice Jones"}}
{"entity":"users","offset":729698,"value":{"id": 2, "name": "Bob Hyland"}}
{"entity":"posts","offset":1036600,"value":{"id": 1, "title": "Lorem Impsum"},"authorId":1}`}
      </CodeBlock>

      <Divider />

      <H2>Next Step</H2>

      <P>
        Learn more about <A href="/docs/concepts/simulation">simulations</A> and how to model your
        application's interfaces.
      </P>
    </DocsLayout>
  );
}
