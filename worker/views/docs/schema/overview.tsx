import { A, DocsLayout, H1, H2, P } from "../layout";

export default function SchemaOverview() {
  return (
    <DocsLayout section="Schema" active="Overview">
      <H1>Schema</H1>

      <P>
        A <b>schema</b> defines the structure and content of a stream of JSON values. Go to the{" "}
        <A href="/docs/concepts/schema">schema concept page</A> for an in-depth explanation.
      </P>

      <P>
        This reference contains every schema that rngo provides out-of-the-box. You can use them in
        your simulation as-is, or combine them to create custom schemas.
      </P>

      <H2>Primitive</H2>

      <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>
          <A href="/docs/schema/array">array</A>
        </li>
        <li>
          <A href="/docs/schema/constant">constant</A>
        </li>
        <li>
          <A href="/docs/schema/context">context</A>
        </li>
        <li>
          <A href="/docs/schema/function">function</A>
        </li>
        <li>
          <A href="/docs/schema/number">number</A>
        </li>
        <li>
          <A href="/docs/schema/object">object</A>
        </li>
        <li>
          <A href="/docs/schema/reference">reference</A>
        </li>
        <li>
          <A href="/docs/schema/select">select</A>
        </li>
        <li>
          <A href="/docs/schema/string">string</A>
        </li>
      </ul>
    </DocsLayout>
  );
}
