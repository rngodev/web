This week in [rngo 0.37.0](https://github.com/rngodev/rngo/releases/tag/0.37.0), I made rngo less slow.

## Timing

I updated rngo to record timing metadata, specifically the simulation start and end times. So, I was able to add that to the audit for my semi-realistic application [Takeoff](https://github.com/rngodev/takeoff). It was slow:

```bash
Simulation
time: 2026-09-26 13:41:58
db: 31317 effects, 0 outputs

Audit
elapsed-seconds: 564.551
```

So about 10 minutes for 31k inputs, which is very slow. I set up some [Criterion](https://criterion-rs.github.io/book/) benchmarks and addressed some low-hanging fruit and got it down to 10 seconds:

```bash
Simulation
time: 2026-09-27 02:37:43
db: 31317 effects, 0 outputs

Audit
elapsed-seconds: 10.37
```

The main improvements were adding indexes to the SQLite database, but avoiding database calls by caching data in an in-process data store.

The obvious concern with caching is how it will impact the process's memory. I used a [Fenwick tree](https://en.wikipedia.org/wiki/Fenwick_tree) implementation, along with some other optimizations, which means that 100 million events will require less than 10 MBs of memory, which I think is acceptable for now.

## Library Structure

I also improved the organization of the rngo Rust library, first of all by getting rid of the `rngo-sim` crate and putting all the code in the top-level `rngo` crate. I also consolidated a lot of code under the main `effect`, `proxy`, `log` and `audit` modules.

There will probably be more breaking changes coming, but all in the name of ultimately stabilizing on a high-quality, idiomatic library interface.

## Looking Forward

Next week, I plan on continuing to improve simulation realism and developer experience in the example [Takeoff](https://github.com/rngodev/takeoff) application.
