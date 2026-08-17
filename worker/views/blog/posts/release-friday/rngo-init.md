Perhaps appropriately, the highlight of our inaugural Release Friday is the new `rngo init` command that sets a project up for rngo in one step.

I've also made many smaller changes to the CLI that improve consistency and quality-of-life.

For more, read see the [rngo 0.29.0 release](https://github.com/rngodev/rngo/releases/tag/0.29.0)

## rngo init

`rngo init` initializes a project for rngo by adding `.rngo/config.yml` and updating `.gitignore`, if it exists.

```bash
> rngo init
> cat .rngo/config.yml
key: my-project
seed: 1
> cat .gitignore | grep .rngo
.rngo/runs
```

This is pretty minimal for now - you'd still need to define [systems](/docs/concepts/system) and [effects](/docs/concepts/effect), which is really the bulk of the setup. In upcoming releases, this command will offer the option to install agent skills to do that for you.

See the [rngo init docs](/docs/cli/init) for details.

## Looking Forward

Next week, I plan on releasing **custom schemas**, which will let you define your own named schemas for use by your effects.

And I'll also try to add agent skills to `rngo init`
