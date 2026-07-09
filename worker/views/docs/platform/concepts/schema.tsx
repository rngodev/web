import { A, CodeBlock, DocsLayout, H1, InlineCode, P } from "../../layout";

export default function Schema() {
  return (
    <DocsLayout section="Platform" active="Schema">
      <H1>Schema</H1>

      <P>
        A <b>schema</b> defines the structure and content of an{" "}
        <A href="/docs/simulation#effects">effect's</A> events. Consider the following schema
        definition:
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
    min: 0
    max: 120`}
      </CodeBlock>

      <P>It will endlessly produce values that look like this:</P>

      <CodeBlock>
        {`{ "email": "kjandfa@example.com", "age": 16 }
{ "email": "9jsm348vk@example.org", "age": 77 }
{ "email": "111//??@example.org", "age": 58 }`}
      </CodeBlock>

      <P>
        The first thing to note is that every schema definition must specify a{" "}
        <InlineCode>type</InlineCode> field, which acts as a discriminant — i.e., it determines the
        other fields that may be specified in the definition.
      </P>

      <P>
        In the above example, the top-level definition has type <InlineCode>object</InlineCode>,
        which requires a <InlineCode>properties</InlineCode> parameter, while the{" "}
        <InlineCode>age</InlineCode> property has type
        <InlineCode>number</InlineCode>, which accepts optional
        <InlineCode>min</InlineCode> and
        <InlineCode>max</InlineCode> parameters.
      </P>

      <P>
        The second thing to note is that schema types are composable — some "higher level" schema
        types accept other schema definitions as parameters.
      </P>

      <P>
        In the above example, we specify schemas in the <InlineCode>variables</InlineCode> parameter
        of the <InlineCode>function</InlineCode> schema definition which is itself specified as part
        of the <InlineCode>properties</InlineCode> parameter of the top-level{" "}
        <InlineCode>object</InlineCode> schema definition.
      </P>

      <P>
        See the <A href="/docs/schema">schema reference</A> for all available schemas.
      </P>
    </DocsLayout>
  );
}
