import { A, CodeBlock, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function Simulation() {
  return (
    <DocsLayout section="Platform" active="Simulation">
      <H1>Simulation</H1>

      <P>
        A <b>simulation</b> is a collection of <A href="systems">systems</A> and{" "}
        <A href="#effects">effects</A>. When run, a simulation emits an interleaved stream of events
        from each of its effects, over the configured period of time.
      </P>

      <P>
        A simulation is specified using a <b>spec</b> (usually in YAML). For example:
      </P>

      <CodeBlock>
        {`seed: 41
start: now - years(5)
systems:
  sqlite:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  user.create:
    system: sqlite
    format:
      table: USER
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

      <P>
        You can run a spec using the{" "}
        <A href="/docs/cli/sim/run">
          <InlineCode>rngo sim run</InlineCode>
        </A>{" "}
        CLI command.
      </P>

      <H2>Seed</H2>

      <P>
        <InlineCode>seed</InlineCode> is used to make the simulation's random number generator
        deterministic. It must be a positive integer, and defaults to <InlineCode>1</InlineCode>
      </P>

      <P>
        Changing <InlineCode>seed</InlineCode> lets you get a fresh set of data for an otherwise
        identical simulation.
      </P>

      <H2>Systems</H2>

      <P>
        <InlineCode>systems</InlineCode> is a map of named systems, or stateful interfaces. Any
        system referenced by an effect must be included in this map.
      </P>

      <P>
        See <A href="/docs/concepts/system">System</A> for syntax details.
      </P>

      <H2>Effects</H2>

      <P>
        <InlineCode>effects</InlineCode> is a map of named effects, or system interactions. It must
        contain at least one entry, but usually contains many.
      </P>

      <P>
        See <A href="/docs/concepts/effect">Effect</A> for syntax details.
      </P>
    </DocsLayout>
  );
}
