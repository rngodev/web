# select

Selects a value from exactly one of a set of sub-generators at random. By default, each sub-generator has an equal chance of being selected. However, weights can be assigned to each to adjust the probability of selection.

## Parameters

### `options` — required

An array of objects that must include a `generator` field and an optional `weight` field.

## Examples

Alternates between the string "one" and the number 2.

```json
{
  "type": "select",
  "options": [
    {
      "generator": {
        "type": "constant",
        "value": "one"
      }
    },
    {
      "generator": {
        "type": "constant",
        "value": 2
      }
    }
  ]
}
```

Emits a positive integer 80% of the time, and `null` 20% of the time.

```json
{
  "type": "select",
  "options": [
    {
      "weight": 4,
      "generator": {
        "type": "number",
        "minimum": 0,
        "scale": 0
      }
    },
    {
      "weight": 1,
      "generator": {
        "type": "constant",
        "value": null
      }
    }
  ]
}
```
