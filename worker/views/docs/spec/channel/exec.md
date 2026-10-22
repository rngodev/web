# exec

Runs each input as a command in a sub-shell. It expects a string, and will record an error if it receives anything else. It will also record an error if the command has a non-zero exit.

Since the commands run in the shell, they can make use of features like quoting, expansions and pipes. Additionally the CLI will load the local `.env`, which means these commands can reference those environment variables.

The stdout of each command's sub-shell is recorded as an interactive [output](/docs/spec/channel#output), i.e. it includes the ID of the input that triggered it.

## Parameters

None.

## Examples

If `API_URL` and `API_TOKEN` were defined in `.env`, you could send this command to `exec`:

```sh
curl -s -H "Authorization: Bearer $API_TOKEN" \
    "${API_URL:-http://localhost:3000}/users" \
        | jq -r '.[].email'
```

Each line `jq` prints to stdout is recorded as an interactive output.

Use cURL as an `exec` channel for an API, with a [`template`](/docs/spec/format/template) format:

```yaml
type: exec
format:
  type: template
  template: curl -sS -X {{data.method}} ${API_BASE_URL:-http://localhost:5173}{{data.path}}
```
