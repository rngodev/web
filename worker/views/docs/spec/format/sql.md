# sql

Transforms an input into a SQL insert statement. Typically paired with a [`stream`](/docs/spec/channel/stream) channel that pipes into a database client.

The table name is taken from the `table` field on the associated effect's [metadata](/docs/spec/effect#metadata). If that's not specified, it falls back to the effect's key.

## Parameters

None.

## Examples

An input with the following data, from an effect with the key `users`:

```json
{
  "id": 1,
  "name": "Alice",
  "admin": true
}
```

becomes:

```sql
INSERT INTO `users` (id, name, admin) VALUES (1, 'Alice', true);
```

Pipe SQL statements into `psql`'s stdin:

```yaml
type: stream
command: psql -q $DATABASE_URL
format:
  type: sql
```
