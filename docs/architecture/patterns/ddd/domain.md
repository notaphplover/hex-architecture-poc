# DDD Domain patterns used

## Structural

Business logic related models are included in this layer. Several patterns are used for modeling purposes. It's crucial to come with the right models in order to represent the right abstraction of the business model

### Entity

An object defined primarily by its identity and continuity. They often have continuity through a life cycle and distinctions independent of attributes that are important to the application.

Quoting Eric Evans:

"Some objects are not defined primarily by their atributes. They represents a thread of identity that runs through time and often across distinct representations. Sometimes such an object must be matched with another object even though attributes differ. An object must be distinghised from other objects even though they might have the same attributes. Mistaken identity can lead to data corruption."

### Value objects 

An object that represents a descriptive aspect of the domain with no conceptual identity. They represent elements of the design that we care about only for what they are, not who or which are.

Value objects can be an assemblage for other objects and even reference entities.

### Aggregates

Quoting Eric Evans:

"A cluster of associated objects we treat as a unit for the purpose of data changes. Each aggregate has a root and a boundary. The boundary defines what is inside the aggregate. The root is a single, specific entity contained in the aggregate. The root is the only member of the aggregate that outside objects are allowed to hold references to, although objects within the boundary may hold references to each other. Entities other than the root have local identity, but that identity needs to be distinguishable only whitin the aggregate, because no outside object can ever see it out of the context of the root entity".

## Behavioral

### Services

A service is an operation offered as an interface that stands alone in the model, without encapsulating state. It's defined in terms of what it can do for the client.

## Other

### Repositories

We won't be using repositories in favor of [driven ports](../hex.md). We want to design pieces with small responsibilities in order to easily understand, test, maintain and review them. Repositories often have many responsibilities, the responsibility of managing entities is too big (creating, updating, deleting and searching operations are hidden among any others in the "entity management" responsibility).
