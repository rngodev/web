import { CodeBlock, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function System() {
  return (
    <DocsLayout section="Platform" active="System">
      <H1>System</H1>

      <P>
        A <b>system</b> models any stateful interface in your environment and can be either of the
        following:
      </P>

      <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>
          a <b>subject</b>: code that you own, that you'd like to test, e.g. your web app, API or
          CLI
        </li>
        <li>
          a <b>fixture</b>: a runtime dependency of your code, e.g. a database, cache or SaaS
        </li>
      </ul>

      <H2>CLI</H2>

      <P>
        The CLI uses systems to apply effects against the correct interfaces. For example, consider
        the following simulation:
      </P>

      <CodeBlock>
        {`systems:
  sqlite:
    format:
      type: sql
    import:
      command: sqlite3 db1.sqlite
effects:
  user.create:
    system: sqlite
    format:
      table: users
    schema:
      type: object
      properties:
        id:
          type: number
          min: 1
          scale: 0
          step: 1
        name:
          type: string
          maxLength: 36`}
      </CodeBlock>

      <P>Things to note:</P>

      <ol class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>
          We've defined a system called <InlineCode>sqlite</InlineCode>, and we've assigned it to
          the <InlineCode>users</InlineCode> entity.
        </li>
        <li>
          Our <InlineCode>sqlite</InlineCode> definition includes a <InlineCode>format</InlineCode>{" "}
          which tells the API that the <InlineCode>users</InlineCode> entity data should be
          formatted as SQL.
        </li>
        <li>
          We've specified <InlineCode>import.command</InlineCode>. When you run the simulation via{" "}
          <InlineCode>rngo run</InlineCode>, the CLI will execute the command locally and pipe{" "}
          <InlineCode>users</InlineCode> data to stdin.
        </li>
      </ol>

      <H2>Subject</H2>

      <P>
        A subject system is usually code that you own that you'd like to test. It could be any of:
      </P>

      <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>web app</li>
        <li>mobile app</li>
        <li>API</li>
        <li>CLI</li>
        <li>MCP Server</li>
      </ul>

      <H2>Fixture</H2>

      <P>
        A fixture system is a runtime dependency of your code, and is probably owned by somone else.
        It could be any of:
      </P>

      <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
        <li>database</li>
        <li>file system</li>
        <li>object storage</li>
        <li>cache</li>
        <li>SaaS</li>
      </ul>
    </DocsLayout>
  );
}
