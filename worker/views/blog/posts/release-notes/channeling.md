This week in [rngo 0.38.0](https://github.com/rngodev/rngo/releases/tag/0.38.0) and [rngo agent 0.4.0](https://github.com/rngodev/agent/releases/tag/0.4.0), I focused on improving channel design, implementation and documentation.

## `template` Format

I added a `template` format, which renders a [Handlebars](https://handlebarsjs.com/) template for each event. Previously, the `exec` target would do something similar, but I think doing this at the format level works better since it can be used with any target type.

So, now instead of this:

```yaml
channels:
  api:
    target:
      type: exec
      command: curl -sS -X {{method}} $API_BASE_URL{{path}}
```

You should do this:

```yaml
channels:
  api:
    format:
      type: template
      template: curl -sS -X {{data.method}} $API_BASE_URL{{data.path}}
    target:
      type: exec
```

You may notice that the input data is now accessed via the `data` field. This is because the template has access to input metadata including `timestamp`, and `effect.key`.

Also, the `exec` target no longer accepts the `command` field.

See the [channel reference](/docs/concepts/channel) for more details.

## Realtime

The `rngo run` CLI command now accepts a `--realtime` flag, which tells it to wait to send inputs until their logical timestamp.

For backdated inputs, nothing will change since their logical timestamps have already passed.

See the [`rngo run` reference](/docs/cli/run) for more details.

## Timestamps

Simulations now use a millisecond clock and the log will record just a single integer timestamp per input, and no longer also include a RFC 3339 timestamp. You may need to update signals queries to accomodate this change.

## Agent Skill

[rngo agent 0.4.0](https://github.com/rngodev/agent/releases/tag/0.4.0) updates the `rngo` skill's references to include much improved channel documentation, among other improvements. Your agent should be able to write channels that take advantage of templates, environment variables, shell features, etc.

You can update your skills by running:

```bash
❯ rngo skills install
```

## Looking Forward

Next week, I plan on introducing a concept of **phases** which will make it easy to segment a simulation between backfilling private channels and exercising public channels.

I think this is will proved to be a very common approach I'll a good example of it in the [Takeoff](https://github.com/rngodev/takeoff) application.
