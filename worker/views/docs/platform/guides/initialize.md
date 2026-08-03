# Initialize

Initialize your project for rngo by running:

```
rngo init
```

[`rngo init`](/docs/cli/init) will create a `.rngo` directory, with a `spec.yml` that's the beginning of your rngo specification. It will also offer to install agent skills, which you should do to make configuration easier.

## Configure

A full spec includes [systems](/docs/concepts/system) to model where the application maintains state, and [effects](/docs/concepts/effect) which model interactions with those systems.

You could defines these by hand, but a coding agent is good at inferring these from your source code:

```bash
claude "infer rngo systems and effects"
```

Either way, the specs should live in `.rngo/systems` and `.rngo/effects` and be committed to source control.

## Run It

Now run the simulation:

```
rngo run
```

This will run a simulation based upon the contents of the `.rngo` directory and route effects to systems.

From here, you should iterate on the specs to make them more realistic and rerun the simulation.

---

## Next Step

Visit the [simulation reference](/docs/concepts/simulation) to improve your application's configuration.
