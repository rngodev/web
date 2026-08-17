This week I updated `rngo init` in [rngo 0.31.0](https://github.com/rngodev/rngo/releases/tag/0.31.0) to offer to install rngo agent skills. For example:

```bash
✔ Would you like to install agent skills? · yes
✔ Where should skills be installed? · Standard Local (./.agents/skills)
./.agents/skills:
  rngo-custom-schema-type: installed 0.2.0
  rngo-effect-inference: installed 0.2.0
  rngo-system-inference: installed 0.2.0
```

This works by pulling the latest release from the new [rngodev/agent](https://github.com/rngodev/agent) Github repo.

If you choose to install the skills, you should be able prompt your agent to infer systems and effects like this:

```
infer rngo systems and effects!
```

And you _should_ do this since an agent is quite good at setting a baseline for rngo, leaving you to tweak details.

You can also install or update skills outside of `rngo init` by running:

```bash
rngo skills install
```

See [rngo init](docs/cli/init) and [rngo skills install](docs/cli/skills/install) documentation for more.

## Looking Forward

Next week, I plan on adding support for storing simulation events locally in SQLite and defining after-the-fact expectations in terms of SQL queries.
