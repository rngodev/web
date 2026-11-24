In [rngo 0.41.0](https://github.com/rngodev/rngo/releases/tag/0.41.0), I focused on stabilizing the rngo library and CLI. Prior to this release, I would break things pretty regularly, but after this release I'll make a best effort to avoid it going forward. Then, once we observe stability, I'll release 1.0.

rngo has other public interfaces in the form of the [spec](/docs/spec) and [log](/docs/reference/log) schemas. Starting with this release, these will also be versioned and incremented as features are added or changed.

## Spec Schema

A [spec](/docs/spec) now declares its format in a top-level `version`:

```yaml
version: 1
effects: ...
```

The CLI will automatically set this during [`rngo init`](/docs/cli/init). If it is missing, it will assume version 1.

If the CLI sees a version that it doesn't understand, it will direct the user to the new [MIGRATION.md](https://github.com/rngodev/rngo/blob/main/MIGRATING.md) file.

`rngo init` will also add a `$schema` value to the spec to better integrate with editor validation and autocomplete. It points to a new [schema directory](https://github.com/rngodev/rngo/tree/main/schema/v1) in the main repository.

## Log Schema

The standard [log](/docs/reference/log) backend is [SQLite](https://sqlite.org/), and the version of the schema in each log file is recorded under `PRAGMA user_version`.

This won't have much of an impact right now since [`rngo eval`](/docs/cli/init) will always create a new log and immediately audit it, but will be important when doing audits outside of eval.

Versions and migrations will also be documented in [MIGRATION.md](https://github.com/rngodev/rngo/blob/main/MIGRATING.md).

## Rust API

Most of the work for this release was on the `rngo` library crate, which got a lot of breaking changes in an attempt to avoid them in future releases. These include, but are not limited to:

- remove any structs and enums not used by the CLI or in the README
- public enums and structs are `#[non_exhaustive]`, so they can gain fields in minor releases
- custom signals, channels and formats methods takes a context, so they can be given more information later without breaking your code
- more consistent builders, and parse and build errors work with `?`
- `Simulation`, `Proxy` and `Audit` are `Send`
- `chrono` is replaced with `jiff`, and `rusqlite` is no longer part of the public API
- set an effect's channel nione place, rather than also being passed to the proxy

## Honorable Mentions

Besides breaking the Rust API and versioning schemas, this release includes the following:

- unexpected fields anywhere in the spec result in a parse error at that field instead of being silently ignored
- more errors point at the exact field they concern, including nested generators like `effects.a.generator.properties.x.items`
- `exec` and `stream` channels now work on Windows, and CI runs the tests on Linux, macOS and Windows
- `rngo init` now installs the agent skills release that matches the CLI version, so your coding agent's `rngo` skill always knows about the spec format you're running.

And finally I've started recording granular change at [CHANGELOG.md](https://github.com/rngodev/rngo/blob/main/CHANGELOG.md) - so see all the changes there.
