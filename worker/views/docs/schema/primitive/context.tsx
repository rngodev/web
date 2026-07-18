import { CodeBlock, DocsLayout, H1, H2, P, RequiredAttributeHeader } from "../../layout";

export default function Context() {
  return (
    <DocsLayout section="Schema" active="context">
      <H1>context</H1>

      <P>Emits a value from the simulation's dynamic context</P>

      <H2>Keywords</H2>

      <RequiredAttributeHeader>path</RequiredAttributeHeader>

      <P>The path the desired value</P>

      <H2>Examples</H2>

      <P>Get the current in-simulation ISO 8601 date and time:</P>

      <CodeBlock>
        {`{
    "type": "context",
    "path": ["clock", "now"]
}`}
      </CodeBlock>

      <P>Get the event that triggered the current effect:</P>

      <CodeBlock>
        {`{
    "type": "context",
    "path": ["trigger", "event"]
}`}
      </CodeBlock>
    </DocsLayout>
  );
}
