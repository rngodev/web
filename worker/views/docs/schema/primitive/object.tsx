import {
  A,
  CodeBlock,
  DocsLayout,
  H1,
  H2,
  InlineCode,
  P,
  RequiredAttributeHeader,
} from "../../layout";

export default function Object() {
  return (
    <DocsLayout section="Schema" active="object">
      <H1>object</H1>

      <P>
        Randomly generates an object based upon the provided <InlineCode>properties</InlineCode>{" "}
        keyword.
      </P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>properties</RequiredAttributeHeader>

      <P>
        An object that maps object property names to <A href="/docs/concepts/schema">schema</A>{" "}
        definitions.
      </P>

      <H2>Examples</H2>

      <CodeBlock>
        {`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  }
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
