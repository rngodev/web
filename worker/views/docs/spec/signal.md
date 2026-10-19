# Signal

A **signal** describes a pattern that may emerge from simulation inputs, outputs and / or metadata.

It may be paired with an expectation. For example, here's one that expects no error-level outputs:

```yaml
type: sql
query: >
  select count(*) from output
  where level = 'error';
expect: result == 0
```

## Parameters

### `type` — required

A discriminator. The only supported type is [sql](/docs/spec/signal/sql).
