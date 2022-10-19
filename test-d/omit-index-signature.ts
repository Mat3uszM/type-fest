import {expectTypeOf} from 'expect-type';
import type {OmitIndexSignature} from '../index';

type ExampleInterface = {
	// These index signatures will be removed.
	[x: string]: any;
	[x: number]: any;
	[x: symbol]: any;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will remain.
	foo: 'bar';
	qux?: 'baz';
};

type MappedType<ObjectType> = {
	[Key in keyof ObjectType]: {
		key: Key;
		value: Exclude<ObjectType[Key], undefined>;
	};
};

declare const exampleInterfaceKnownKeys: OmitIndexSignature<ExampleInterface>;
expectTypeOf(exampleInterfaceKnownKeys).toEqualTypeOf<{
	foo: 'bar';
	qux?: 'baz';
}>();

declare const exampleMappedTypeKnownKeys: OmitIndexSignature<
MappedType<ExampleInterface>
>;
expectTypeOf(exampleMappedTypeKnownKeys).toEqualTypeOf<{
	foo: {key: 'foo'; value: 'bar'};
	qux?: {key: 'qux'; value: 'baz'};
}>();
