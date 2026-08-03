import { A, CodeBlock, H2, InlineCode, P } from "../../../docs/layout";
import { PostLayout } from "../../layout";
import { posts } from "../../posts";

const meta = posts.find((post) => post.slug === "invariants")!;

export default function Invariants() {
  return (
    <PostLayout meta={meta}>
      <P>
        This week I added <b>invariants</b> to rngo in{" "}
        <A href="https://github.com/rngodev/rngo/releases/tag/0.32.0">rngo 0.32.0</A>. An invariant
        allows you to specify expectations of the simulation log, which get evaluated during a
        post-simulation audit.
      </P>

      <P>
        For example, to ensure there were no error-level signals, you'd specify the following
        invariant:
      </P>

      <CodeBlock>
        {`type: sql
query: >
  select count(*) from signals
  where level = 'error';
expect: result == 0`}
      </CodeBlock>

      <P>
        Now <InlineCode>rngo run</InlineCode> will output stats about the simulation along with
        audit results:
      </P>

      <CodeBlock>{`Simulation
time: 2026-08-03 09:02:34
api: 8 effects, 8 signals
log: 0 effects, 13 signals
db: 1548 effects, 96 signals

Audit
1/2 invariants passed
no-errors failed - got 96, expected 'result == 0'`}</CodeBlock>

      <P>
        To make this work, I moved simulation log storage from JSONL files to a{" "}
        <A href="https://sqlite.org">SQLite</A> database at{" "}
        <InlineCode>.rngo/runs/last/log.sqlite</InlineCode>, for example.
      </P>

      <P>
        Also, the results of the invariant evaluations will be stored at{" "}
        <InlineCode>.rngo/runs/last/invariants.json</InlineCode>
      </P>

      <P>
        See <A href="/docs/concepts/invariant">the invariant docs</A> for more.
      </P>

      <H2>Looking Forward</H2>

      <P>
        Next week, I'd like to introduce the <b>channel</b> concept which is a generalization of{" "}
        <A href="/docs/concepts/system">systems</A>, and will replace them.
      </P>

      <P>
        A channel is an interface to the system under test through which rngo can push{" "}
        <A href="/docs/concepts/effect">effects</A>, pull
        <A href="/docs/concepts/signal">signals</A> or both. It may also format effects and parse
        signals.
      </P>
    </PostLayout>
  );
}
