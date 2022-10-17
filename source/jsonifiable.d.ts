import type {JsonPrimitive, JsonValue} from './basic';

type JsonifiablePrimitive = JsonPrimitive | {toJSON: () => JsonValue};
type JsonifiableObject = {[Key in string]?: Jsonifiable};
type JsonifiableArray = Jsonifiable[];

/**
Matches a value that can be losslessly converted to JSON.

`undefined` is allowed in object fields (ex: `{a?: number}`) as a
special case even though `JSON.stringify({a: undefined})` is `{}`.

@example
```
import type {Jsonifiable} from 'type-fest';

// @ts-expect-error
const error: Jsonifiable = {
    map: new Map([["a", 1]]),
};
JSON.stringify(error); // {"map": {}}

const good: Jsonifiable = {
    number: 3,
    date: new Date(),
    missing: undefined,
}
JSON.stringify(good); // {"number": 3, "date": "2022-10-17T22:22:35.920Z"}
```

@category JSON
*/
export type Jsonifiable = JsonifiablePrimitive | JsonifiableObject | JsonifiableArray;
