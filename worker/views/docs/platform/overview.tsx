import { A, CodeBlock, Divider, DocsLayout, H1, H2, P } from "../layout";

export default function PlatformOverview() {
  return (
    <DocsLayout section="Platform" active="Overview">
      <H1>Welcome!</H1>

      <P>
        rngo is a CLI that helps you understand what your code does by simulating usage and
        recording everything.
      </P>

      <P>
        A rngo <A href="/docs/concepts/simulation">simulation</A> models your code's interfaces in
        terms of <A href="/docs/concepts/system">systems</A> and{" "}
        <A href="/docs/concepts/effect">effects</A>, using an intuitive specification language that
        your coding agent can write. For example:
      </P>

      <CodeBlock>
        {`seed: 1
start: now - years(2)
systems:
  db:
    format:
      type: sql
    import:
      command: sqlite3 db.sqlite
effects:
  users.create:
    system: db
    format:
      table: USERS
    trigger: hz(100, day)
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
          minLength: 2
          maxLength: 64
        email:
          type: function
          expression: 'user' + number + '@example.com'
          variables:
            number:
              type: number
              min: 10000
              max: 99999
              scale: 0
  posts.create:
    system: db
    format:
      table: POSTS
    trigger: hz(120, hour)
    schema:
      type: object
      properties:
        id:
          type: number
          min: 1
          scale: 0
          step: 1
        title:
          type: select
          options:
            - schema:
                type: constant
                value: Lorem Ipsum
            - schema:
                type: constant
                value: Dolor Sit Amet
            - schema:
                type: constant
                value: Sed Mattis Eu Erat
        date:
          type: context
          path: ['clock', 'now']
        authorId:
          type: function
          expression: user.id
          variables:
            user:
              type: reference
              effect: users.create`}
      </CodeBlock>

      <P>You can run this simulation like this:</P>

      <CodeBlock>rngo sim run</CodeBlock>

      <P>
        The CLI will generate effects, apply them to the database and capture responses in the local
        fileystem.
      </P>

      <Divider />

      <H2>Next Step</H2>

      <P>
        Visit <A href="/docs/guides/quick-start">Quick Start</A> for a step-by-step guide running
        your first simulation in just a few minutes.
      </P>
    </DocsLayout>
  );
}
