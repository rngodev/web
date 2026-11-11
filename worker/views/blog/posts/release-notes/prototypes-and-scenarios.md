This week in [rngo 0.40.0](https://github.com/rngodev/rngo/releases/tag/0.40.0), I added **prototypes**, which enable parameter sharing among effects, and **scenarios**, which make it easy to eval different variants of a single spec.

## Prototypes

Often, multiple effects end up sharing the same `channel`, `start` and `end`. A [prototype](/docs/spec/prototype) lets you deduplicate these:

```yaml
prototypes:
  backfill:
    channel: db
    start: now - years(2)
    end: now
effects:
  user.create:
    prototype: backfill
    trigger: hz(5, hour)
    generator: ...
```

Here the `user.create` effect now uses the `backfill` prototype's `channel`, `start` and `end`.

Effects that do not specify a named prototype will get a default one, which takes `start` and `end` from the top-level spec.

## Scenarios

But more importantly than sharing parameters, prototypes enable **scenarios**, which override parameters upon request:

```yaml
prototypes:
  phaseOne:
    start: now - years(2)
    end: now - years(1)
    scenarios:
      small:
        start: now - months(6)
        end: now - months(3)
  phaseTwo:
    start: now - years(1)
    end: now
    scenarios:
      small:
        start: now - months(3)
```

The scenario can be selected during evaled with the `--scenario` flag:

```bash
❯ rngo eval --scenario small
```

Here, the time bounds from the `small` scenarios will by used for every effect that references either the `phaseOne` or `phaseTwo` prototypes. So a simple flag produces a smaller, but logically consistent variant of the spec.

See the [prototype reference](/docs/spec/prototype) and the [`rngo eval` reference](/docs/cli/eval) for more details.

## Agent Skill

[rngo agent 0.6.0](https://github.com/rngodev/agent/releases/tag/0.6.0) updates the `rngo` skill's references so your coding agent knows about prototypes and scenarios.

You can update your skills by running:

```bash
❯ rngo skills install
```
