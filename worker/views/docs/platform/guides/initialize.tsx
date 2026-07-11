import { A, CodeBlock, Divider, DocsLayout, H1, H2, InlineCode, P } from "../../layout";

export default function Initialize() {
  return (
    <DocsLayout section="Platform" active="Initialize">
      <H1>Initialize</H1>

      <P>Set up your repository for rngo by running:</P>

      <CodeBlock>rngo init</CodeBlock>

      <P>
        This will create a <InlineCode>.rngo</InlineCode> directory, with a{" "}
        <InlineCode>config.yml</InlineCode> that's the beginning of the simulation we're going to
        configure.
      </P>

      <H2>Configure</H2>

      <P>
        A full simulation includes <A href="/docs/concepts/system">systems</A> to model where the
        application maintains state, and <A href="/docs/concepts/effect">effects</A> which model
        interactions with those systems.
      </P>

      <P>
        You could also do each by hand, or ask an LLM to do it for you. Either way, commit
        everything in <InlineCode>.rngo/systems</InlineCode> and{" "}
        <InlineCode>.rngo/effects</InlineCode> to source control.
      </P>

      <H2>Run It</H2>

      <P>Now run the simulation:</P>

      <CodeBlock>rngo run</CodeBlock>

      <P>
        This will create a simulation from the contents of the <InlineCode>.rngo</InlineCode>{" "}
        directory and route effects to systems.
      </P>

      <Divider />

      <H2>Next Step</H2>

      <P>
        Visit the <A href="/docs/concepts/simulation">simulation reference</A> to improve your
        application's configuration.
      </P>
    </DocsLayout>
  );
}
