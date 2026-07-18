import {
  CodeBlock,
  DocsLayout,
  H1,
  H2,
  InlineCode,
  OptionalAttributeHeader,
  P,
} from "../../layout";

export default function String() {
  return (
    <DocsLayout section="Schema" active="string">
      <H1>string</H1>

      <P>Randomly generates a string value.</P>

      <H2>Attributes</H2>

      <OptionalAttributeHeader>regex</OptionalAttributeHeader>

      <P>
        The regular expression that generate strings must match. Defaults to{" "}
        <InlineCode>{`.{0,64}`}</InlineCode>
      </P>

      <H2>Examples</H2>

      <P>Less than 64 characters:</P>

      <CodeBlock>
        {`{
  "type": "string"
}`}
      </CodeBlock>

      <P>Between 5 and 10 characters:</P>

      <CodeBlock>
        {`{
  "type": "string",
  "regex": ".{5,10}",
}`}
      </CodeBlock>

      <P>UUID:</P>

      <CodeBlock>
        {`{
  "type": "string",
  "regex": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
