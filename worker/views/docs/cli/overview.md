# CLI

The rngo CLI manages project configurations, runs simulations and routes effect streams to systems.

The source code can be found [in the `rngo-rs` repository](https://github.com/rngodev/rngo-rs/tree/main/crates/cli).

## Installation

You can install the rngo CLI on macOS and Linux using Homebrew:

```
brew install rngodev/tap/cli
```

Otherwise, you can pull down a precompiled binary from [https://github.com/rngodev/rngo-rs/releases/latest](https://github.com/rngodev/rngo-rs/releases/latest)

Additionally, Rust users can build from source via:

```
cargo install rngo-cli
```

## Project Configuration

The configuration for a project lives in its local `.rngo` directory.

The main configuration file is `.rngo/config.yml`, which may look something like this:

```yaml
seed: 41
start: now - years(3)
end: now + hours(12)
```

### Schema

| Key     |          | Description                                                                               |
| ------- | -------- | ----------------------------------------------------------------------------------------- |
| `seed`  | optional | The default seed for the simulation's RNG, ensuring reproducible runs.                    |
| `start` | optional | The starting point in time for the simulation. Accepts expressions like `now - weeks(8)`. |
| `end`   | optional | The ending point in time for the simulation. Accepts expressions like `now + days(1)`.    |

Systems and effects each get their own configuration files under `.rngo/systems/`, `.rngo/effects/` and `.rngo/schemas/`, e.g.:

```
> ls -l .rngo
.rngo/config.yml
.rngo/systems/db.yml
.rngo/effects/user.create.yml
.rngo/effects/post.create.yml
.rngo/effects/comment.create.yml
.rngo/schemas/email.yml
```

See the [System](/docs/concepts/system), [Effect](/docs/concepts/effect), and [Schema](/docs/concepts/schema) references for how to customize.
