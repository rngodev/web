This week I improved the **run log** in [rngo 0.34.0](https://github.com/rngodev/rngo/releases/tag/0.34.0), among other things.

First of all, I renamed `effects` to `inputs` because I wanted to resolve ambiguity between the thing that produces events (the effect) and the events themselves (the inputs).

Similarly, I renamed `signals` to `outputs`, which allowed me to rename `invariants` to `signals`. So now a signal describes a pattern observed among a sequence of inputs, outputs and metadata, instead of a single observation.

And, on that note, I also added `metdata`, which replaces the `errors` table with a more complete schema:

```sql
CREATE TABLE metadata (
    type TEXT NOT NULL,
    input_id INTEGER,
    effect TEXT,
    offset INTEGER,
    attribute TEXT,
    data TEXT
);
```

The end result is a better defined simulation structure:

- an [effect](/docs/concepts/effect) produces **inputs** to a channel
- a [channel](/docs/concepts/channel) _may_ return **outputs**
- an [effect](/docs/concepts/effect) may also produce **metadata**
- a [signal](/docs/concepts/signal) describes patterns across **inputs**, **outputs**, and **metadata**

So now when you run rngo, you'll see something like this in the audit phase:

```bash
Audit
no-errors: 3096 (failed - expected 'result == 0')
some-inputs: 1556 (passed)
warnings: 16
1 passed
1 failed
```

Also, I added a `--default` flag to `rngo init`, along with a `--dry-run` flag to `rngo run`.

## Looking Forward

Next week, I plan on supporting massive simulations by building a SQLite native run log.
