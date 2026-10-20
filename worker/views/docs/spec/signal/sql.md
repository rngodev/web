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

### No Error Outputs

Expect that no error-level outputs are observed:

```yaml
type: sql
query: >
  select count(*) from outputs
  where level = 'error';
expect: result == 0
```

### Validation

Any attempt to create a user with an age less than 18 must result in an API error.

```yaml
type: sql
query: >
  SELECT count(*) 
  FROM signals s
    JOIN effects e ON s.effect_id = e.id
  WHERE e.key = 'user.post'
  AND e.value ->> '$.age' < 18
  AND s.data NOT LIKE '%422 Unprocessable Content%';
expect: result == 0
```
