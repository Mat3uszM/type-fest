import type {NonRecursiveType, UnionMin, UnionMax, TupleLength, StaticPartOfArray, VariablePartOfArray} from './internal';
import type {IsNever} from './is-never';
import type {UnknownArray} from './unknown-array';

/**
Set the given array to readonly if `IsReadonly` is `true`, otherwise set the given array to normal, then return the result.

@example
```
type ReadonlyArray = readonly string[];
type NormalArray = string[];

type ReadonlyResult = SetArrayAccess<NormalArray, true>;
//=> readonly string[]

type NormalResult = SetArrayAccess<ReadonlyArray, false>;
//=> string[]
```
*/
type SetArrayAccess<T extends UnknownArray, IsReadonly extends boolean> =
	T extends readonly [...infer U] ?
		IsReadonly extends true
			? readonly [...U]
			: [...U]
		: T;

/**
Returns whether the given array `T` is readonly.
*/
type IsArrayReadonly<T extends UnknownArray> = T extends unknown[] ? false : true;

/**
SharedUnionFieldsDeep options.

@see {@link SharedUnionFieldsDeep}
*/
export type SharedUnionFieldsDeepOptions = {
	/**
	Whether to affect the individual elements of arrays and tuples.

	If this option is set to `true` and all of the value in union are arrays or tuples, we will build a minimum possible length array that each element in the array is exist in the union array.

	@default false
 	*/
	recurseIntoArrays?: boolean;
};

/**
Create a type with shared fields from a union of object types, deeply traversing nested structures.

Use the {@link SharedUnionFieldsDeepOptions `Options`} to specify the behavior for arrays.

Use-cases:
- You want a safe object type that each key is exist in the union object.
- You want to focus on the common fields of the union type and don't want to have to care about the other fields.

@example
```
import type {SharedUnionFieldsDeep} from 'type-fest';

type Cat = {
	info: {
		name: string;
		type: 'cat';
		catType: string;
	};
};

type Dog = {
	info: {
		name: string;
		type: 'dog';
		dogType: string;
	};
};

function displayPetInfo(petInfo: (Cat | Dog)['info']) {
	// typeof petInfo =>
	// {
	//     name: string;
	//     type: 'cat';
	//     catType: string; // Needn't care about this field, because it's not a common pet info field.
	// } | {
	//     name: string;
	//     type: 'dog';
	//     dogType: string; // Needn't care about this field, because it's not a common pet info field.
	// }

	// petInfo type is complex and have some needless fields

	console.log('name: ', petInfo.name);
	console.log('type: ', petInfo.type);
}

function displayPetInfo(petInfo: SharedUnionFieldsDeep<Cat | Dog>['info']) {
	// typeof petInfo =>
	// {
	//     name: string;
	//     type: 'cat' | 'dog';
	// }

	// petInfo type is simple and clear

	console.log('name: ', petInfo.name);
	console.log('type: ', petInfo.type);
}
```

@category Object
@category Union
*/
export type SharedUnionFieldsDeep<Union, Options extends SharedUnionFieldsDeepOptions = {recurseIntoArrays: false}> =
	// `Union extends` will convert `Union`
	// to a [distributive conditionaltype](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
	// But this is not what we want, so we need to wrap `Union` with `[]` to prevent it.
	[Union] extends [NonRecursiveType | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>]
		? Union
		: [Union] extends [UnknownArray]
			? Options['recurseIntoArrays'] extends true
				? SetArrayAccess<SharedArrayUnionFieldsDeep<Union, Options>, IsArrayReadonly<Union>>
				: Union
			: [Union] extends [object]
				? SharedObjectUnionFieldsDeep<Union, Options>
				: Union;

/**
Same as `SharedUnionFieldsDeep`, but accepts only `object`s and as inputs. Internal helper for `SharedUnionFieldsDeep`.
*/
type SharedObjectUnionFieldsDeep<Union, Options extends SharedUnionFieldsDeepOptions> =
	keyof Union extends infer Keys
		? IsNever<Keys> extends false
			? {
				[Key in keyof Union]:
				Union[Key] extends NonRecursiveType
					? Union[Key]
					: SharedUnionFieldsDeep<Union[Key], Options>
			}
			: {}
		: Union;

/**
Same as `SharedUnionFieldsDeep`, but accepts only `UnknownArray`s and as inputs. Internal helper for `SharedUnionFieldsDeep`.
*/
type SharedArrayUnionFieldsDeep<Union extends UnknownArray, Options extends SharedUnionFieldsDeepOptions> =
	// Restore the readonly modifier of the array.
	SetArrayAccess<
	InternalSharedArrayUnionFieldsDeep<Union, Options>,
	IsArrayReadonly<Union>
	>;

/**
Internal helper for `SharedArrayUnionFieldsDeep`. Needn't care the `readonly` modifier of arrays.
*/
type InternalSharedArrayUnionFieldsDeep<
	Union extends UnknownArray,
	Options extends SharedUnionFieldsDeepOptions,
	ResultTuple extends UnknownArray = [],
> =
	// We should build a minimum possible length tuple that each element in the tuple is exist in the union tuple.
	IsNever<TupleLength<Union>> extends true
		// Rule 1: If all the arrays in the union have non-fixed lengths,
		// like `Array<string> | [number, ...string[]]`
		// we should build a tuple that is [the_fixed_parts_of_union, ...the_rest_of_union[]].
		// For example: `InternalSharedArrayUnionFieldsDeep<Array<string> | [number, ...string[]]>`
		// => `[string | number, ...string[]]`.
		? ResultTuple['length'] extends UnionMax<StaticPartOfArray<Union>['length']>
			? [
				// The fixed-length part of the tuple.
				...ResultTuple,
				// The rest of the union.
				// Due to `ResultTuple` is the maximum possible fixed-length part of the tuple,
				// so we can use `StaticPartOfArray` to get the rest of the union.
				...Array<
				SharedUnionFieldsDeep<VariablePartOfArray<Union>[number], Options>
				>,
			]
			// Build the fixed-length tuple recursively.
			: InternalSharedArrayUnionFieldsDeep<
			Union, Options,
			[...ResultTuple, SharedUnionFieldsDeep<Union[ResultTuple['length']], Options>]
			>
		// Rule 2: If at least one of the arrays in the union have fixed lengths,
		// like `Array<string> | [number, string]`,
		// we should build a tuple of the smallest possible length to ensure any
		// item in the result tuple is exist in the union tuple.
		// For example: `InternalSharedArrayUnionFieldsDeep<Array<string> | [number, string]>`
		// => `[string | number, string]`.
		: ResultTuple['length'] extends UnionMin<TupleLength<Union>>
			? ResultTuple
			// As above, build tuple recursively.
			: InternalSharedArrayUnionFieldsDeep<
			Union, Options,
			[...ResultTuple, SharedUnionFieldsDeep<Union[ResultTuple['length']], Options>]
			>;
