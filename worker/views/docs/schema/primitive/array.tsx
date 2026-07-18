import {
  CodeBlock,
  DocsLayout,
  H1,
  H2,
  InlineCode,
  OptionalAttributeHeader,
  P,
  RequiredAttributeHeader,
} from "../../layout";

export default function Array() {
  return (
    <DocsLayout section="Schema" active="array">
      <H1>array</H1>

      <P>
        Generates an array of values from the specified <InlineCode>items</InlineCode> sub-schema.
      </P>

      <H2>Attributes</H2>

      <RequiredAttributeHeader>items</RequiredAttributeHeader>

      <P>A sub-schema used to generate each array item.</P>

      <OptionalAttributeHeader>minItems</OptionalAttributeHeader>

      <P>The minimum size of each generated array. Defaults to 0.</P>

      <OptionalAttributeHeader>maxItems</OptionalAttributeHeader>

      <P>
        The maximum size of each generated array. Defaults to
        <InlineCode>minItems</InlineCode> plus 16.
      </P>

      <H2>Examples</H2>

      <P>Default size attributes:</P>

      <CodeBlock>
        {`{
  "type": "json.array",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "number"
      }
    }
  }
}`}
      </CodeBlock>

      <P>Custom size attributes:</P>

      <CodeBlock>
        {`{
  "type": "array",
  "items": {
    "type": "number"
  },
  "minItems": 10,
  "maxItems": 90
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
