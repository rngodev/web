import {
  CodeBlock,
  DocsLayout,
  H1,
  H2,
  InlineCode,
  P,
  RequiredAttributeHeader,
} from "../../layout";

export default function Select() {
  return (
    <DocsLayout section="Schema" active="select">
      <H1>select</H1>

      <P>
        Emits a value from exactly one of a set of sub-schemas, selected at random. By default, each
        sub-schema has an equal chance of being selected. However, weights can be assigned to each
        to adjust the probability of selection.
      </P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>options</RequiredAttributeHeader>

      <P>
        An array of objects that must include a <InlineCode>schema</InlineCode> field and an
        optional <InlineCode>weight</InlineCode> field.
      </P>

      <H2>Examples</H2>

      <P>Alternates between the string "one" and the number 2.</P>

      <CodeBlock>
        {`{
  "type": "select",
  "options": [
    {
      "stream": {
        "type": "constant",
        "value": "one"
      }
    },
    {
      "stream": {
        "type": "constant",
        "value": 2
      }
    }
  ]
}`}
      </CodeBlock>

      <P>
        Emits a positive integer 80% of the time, and <InlineCode>null</InlineCode> 20% of the time.
      </P>

      <CodeBlock>
        {`{
  "type": "core.select",
  "options": [
    {
      "weight": 4,
      "stream": {
        "type": "integer",
        "minimum": 0,
        "scale": 0
      }
    },
    {
      "weight": 1,
      "stream": {
        "type": "null"
      }
    }
  ]
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
