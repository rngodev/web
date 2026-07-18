import { A, CodeBlock, DocsLayout, H1, H2, H3, InlineCode, P } from "../layout";

export default function CliOverview() {
  return (
    <DocsLayout section="CLI" active="Overview">
      <H1>CLI</H1>

      <P>
        The rngo CLI manages project configurations, runs simulations and routes effect streams to
        systems.
      </P>

      <P>
        The source code can be found{" "}
        <A href="https://github.com/rngodev/rngo-rs/tree/main/crates/cli">
          in the <InlineCode>rngo-rs</InlineCode> repository
        </A>
        .
      </P>

      <H2>Installation</H2>

      <P>You can install the rngo CLI on macOS and Linux using Homebrew:</P>

      <CodeBlock>brew install rngodev/tap/cli</CodeBlock>

      <P>
        Otherwise, you can pull down a precompiled binary from{" "}
        <A href="https://github.com/rngodev/rngo-rs/releases/latest">
          https://github.com/rngodev/rngo-rs/releases/latest
        </A>
      </P>

      <P>Additionally, Rust users can build from source via:</P>

      <CodeBlock>cargo install rngo-cli</CodeBlock>

      <H2>Project Configuration</H2>

      <P>
        The configuration for a project lives in its local <InlineCode>.rngo</InlineCode> directory.
      </P>

      <P>
        The main configuration file is <InlineCode>.rngo/config.yml</InlineCode>, which may look
        something like this:
      </P>

      <CodeBlock>
        {`seed: 41
start: now - years(3)
end: now + hours(12)
`}
      </CodeBlock>

      <H3>Schema</H3>

      <table class="w-full text-sm mb-6">
        <thead>
          <tr>
            <th class="text-left text-xs uppercase tracking-widest text-stone-900/40 dark:text-stone-200/40 pb-3 pr-8 font-medium">
              Key
            </th>
            <th class="text-left text-xs uppercase tracking-widest text-stone-900/40 dark:text-stone-200/40 pb-3 pr-8 font-medium"></th>
            <th class="text-left text-xs uppercase tracking-widest text-stone-900/40 dark:text-stone-200/40 pb-3 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-stone-900/10 dark:border-stone-200/10">
            <td class="py-3 pr-8 align-top">
              <InlineCode>seed</InlineCode>
            </td>
            <td class="py-3 pr-8 align-top">
              <span class="text-xs bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 px-1.5 py-0.5 rounded-sm">
                optional
              </span>
            </td>
            <td class="py-3 text-stone-900/70 dark:text-stone-200/70 leading-relaxed align-top">
              The default seed for the simulation's RNG, ensuring reproducible runs.
            </td>
          </tr>
          <tr class="border-t border-stone-900/10 dark:border-stone-200/10">
            <td class="py-3 pr-8 align-top">
              <InlineCode>start</InlineCode>
            </td>
            <td class="py-3 pr-8 align-top">
              <span class="text-xs bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 px-1.5 py-0.5 rounded-sm">
                optional
              </span>
            </td>
            <td class="py-3 text-stone-900/70 dark:text-stone-200/70 leading-relaxed align-top">
              The starting point in time for the simulation. Accepts expressions like
              <InlineCode>now - weeks(8)</InlineCode>.
            </td>
          </tr>
          <tr class="border-t border-stone-900/10 dark:border-stone-200/10">
            <td class="py-3 pr-8 align-top">
              <InlineCode>end</InlineCode>
            </td>
            <td class="py-3 pr-8 align-top">
              <span class="text-xs bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 px-1.5 py-0.5 rounded-sm">
                optional
              </span>
            </td>
            <td class="py-3 text-stone-900/70 dark:text-stone-200/70 leading-relaxed align-top">
              The ending point in time for the simulation. Accepts expressions like
              <InlineCode>now + days(1)</InlineCode>.
            </td>
          </tr>
        </tbody>
      </table>

      <P>
        Systems and effects each get their own configuration files under{" "}
        <InlineCode>.rngo/systems/</InlineCode>, <InlineCode>.rngo/effects/</InlineCode> and{" "}
        <InlineCode>.rngo/schemas/</InlineCode>, e.g.:
      </P>

      <CodeBlock>
        {`> ls -l .rngo
.rngo/config.yml
.rngo/systems/db.yml
.rngo/effects/user.create.yml
.rngo/effects/post.create.yml
.rngo/effects/comment.create.yml
.rngo/schemas/email.yml
`}
      </CodeBlock>

      <P>
        See the <A href="/docs/concepts/system">System</A>,{" "}
        <A href="/docs/concepts/effect">Effect</A>, and <A href="/docs/concepts/schema">Schema</A>{" "}
        references for how to customize.
      </P>
    </DocsLayout>
  );
}
