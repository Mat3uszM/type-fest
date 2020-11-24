import {WordSeparators} from './delimiter-case';

/**
Recursively splits a string literal into two parts on the first occurence
of a specified string, returning an array literal of all the separate parts
*/
export type Split<S extends string, D extends string> =
	string extends S ? string[] :
	S extends '' ? [] :
	S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
	[S];

/**
Step by step takes the first item in an array literal, formats it and adds it
to a string literal, then recursively appending the remainder.
*/
type InnerCamelCaseStringArray<Parts extends any[], PreviousPart> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? FirstPart extends undefined
			? ''
			: FirstPart extends ''
					? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
					: `${PreviousPart extends '' ? FirstPart : Capitalize<FirstPart>}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
		: '';

/**
Starts the concatenating the output of Split<>, an array literal of strings, into a camel cased string literal.

Separate from InnerCamelCaseStringArray<> to keep a clean API outwards to the rest of the code
*/
type CamelCaseStringArray<Parts extends string[]> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`>
		: never;

/**
Converts a string literal to camel-case.

This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result.

@example
```
import {CamelCase} from 'type-fest';

// Simple

const someVariable: CamelCase<'foo-bar'> = 'fooBar';

// Advanced

type CamelCasedProps<T> = {
	[K in keyof T as CamelCase<K>]: T[K]
};

interface RawOptions {
	'dry-run': boolean;
	'full_family_name': string;
	foo: number;
}

const dbResult: CamelCasedProps<ModelProps> = {
	dryRun: true,
	fullFamilyName: 'bar.js',
	foo: 123
};
```
*/
export type CamelCase<K> = K extends string ? CamelCaseStringArray<Split<K, WordSeparators>> : K;
