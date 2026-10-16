# sql

Calculates a [signal](/docs/spec/signal) with a [SQLite](https://sqlite.org)-compatible query that returns a scalar.

The query runs against the following schema:

```sql
CREATE TABLE inputs (
    id INTEGER NOT NULL,
    effect TEXT NOT NULL,
    offset INTEGER NOT NULL,
    data TEXT NOT NULL
);

CREATE TABLE outputs (
    channel TEXT NOT NULL,
    input_id INTEGER,
    timestamp TEXT NOT NULL,
    level TEXT NOT NULL,
    data TEXT NOT NULL
);

CREATE TABLE metadata (
    type TEXT NOT NULL,
    input_id INTEGER,
    effect TEXT,
    offset INTEGER,
    attribute TEXT,
    data TEXT
);
```

## Parameters

### `query` — required

The SQL query. It must return a scalar.

### `expect` — optional

A [CEL](https://cel.dev) expression which takes the `result` of the query and returns a boolean. If it returns false, the signal fails and the CLI exits with code 1.

## Examples

Expect that no error-level outputs are observed:

```yaml
type: sql
query: >
  select count(*) from outputs
  where level = 'error';
expect: result == 0
```
