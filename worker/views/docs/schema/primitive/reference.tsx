import { CodeBlock, DocsLayout, H1, H2, P, RequiredAttributeHeader } from "../../layout";

export default function Reference() {
  return (
    <DocsLayout section="Schema" active="reference">
      <H1>reference</H1>

      <P>Samples values previously emitted by an entity in the same simulation.</P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>entity</RequiredAttributeHeader>

      <P>The name of the entity to be sampled.</P>

      <H2>Examples</H2>

      <CodeBlock>
        {`{
  "type": "reference",
  "entity": "user"
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
