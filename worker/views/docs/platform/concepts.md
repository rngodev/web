# Concepts

rngo defines a collection of loosely coupled concepts

## System Under Test

The subject of any rngo session is the **system under test (SUT)**. The SUT could have an arbitrary topology, from a monolith to micro-services.

## Log

The **log** stores all inputs, outputs, metadata and signals from a rngo session.

It is the central hub of the session as the proxy, simualtion and audit may each write to and / or read from it.

See the [log reference](/docs/reference/log) for more details.

## Proxy

The **proxy** formats inputs and routes them to the correct interfaces in the SUT, at the correct time, and captures any outputs.

It writes both inputs and outputs to the log, along with any metadata.

## Simulation

A **simulation** produces a deterministic stream of inputs, interleaved from a series of logical **effects**, that are sent to a proxy.

## Audit

An **audit** surfaces notables signals from the inputs, outputs and metadata of the log.
