import { A, CodeBlock, H2, InlineCode, P } from "../../../docs/layout";
import { PostLayout } from "../../layout";
import { posts } from "../../posts";

const meta = posts.find((post) => post.slug === "goodbye-systems-hello-channels")!;

export default function GoodbyeSystemsHelloChannels() {
  return (
    <PostLayout meta={meta}>
      <P>
        This week I replaced the original <i>systems</i> concept in rngo with{" "}
        <A href="/docs/concepts/channel">channels</A> in{" "}
        <A href="https://github.com/rngodev/rngo/releases/tag/0.32.0">rngo 0.33.0</A>.
      </P>

      <P>
        A channel is an interface to the system-under-test through which rngo can push{" "}
        <A href="/docs/concepts/effect">effects</A>, pull{" "}
        <A href="/docs/concepts/signal">signals</A> or do both.
      </P>

      <P>
        For example, you might have the following in a project at{" "}
        <InlineCode>.rngo/channels/db.yml</InlineCode>:
      </P>

      <CodeBlock>{`format:
  type: sql
target:
  type: stream
  command: sqlite3 db1.sqlite`}</CodeBlock>

      <P>
        A channel must specify a <InlineCode>target</InlineCode>, which defines how the channel
        sends raw input and receives raw output (analogous to <InlineCode>import</InlineCode> in a
        system).
      </P>

      <P>
        In the above example, the target is of type <b>stream</b>, which means the CLI will start
        the specified <InlineCode>command</InlineCode> in a sub-shell prior to each simulation and
        send effects to stdin and receive signals from stdout and stderr.
      </P>

      <P>
        A channel may also specify <InlineCode>format</InlineCode>, which defines how the channel
        will adapt an effect value prior to sending it to the <InlineCode>target</InlineCode>.
        Currently, the only supported type is <b>sql</b>.
      </P>

      <P>
        If <InlineCode>format</InlineCode> is not specified, the JSON representation of the effect
        value will be sent to the <InlineCode>target</InlineCode>
      </P>

      <H2>Effect</H2>

      <P>
        <A href="/docs/concepts/effect">Effects</A> now reference a <InlineCode>channel</InlineCode>
        , naturally, and no longer have a <InlineCode>format</InlineCode> field, which has been
        replaced by <InlineCode>metadata</InlineCode>:
      </P>

      <CodeBlock>{`widgets.update:
  trigger: hz(100, day)
  channel: db
  metadata:
    table: WIDGETS
  schema:
    type: object
    properties:
      id:
        type: number
        ...`}</CodeBlock>

      <P>
        <InlineCode>metadata</InlineCode> takes an arbitrary map, but its fields may be meaningful
        to the referenced channel. For example, in this case, the "db" channel will use{" "}
        <InlineCode>table</InlineCode> to format SQL statements.
      </P>

      <H2>Read-Only Channels</H2>

      <P>Some channels are not intended to send input, but only receive output, e.g. a log file:</P>

      <CodeBlock>{`target:
type: stream
command: tail -F logs/app.log`}</CodeBlock>

      <P>
        For these, there's of course no need to specify a <InlineCode>format</InlineCode>. The
        channel will just listen tostdout / stderr and output signals
      </P>

      <H2>Looking Forward</H2>

      <P>
        Next week, my goal is to iterate on the{" "}
        <A href="https://github.com/rngodev/agent">rngo agent skills</A> to streamline rngo spec
        definition both during project initialization and on an ongoing basis.
      </P>

      <P>
        My goal is to for coding agents to be able to fully initialize rngo for a real-world project
        and run a simulation from a simple prompt.
      </P>
    </PostLayout>
  );
}
