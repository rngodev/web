import {
  A,
  CodeBlock,
  DocsLayout,
  H1,
  H2,
  InlineCode,
  OptionalAttributeHeader,
  P,
  RequiredAttributeHeader,
} from "../../layout";

export default function Function() {
  return (
    <DocsLayout section="Schema" active="function">
      <H1>function</H1>

      <P>
        Evaluates a{" "}
        <A href="https://github.com/google/cel-spec">Common Expression Language (CEL)</A> expression
        and emits the result. The expression may reference named sub-schemas specified in the{" "}
        <InlineCode>variables</InlineCode> property.
      </P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>expression</RequiredAttributeHeader>

      <P>
        The <A href="https://github.com/google/cel-spec">CEL</A> expression.
      </P>

      <OptionalAttributeHeader>variables</OptionalAttributeHeader>

      <P>
        An object of named <A href="/docs/concepts/schema">schema</A> definitions that may be
        referenced in <InlineCode>expression</InlineCode>.
      </P>

      <H2>Examples</H2>

      <CodeBlock>
        {`{
  "type": "function",
  "expression": "username + '@' + domain",
  "variables": {
    "username":{
      "type": "string",
      "minLength": 2,
      "maxLength": 64
    },
    "domain": {
      "type": "select",
      "options": [
        {
          "weight": 5,
          "schema": {
            "type": "constant",
            "value": "example.com"
          }
        },
        {
          "weight": 2,
          "schema": {
            "type": "constant",
            "value": "example.org"
          }
        }
      ]
    }
  }
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
