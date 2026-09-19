This week, [rngo 0.36.0](https://github.com/rngodev/rngo/releases/tag/0.36.0) features a refreshed architecture. I've skipped a couple Friday releases, but I wanted to take the time to make sure that all the code was cohesive in a way that only a human can.

The motivating issue was that prior to this release, channels lived entirely in the CLI. I didn't like this because I wanted the CLI to be as thin a layer over the library as possible.

So, I created a `Channel` concept in the library, which handles formatting and delivering inputs to the system under test. I also added the concept of `Proxy`, which handles routing inputs to the appropriate channels.

```rust
let proxy = rngo::Proxy::builder()
    .with_channel("db", |channel| {
        channel
            .effects("user", "post")
            .target(
                stream().command("psql -q $DATABASE_URL")
            )

    })
    .with_channel("log", |channel| {
        channel
            .target(
                stream().command("tail -F logs/app.log")
            )

    })
    .run_log(run_log)
    .build()?
```

I also added the concept of an `Audit`, which is a collection of `Signal`s evaluated against a simulation's run log:

```rust
let audit = rngo::Audit::builder()
    .with_signal("no-db-errors",
        sql_signal()
            .query("SELECT count(*) FROM outputs WHERE channel = 'db'")
            .expect("result == 0")
    )
    .with_signal("minimal-log-errors",
        sql_signal()
            .query("SELECT count(*) FROM outputs WHERE channel = 'log' AND data LIKE 'ERROR%'")
            .expect("result < 20")
    )
    .run_log(run_log)
    .build()?;

let audit_report = audit.run();
assert!(audit_report.passed())
```

So, nothing changed about the behavior of the rngo CLI, but I was able to improve the architecture beyond what an affordable LLM was capable of.

## Looking Forward

I didn't address performance in the last three weeks, but we are in a much better place to do so going forward. So I plan on further improvements to the rngo architecture and establishing performance benchmarks (and improvements?) for next time.
