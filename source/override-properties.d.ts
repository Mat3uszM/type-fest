import type {Merge} from './merge';

/**
Override existing properties of the given type. Similar to `Merge`, but enforces that the original type has the properties you want to override.

This is useful when you want to override existing properties with a different type and make sure that these properties really exist in the original.

@example
```
type Foo = {
	a: string
	b: string
}
type Bar = OverrideProperties<Foo, {b: number}>
//=> {a: string, b: number}

type Baz = OverrideProperties<Foo, {c: number}>
// Error, type '{ c: number; }' does not satisfy the constraint '{ c: never; }'

type Fizz = OverrideProperties<Foo, {b: number; c: number}>
// Error, type '{ b: number; c: number; }' does not satisfy the constraint '{ b: number; c: never; }'
```

@category Object
*/
export type OverrideProperties<
	TOriginal,
	TOverride extends {[K in keyof TOverride]: K extends keyof TOriginal ? TOverride[K] : never},
> = Merge<TOriginal, TOverride>;
