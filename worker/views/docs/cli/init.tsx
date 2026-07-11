import { A, CodeBlock, DocsLayout, H1, InlineCode, P } from "../layout";

export default function Init() {
  return (
    <DocsLayout section="CLI" active="init">
      <H1>
        <code class="text-3xl font-medium tracking-tight">rngo init</code>
      </H1>

      <P>
        Initializes a simulation for a project by adding <InlineCode>.rngo/config.yml</InlineCode>{" "}
        and updating
        <InlineCode>.gitignore</InlineCode>, if it exists.
      </P>

      <P>
        It will set <InlineCode>key</InlineCode> in <InlineCode>.rngo/config.yml</InlineCode> to the
        name of the current directory, e.g.:
      </P>

      <CodeBlock>
        {`key: my-project
seed: 1
`}
      </CodeBlock>

      <P>
        See the <A href="/docs/concepts/simulation">simulation reference</A> for details on how to
        further customize.
      </P>
    </DocsLayout>
  );
}
