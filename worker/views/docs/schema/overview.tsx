import { A, DocsLayout, H1, H2, P } from "../layout";

export default function SchemaOverview() {
  return (
    <DocsLayout section="Schema" active="Overview">
      <H1>Schema</H1>

      <P>
        A <b>schema</b> defines the structure and content of a stream of JSON values. Go to the{" "}
        <A href="/docs/concepts/schema">schema concept page</A> for an in-depth explanation.
      </P>

      <H2>Primitive</H2>

      <P>
        All effects schemas and custom schema types are ultimately defined with the following set of
        primitive schema types:
      </P>

      <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>
          <A href="/docs/schema/primitive/array">array</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/constant">constant</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/context">context</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/function">function</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/number">number</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/object">object</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/reference">reference</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/select">select</A>
        </li>
        <li>
          <A href="/docs/schema/primitive/string">string</A>
        </li>
      </ul>

      <H2>Custom</H2>

      <P>
        See <A href="/docs/concepts/schema#custom-schema-types">custom schema types</A> to learn how
        to make your own schema types
      </P>
    </DocsLayout>
  );
}
