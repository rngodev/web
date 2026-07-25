import { A, CodeBlock, H2, InlineCode, P } from "../../../docs/layout";
import { PostLayout } from "../../layout";
import { posts } from "../../posts";

const meta = posts.find((post) => post.slug === "agent-skills")!;

export default function AgentSkills() {
  return (
    <PostLayout meta={meta}>
      <P>
        This week we updated <InlineCode>rngo init</InlineCode> in{" "}
        <A href="https://github.com/rngodev/rngo/releases/tag/0.31.0">rngo 0.31.0</A> to offer to
        install rngo agent skills. For example:
      </P>

      <CodeBlock>
        {`✔ Would you like to install agent skills? · yes
✔ Where should skills be installed? · Standard Local (./.agents/skills)
./.agents/skills:
  rngo-custom-schema-type: installed 0.2.0
  rngo-effect-inference: installed 0.2.0
  rngo-system-inference: installed 0.2.0`}
      </CodeBlock>

      <P>
        This works by pulling the latest release from the new{" "}
        <A href="https://github.com/rngodev/agent">rngodev/agent</A> Github repo.
      </P>

      <P>
        If you choose to install the skills, you should be able prompt your agent to infer systems
        and effects like this:
      </P>

      <CodeBlock>{`infer rngo systems and effects!`}</CodeBlock>

      <P>
        And you <i>should</i> do this since an agent is quite good at setting a baseline for rngo,
        leaving you to tweak details.
      </P>

      <P>
        You can also install or update skills outside of <InlineCode>rngo init</InlineCode> by
        running:
      </P>

      <CodeBlock>{`rngo skills install`}</CodeBlock>

      <P>
        See <A href="docs/cli/init">rngo init</A> and{" "}
        <A href="docs/cli/skills/install">rngo skills install</A> documentation for more.
      </P>

      <H2>Looking Forward</H2>

      <P>
        Next week, we plan on adding support for storing simulation events locally in SQLite and
        defining after-the-fact expectations in terms of SQL queries.
      </P>
    </PostLayout>
  );
}
