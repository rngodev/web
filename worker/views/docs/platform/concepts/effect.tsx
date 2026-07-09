import { A, CodeBlock, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function Effect() {
  return (
    <DocsLayout section="Platform" active="Effect">
      <H1>Effect</H1>

      <P>
        An <b>effect</b> models interactions with a system. For example, the following effect
        generates user creation events roughly once per hour:
      </P>

      <CodeBlock>
        {`trigger: hz(1, hour)
system: db
format:
  table: USERS
schema:
  type: object
  properties:
    name:
      type: string
      minLength: 10
      maxLength: 50
    age:
      type: integer
      min: 18`}
      </CodeBlock>

      <H2>Schema</H2>

      <P>
        An effect must specify a <b>schema</b>, which defines the structure and content of its
        events.
      </P>

      <P>
        See the <A href="/docs/schema">Schema reference</A> for more details.
      </P>

      <H2>Trigger</H2>

      <P>
        An effect's <b>trigger</b> defines when it emits events. If not specified, an effect will
        emit roughly one event per day
      </P>

      <P>
        The value is in Hertz but is also an expression, so you can use the more readable{" "}
        <InlineCode>hz</InlineCode> function instead of <InlineCode>0.0833</InlineCode>:
      </P>

      <CodeBlock>hz(5, minute)</CodeBlock>

      <P>
        rngo builds in variance, so the observed rate over any sub-interval of the simulation may be
        higher or lower than the configured one.
      </P>

      <P>
        You can also configure growth by referencing <InlineCode>offset</InlineCode>:
      </P>

      <CodeBlock>hz(3, hour) + (0.0001 * offset)</CodeBlock>

      <P>
        The expression is sampled periodically over the course of the simulation, so the observered
        frequency will change in steps.
      </P>

      <P>
        Trigger frequency will always be adjusted to be greater than or equal to zero and less than
        1000 Hz.
      </P>

      <H2>System</H2>

      <P>
        All effects are bound to a <b>system</b>:
      </P>

      <CodeBlock>
        {`systems:
  mydb:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  users.create:
    system: mydb
    schema:
      ...`}
      </CodeBlock>

      <P>
        If a <InlineCode>system</InlineCode> is not explicitly configured, the events will be
        written to the file system.
      </P>

      <H2>Format</H2>

      <P>
        An effect's <b>format</b> extends the format of its system. For example, it's often used to
        set the table name in a SQL system:
      </P>

      <CodeBlock>
        {`effects:
  create.article:
    system: mysql
    format:
      table: Article
    schema:
      ...`}
      </CodeBlock>

      <P>
        If the effect has an explicit <InlineCode>system</InlineCode>, its{" "}
        <InlineCode>format</InlineCode> will not override anything in the system format.
      </P>

      <P>
        If no <InlineCode>system</InlineCode> is set, the full effect{" "}
        <InlineCode>format</InlineCode> will be used:
      </P>

      <CodeBlock>
        {`effects:
  create.comment:
    format:
      type: sql
      table: user_comments
    schema:
      ...`}
      </CodeBlock>

      <P>
        If neither <InlineCode>system</InlineCode> nor <InlineCode>format</InlineCode> is
        configured, JSON will be used as the default format.
      </P>
    </DocsLayout>
  );
}
