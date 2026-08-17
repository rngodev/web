This week I created a unified `rngo` skill in [rngo agent 0.3.0](https://github.com/rngodev/agent/releases/tag/0.3.0).

Previously, the repo had more granular skills, but there was so much overlap that it made more sense to just have single skill that will be invoked for all rngo operations.

An agent mostly adds value by creating the initial [spec](/docs/concepts/spec) and keeping it up-to-date, so the skill packages most of the [docs site](/docs) as [references](https://agentskills.io/specification#references).

## Looking Forward

[Takeoff](https://github.com/rngodev/takeoff) is an example application that uses rngo. My initial attempt to use the rngo skill to initialize the repo exposed many gaps that I plan on resolving this week.

My goal is for the rngo skill to seamlessly initialize [Takeoff](https://github.com/rngodev/takeoff) for rngo. To do so, I'll have to make improvements to [rngo](https://github.com/rngodev/rngo) itself, the skill and the docs.
