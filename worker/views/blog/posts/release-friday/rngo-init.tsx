import { A, CodeBlock, H2, InlineCode, P } from "../../../docs/layout";
import { PostLayout } from "../../layout";
import { posts } from "../../posts";

const meta = posts.find((post) => post.slug === "rngo-init")!;

export default function RngoInit() {
  return (
    <PostLayout meta={meta}>
      <P>
        Perhaps appropriately, the highlight of our inaugural Release Friday is the new{" "}
        <InlineCode>rngo init</InlineCode> command that sets a project up for rngo in one step.
      </P>

      <P>
        We've also made many smaller changes to the CLI that improve consistency and
        quality-of-life.
      </P>

      <P>
        For more, read see the{" "}
        <A href="https://github.com/rngodev/rngo/releases/tag/0.29.0">rngo 0.29.0 release</A>
      </P>

      <H2>rngo init</H2>

      <P>
        <InlineCode>rngo init</InlineCode> initializes a project for rngo by adding{" "}
        <InlineCode>.rngo/config.yml</InlineCode> and updating <InlineCode>.gitignore</InlineCode>,
        if it exists.
      </P>

      <CodeBlock>
        {`> rngo init
> cat .rngo/config.yml
key: my-project
seed: 1
> cat .gitignore | grep .rngo
.rngo/runs`}
      </CodeBlock>

      <P>
        This is pretty minimal for now - you'd still need to define{" "}
        <A href="/docs/concepts/system">systems</A> and <A href="/docs/concepts/effect">effects</A>,
        which is really the bulk of the setup. In upcoming releases, this command will offer the
        option to install agent skills to do that for you.
      </P>

      <P>
        See the <A href="/docs/cli/init">rngo init docs</A> for details.
      </P>

      <H2>Looking Forward</H2>

      <P>
        Next week, we plan on releasing <b>custom schemas</b>, which will let you define your own
        named schemas for use by your effects.
      </P>

      <P>
        And we'll also try to add agent skills to <InlineCode>rngo init</InlineCode>
      </P>
    </PostLayout>
  );
}
