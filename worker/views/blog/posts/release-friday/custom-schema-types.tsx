import { A, CodeBlock, H2, InlineCode, P } from "../../../docs/layout";
import { PostLayout } from "../../layout";
import { posts } from "../../posts";

const meta = posts.find((post) => post.slug === "custom-schema-types")!;

export default function CustomSchemaTypes() {
  return (
    <PostLayout meta={meta}>
      <P>
        This week we added support for custom schema types in{" "}
        <A href="https://github.com/rngodev/rngo/releases/tag/0.30.0">rngo 0.30.0</A>.
      </P>

      <P>
        This means that you can define a new schema type in terms of rngo's{" "}
        <A href="/docs/schema">primitive schema types</A> - or any of your other custom schema
        types.
      </P>

      <P>Here's an example:</P>

      <CodeBlock>
        {`schemas:
  uuid:
    schema:
      type: string
      format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
  uniqueEmail:
    schema:
      type: function
      expression: 'user-' + uniqueId + '@example.com'
      variables:
        uniqueId:
          schema: uuid
effects:
  user.create:
    schema:
      type: object
      properties:
        email:
          type: uniqueEmail`}
      </CodeBlock>

      <P>
        Notice how the effect's schema references the custom <InlineCode>uniqueEmail</InlineCode>{" "}
        schema type, which itself references the custom <InlineCode>uuid</InlineCode> type.
      </P>

      <P>The above spec would effectively expand to:</P>

      <CodeBlock>
        {`effects:
  user.create:
    schema:
      type: object
      properties:
        email:
          type: function
          expression: 'user-' + uniqueId + '@example.com'
          variables:
            uniqueId:
              type: string
              format: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`}
      </CodeBlock>

      <P>
        So, in this initial iteration, you can basically define reusable aliases for common schema
        patterns. See the{" "}
        <A href="/docs/concepts/schema#custom-schema-types">custom schema type docs</A> for details.
      </P>

      <H2>Looking Forward</H2>

      <P>
        In later weeks, we'll add support for parameterized custom schema types along with a
        strategy for <A href="/docs/cli">rngo CLI</A> to resolve schema references outside of the
        current project (e.g. on the internet).
      </P>

      <P>
        For next week, though, we plan on making it easy for coding agents to bootstrap a project by
        writing system, effect and custom schema type specs.
      </P>
    </PostLayout>
  );
}
