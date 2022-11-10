# Custom patterns

## Controller

A controller is an **application** (or **ifrastructure**) module which handles a request and returns a response.

## Converters

A converter receives an input model and returns an output model.

Some converters requires a context for accomplish such conversion tasks.

Maybe more universal patterns such as `Builder` and `Factory` instead.

## Rule validator

A rule validator is a **domain** module which receives an arbitrary amount of parameters and determines if those a compliant with a certain **business rule**.

## Use case

A use case is an **application** module which receives a query and handles its use case, returning an output.
