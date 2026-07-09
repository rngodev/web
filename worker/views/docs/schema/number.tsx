import { CodeBlock, DocsLayout, H1, H2, InlineCode, OptionalAttributeHeader, P } from "../layout";

export default function Number() {
  return (
    <DocsLayout section="Schema" active="number">
      <H1>number</H1>

      <P>Randomly generates decimal or integer values.</P>

      <H2>Attributes</H2>

      <OptionalAttributeHeader>min</OptionalAttributeHeader>

      <P>
        The minimum value (inclusive) to be generated. The default value is -1.7976931348623157×10
        <sup>308</sup>.
      </P>

      <OptionalAttributeHeader>max</OptionalAttributeHeader>

      <P>
        The maximum value (inclusive) to be generated. The default value is 1.7976931348623157×10
        <sup>308</sup>.
      </P>

      <OptionalAttributeHeader>scale</OptionalAttributeHeader>

      <P>
        The maximum number of digits that may be included after the decimal point. Set to zero to
        generate integers.
      </P>

      <OptionalAttributeHeader>step</OptionalAttributeHeader>

      <P>
        The size of the step between successive emitted values. If positive, the first value will be{" "}
        <InlineCode>min</InlineCode>. If negative, the first value will be{" "}
        <InlineCode>max</InlineCode>.
      </P>

      <H2>Examples</H2>

      <P>Unbounded:</P>

      <CodeBlock>
        {`{
  "type": "number"
}`}
      </CodeBlock>

      <P>Bounded:</P>

      <CodeBlock>
        {`{
  "type": "number",
  "minimum": -3.14,
  "maximum": 2.71
}`}
      </CodeBlock>

      <P>Integer:</P>

      <CodeBlock>
        {`{
  "type": "number",
  "minimum": 0,
  "maximum": 10000,
  "scale": 0
}`}
      </CodeBlock>

      <P>Incrementing ID:</P>

      <CodeBlock>
        {`{
  "type": "number",
  "minimum": 1,
  "scale": 0,
  "step": 1
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
