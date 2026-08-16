This week I added **invariants** to rngo in [rngo 0.32.0](https://github.com/rngodev/rngo/releases/tag/0.32.0). An invariant allows you to specify expectations of the simulation log, which get evaluated during a post-simulation audit.

For example, to ensure there were no error-level signals, you'd specify the following invariant:

```yaml
type: sql
query: >
  select count(*) from signals
  where level = 'error';
expect: result == 0
```

Now `rngo run` will output stats about the simulation along with audit results:

```
Simulation
time: 2026-08-03 09:02:34
api: 8 effects, 8 signals
log: 0 effects, 13 signals
db: 1548 effects, 96 signals

Audit
1/2 invariants passed
no-errors failed - got 96, expected 'result == 0'
```

To make this work, I moved simulation log storage from JSONL files to a [SQLite](https://sqlite.org) database at `.rngo/runs/last/log.sqlite`, for example.

Also, the results of the invariant evaluations will be stored at `.rngo/runs/last/invariants.json`

See [the invariant docs](/docs/concepts/invariant) for more.

## Looking Forward

Next week, I'd like to introduce the **channel** concept which is a generalization of [systems](/docs/concepts/system), and will replace them.

A channel is an interface to the system under test through which rngo can push [effects](/docs/concepts/effect), pull [signals](/docs/concepts/signal) or both. It may also format effects and parse signals.
