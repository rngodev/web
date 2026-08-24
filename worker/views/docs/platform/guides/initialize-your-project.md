# Initialize Your Project

Initialize your project for rngo by running:

```
rngo init
```

[`rngo init`](/docs/cli/init) will create a `.rngo` directory, with a `spec.yml` that's the beginning of the project's rngo specification. It will also offer to install an agent skill, which you should do to make writing the spec easier.

## Specify

If you installed the skills, you should run something like:

```bash
claude "write the rngo spec"
```

Otherwise, you should follow the directions in [Write The Spec](/docs/guides/write-the-spec).

## Run

Now run the simulation:

```
rngo run
```

This will build a spec based upon the contents of the `.rngo` directory, run it, route inputs to channels and audit the results.

From here, you should iterate on the spec to make it more realistic and rerun it.

---

## Next Step

Visit the [spec reference](/docs/concepts/spec) to improve your application's spec.
