This week in [rngo 0.35.0](https://github.com/rngodev/rngo/releases/tag/0.35.0), I update the CLI to use the SQLite run log for [references](/docs/schema/primitive/reference) instead of keeping everything in memory.

This allows for very large runs albeit, at this point, slow ones.

## Takeoff

I added a soon-to-be-realistic application called [Takeoff](https://github.com/rngodev/takeoff) that I asked Claude to install rngo on, and it mostly did a good job of it.

Takeoff has a few unique foreign keys, though, so I needed to add support for **unique references** to avoid errors.

So here's an example from `.rngo/effect/resolutions.crate.yml`:

```yaml
take_id:
  type: function
  expression: take.id
  variables:
    take:
      type: reference
      effect: takes.create
      cursor: unique
```

The `take` reference will never return the same input twice, which appeases the unique index on `resolutions.take_id`. The downside is that we need to keep track of each input in the run log.

## Signals

I also updated the audit to output signals to the run log, instead of to a separate file. The CLI will now output to a `signals` table in the SQLite databse:

```
sqlite> select * from signals;
+-------------+-------+--------+-------+
|     key     | value | result | error |
+-------------+-------+--------+-------+
| no-errors   | 3096  | failed |       |
| some-inputs | 1556  | passed |       |
| warnings    | 16    |        |       |
+-------------+-------+--------+-------+
```

## Looking Forward

As mentioned above, a rngo run is pretty slow these days, so I plan on setting up some benchmarks and improving the run speed.
