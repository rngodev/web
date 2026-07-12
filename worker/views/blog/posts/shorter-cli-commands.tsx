import { A, CodeBlock, Divider, H2, InlineCode, P } from "../../docs/layout";
import { PostLayout } from "../layout";
import { posts } from "../posts";

const meta = posts.find((post) => post.slug === "shorter-cli-commands")!;

export default function ShorterCliCommands() {
  return (
    <PostLayout meta={meta}>
      <P>
        We shipped two changes to the rngo CLI this week: every command is shorter to type, and a
        new <InlineCode>rngo init</InlineCode> command gets a new project running in one step.
      </P>

      <H2>rngo init</H2>

      <P>
        <InlineCode>rngo init</InlineCode> initializes a simulation for a project by adding{" "}
        <InlineCode>.rngo/config.yml</InlineCode> and updating <InlineCode>.gitignore</InlineCode>,
        if it exists.
      </P>

      <P>
        It sets <InlineCode>key</InlineCode> in <InlineCode>.rngo/config.yml</InlineCode> to the
        name of the current directory:
      </P>

      <CodeBlock>
        {`> rngo init
> cat .rngo/config.yml
key: my-project
seed: 1`}
      </CodeBlock>

      <P>
        From there, <A href="/docs/guides/quick-start">Quick Start</A> walks through adding your
        first system and effect.
      </P>

      <H2>Shorter Commands</H2>

      <P>
        Every subcommand is shorter to type, so the everyday loop of initializing and running a
        simulation now reads:
      </P>

      <CodeBlock>
        {`rngo init
rngo run`}
      </CodeBlock>

      <P>
        See the <A href="/docs/cli">CLI reference</A> for the full list of commands.
      </P>

      <Divider />

      <P>
        See the <A href="/docs/cli/init">rngo init</A> and <A href="/docs/cli/run">rngo run</A> docs
        for details.
      </P>
    </PostLayout>
  );
}
