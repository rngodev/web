# Initialize

Set up your repository for rngo by running:

```
rngo init
```

This will create a `.rngo` directory, with a `config.yml` that's the beginning of the simulation we're going to configure.

## Configure

A full simulation includes [systems](/docs/concepts/system) to model where the application maintains state, and [effects](/docs/concepts/effect) which model interactions with those systems.

You could also do each by hand, or ask an LLM to do it for you. Either way, commit everything in `.rngo/systems` and `.rngo/effects` to source control.

## Run It

Now run the simulation:

```
rngo run
```

This will create a simulation from the contents of the `.rngo` directory and route effects to systems.

---

## Next Step

Visit the [simulation reference](/docs/concepts/simulation) to improve your application's configuration.
