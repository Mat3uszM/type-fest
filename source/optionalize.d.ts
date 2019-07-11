/**
The sister of `Require` type. Allows you to define one or more keys for a type that should be optional.

Use-case: You want to define a single model where the only thing that changes is
whether or not some of the properties are optional

@example
```
import {Optionalize} from 'type-fest';

type Foo = {
  a: number;
  b?: string;
  c: boolean;
}

type SomeOptional = Optionalize<Foo, 'b' | 'c'>;
// type SomeOptional = {
//   a: number;
//   b?: string; // was already optional, still is
//   c?: boolean; // is now optional
// }
```
*/

export type Optionalize<BaseType, Keys extends keyof BaseType = keyof BaseType> =
Pick<BaseType, Exclude<keyof BaseType, Keys>> &
  Partial<Pick<BaseType, Keys>> extends infer InferredType
  ? { [Property in keyof InferredType]: InferredType[Property] }
  : never;
