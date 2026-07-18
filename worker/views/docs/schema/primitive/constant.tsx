import { CodeBlock, DocsLayout, H1, H2, P, RequiredAttributeHeader } from "../../layout";

export default function Constant() {
  return (
    <DocsLayout section="Schema" active="constant">
      <H1>constant</H1>

      <P>Endlessly emits the specified literal value.</P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>value</RequiredAttributeHeader>

      <P>The JSON value to be emitted.</P>

      <H2>Examples</H2>

      <P>String:</P>

      <CodeBlock>
        {`{
  "type": "constant",
  "value": "Avagadro"
}`}
      </CodeBlock>

      <P>Object:</P>

      <CodeBlock>
        {`{
  "type": "constant",
  "value": {
    "name": "Évariste Galois",
    "age": 20
  }
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
