import { A, CodeBlock, Divider, H2, InlineCode, P } from "../../docs/layout";
import { PostLayout } from "../layout";
import { posts } from "../posts";

const meta = posts.find((post) => post.slug === "simulating-a-payments-api")!;

export default function SimulatingAPaymentsApi() {
  return (
    <PostLayout meta={meta}>
      <P>
        This example builds a small simulation for a payments API with two effects:{" "}
        <InlineCode>charges.create</InlineCode> and <InlineCode>refunds.create</InlineCode>.
      </P>

      <H2>Defining the System</H2>

      <P>
        First, define where charges and refunds will be written. Here everything routes to a local
        SQLite database:
      </P>

      <CodeBlock>
        {`systems:
  db:
    format:
      type: sql
    import:
      command: sqlite3 payments.sqlite`}
      </CodeBlock>

      <H2>Modeling a Charge</H2>

      <P>Next, describe the shape of a charge and how often it occurs:</P>

      <CodeBlock>
        {`effects:
  charges.create:
    system: db
    format:
      table: CHARGES
    trigger: hz(200, hour)
    schema:
      type: object
      properties:
        id:
          type: function
          expression: "'ch_' + id"
          variables:
            id:
              type: string
              regex: '[a-zA-Z0-9]{14}'
        amount:
          type: number
          min: 100
          max: 250000
          scale: 0
          step: 1
        currency:
          type: constant
          value: usd
        customerId:
          type: reference
          effect: customers.create`}
      </CodeBlock>

      <H2>Modeling a Refund</H2>

      <P>
        Refunds reference an existing charge, using <A href="/docs/schema/reference">reference</A>{" "}
        to link back to it:
      </P>

      <CodeBlock>
        {`  refunds.create:
    system: db
    format:
      table: REFUNDS
    trigger: hz(8, hour)
    schema:
      type: object
      properties:
        id:
          type: function
          expression: "'re_' + id"
          variables:
            id:
              type: string
              regex: '[a-zA-Z0-9]{14}'
        chargeId:
          type: reference
          effect: charges.create
        amount:
          type: number
          min: 100
          max: 250000
          scale: 0
          step: 1`}
      </CodeBlock>

      <H2>Running It</H2>

      <P>With the config in place, run the simulation:</P>

      <CodeBlock>rngo run</CodeBlock>

      <P>
        rngo generates charges and refunds at the rates configured above, writing each row into{" "}
        <InlineCode>payments.sqlite</InlineCode> as it goes.
      </P>

      <Divider />

      <P>
        See the <A href="/docs/concepts/effect">Effect</A> and <A href="/docs/schema">Schema</A>{" "}
        references for the full set of options.
      </P>
    </PostLayout>
  );
}
