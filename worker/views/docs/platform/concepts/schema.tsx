import { A, CodeBlock, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function Schema() {
  return (
    <DocsLayout section="Platform" active="Schema">
      <H1>Schema</H1>

      <P>
        A <b>schema</b> defines the structure and content of an{" "}
        <A href="/docs/simulation#effects">effect's</A> events. Consider the following schema spec:
      </P>

      <CodeBlock>
        {`type: object
properties:
  email:
    type: function
    expression: username + '@' + domain
    variables:
      username:
        type: string
        minLength: 2
        maxLength: 64
      domain:
        type: select
        options:
          - schema:
              type: constant
              value: example.com
          - schema:
              type: constant
              value: example.org
  age:
    type: number
    scale: 0
    minimum: 0
    maximum: 120`}
      </CodeBlock>

      <P>It will endlessly produce values that look like this:</P>

      <CodeBlock>
        {`{ "email": "kjandfa@example.com", "age": 16 }
{ "email": "9jsm348vk@example.org", "age": 77 }
{ "email": "111//??@example.org", "age": 58 }`}
      </CodeBlock>

      <H2>Discriminator</H2>

      <P>
        The <InlineCode>type</InlineCode> field of a schema spec acts as the discriminator - i.e. it
        determines the other fields that you may (or must) specify in the spec.
      </P>

      <P>
        In the above example, the top-level spec has type <InlineCode>object</InlineCode>, which
        requires a <InlineCode>properties</InlineCode> field, while its <InlineCode>age</InlineCode>{" "}
        property has type
        <InlineCode>number</InlineCode>, which accepts optional
        <InlineCode>minimum</InlineCode> and
        <InlineCode>maximum</InlineCode> fields.
      </P>

      <H2>Composition</H2>

      <P>Schemas compose in that some schemas types expect other schemas as inputs.</P>

      <P>
        In the above example, we specify schemas in the <InlineCode>variables</InlineCode> field of
        the <InlineCode>function</InlineCode> schema spec which is itself specified as part of the{" "}
        <InlineCode>properties</InlineCode> field of the top-level <InlineCode>object</InlineCode>{" "}
        schema spec.
      </P>

      <P>
        See the <A href="/docs/schema">schema reference</A> for all available schemas.
      </P>

      <H2>Custom Schema Types</H2>

      <P>
        Ultimately, an <A href="/docs/concepts/effect">effect's</A> schema must be a composition of{" "}
        <A href="/docs/schema">primitive schema types</A>, but a spec may define custom schema types
        under the <InlineCode>schemas</InlineCode> field that can be shared <i>across</i> effects.
      </P>

      <P>
        Here's how you'd define and use a custom <InlineCode>uuid</InlineCode> schema type:
      </P>

      <CodeBlock>
        {`schemas:
  uuid:
    schema:
      type: string
      format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
effects:
  users.create:
    schema:
      type: object
      properties:
        id:
          type: uuid
        name:
          type: string
  posts.create:
    schema:
      type: object
      properties:
        id:
          type: uuid
        authorId:
          type: reference
          effect: users.create`}
      </CodeBlock>

      <P>
        This is effectively identical to the following spec, where the <InlineCode>uuid</InlineCode>{" "}
        schema has been inserted into the <InlineCode>id</InlineCode> properties:
      </P>

      <CodeBlock>
        {`effects:
  users.create:
    schema:
      type: object
      properties:
        id:
          type: string
          format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
        name:
          type: string
  posts.create:
    schema:
      type: object
      properties:
        id:
          type: string
          format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
        authorId:
          type: reference
          effect: users.create`}
      </CodeBlock>

      <P>
        The only thing you need to define a custom schema type is a <InlineCode>schema</InlineCode>{" "}
        field, which defines the literal schema spec.
      </P>
    </DocsLayout>
  );
}
