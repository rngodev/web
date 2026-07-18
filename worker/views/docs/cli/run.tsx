import { A, CodeBlock, DocsLayout, H1, H2, InlineCode, P } from "../layout";

export default function Run() {
  return (
    <DocsLayout section="CLI" active="run">
      <H1>
        <code class="text-3xl font-medium tracking-tight">rngo run</code>
      </H1>

      <P>Runs a simulation. By default, it:</P>

      <ol class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-decimal list-outside ml-4 mb-4 space-y-1">
        <li>
          builds a simulation spec based upon the
          <InlineCode>.rngo</InlineCode> directory
        </li>
        <li>runs the simulation locally</li>
        <li>
          routes the effects to the appropriate <A href="/docs/concepts/system">systems</A>
        </li>
        <li>
          stores all <A href="/docs/concepts/effect">effects</A> and signals in the local run
          directory
        </li>
      </ol>

      <H2>Building a Simulation</H2>

      <P>
        <InlineCode>rngo run</InlineCode> builds a simulation based upon the contents of the local
        <InlineCode>.rngo</InlineCode> directory.
      </P>

      <P>
        The base of the simulation is the contents of <InlineCode>.rngo/config.yml</InlineCode>. If
        this file doesn't exist, the base will be an empty spec with a seed of 1.
      </P>

      <P>
        From there, it will merge in each file under the <InlineCode>.rngo/effects</InlineCode>{" "}
        directory. For example, if there was a file at
        <InlineCode>.rngo/effects/user.create.yml</InlineCode> with the following value:
      </P>

      <CodeBlock>
        {`schema:
  type: object
  properties:
    id:
      type: id.integer
    name:
      type: person.name`}
      </CodeBlock>

      <P>It will be inserted into the simulation like this:</P>

      <CodeBlock>
        {`seed: 1
entities:
  user.create:
    schema:
      type: object
      properties:
        id:
          type: id.integer
        name:
          type: person.name`}
      </CodeBlock>

      <P>
        If the path already exists in <InlineCode>.rngo/config.yml</InlineCode>, the{" "}
        <InlineCode>.rngo/effects</InlineCode> file will be ignored. An analogous process happens
        for the files in the
        <InlineCode>.rngo/systems</InlineCode> and <InlineCode>.rngo/schemas</InlineCode>{" "}
        directories.
      </P>

      <H2>Applying Effects</H2>

      <P>
        <InlineCode>rngo run</InlineCode> will run the simulation and routes the stream of events to
        the appropriate <A href="/docs/concepts/system">system</A>.
      </P>

      <P>Consider the following excerpt from a simulation:</P>

      <CodeBlock>
        {`systems:
  db1:
    format:
      type: sql
    import:
      command: sqlite3 db1.sqlite
effects:
  invoice.create:
    system: db1
    schema:
      type: object
      ...`}
      </CodeBlock>

      <P>
        In this case, all events for the <InlineCode>invoice.create</InlineCode> effect will be
        piped into the <InlineCode>sqlite3 db1.sqlite</InlineCode> command.
      </P>

      <P>You can specify a raw output for an effect, like this:</P>

      <CodeBlock>
        {`entities:
  orders.create:
    format:
      type: json
    schema:
      type: object
      ...`}
      </CodeBlock>

      <P>
        <InlineCode>rngo run</InlineCode> will route to a default system — in this case, it is
        effectively something like:
      </P>

      <CodeBlock>
        {`output:
  type: json
import:
  command: cat > .rngo/runs/019f3fd6-8d2e-7101-9b68-b4b63cb2bb19/orders.jsonl`}
      </CodeBlock>

      <P>
        You can set the <InlineCode>--stdout</InlineCode> boolean flag, e.g.:
      </P>

      <CodeBlock>rngo run --stdout</CodeBlock>

      <P>This will skip system routing and write all event values to stdout.</P>
    </DocsLayout>
  );
}
