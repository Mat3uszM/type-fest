import { IsEqual } from "./internal";
import { MergeExclusive } from "./merge-exclusive";

type ReplaceOptions = MergeExclusive<{all: boolean}, {recursive: boolean}>;

/**
Represents a string with some or all matches replaced by a replacement.

Use-case:
- `snake-case-path` to `dotted.path.notation`
- Changing date/time format: `01-08-2042` → `01/08/2042`
- Manipulation of type properties, for example, removal of prefixes

@example
```
import {Replace} from 'type-fest';

declare function replace<
	Input extends string,
	Search extends string,
	Replacement extends string
>(
	input: Input,
	search: Search,
	replacement: Replacement
): Replace<Input, Search, Replacement>;

declare function replaceAll<
	Input extends string,
	Search extends string,
	Replacement extends string
>(
	input: Input,
	search: Search,
	replacement: Replacement
): Replace<Input, Search, Replacement, {all: true}>;

declare function replaceRecursively<
	Input extends string,
	Search extends string,
	Replacement extends string
>(
	input: Input,
	search: Search,
	replacement: Replacement
): Replace<Input, Search, Replacement, {recursive: true}>;

// The return type is the exact string literal, not just `string`.

replace('hello ?', '?', '🦄');
//=> 'hello 🦄'

replace('hello ??', '?', '❓');
//=> 'hello ❓?'

replaceAll('10:42:00', ':', '-');
//=> '10-42-00'

replaceAll('__userName__', '__', '');
//=> 'userName'

replaceAll('My Cool Title', ' ', '');
//=> 'MyCoolTitle'

replaceAll('foobarfoobar', 'ob', 'b');
//=> 'fobarfobar'

replaceRecursively('foobarfoobar', 'ob', 'b');
//=> 'fbarfbar'
```

@category String
@category Template literal
*/
export type Replace<
	Input extends string,
	Search extends string,
	Replacement extends string,
	Options extends ReplaceOptions = {},
> = Input extends `${infer Head}${Search}${infer Tail}`
	? Options["recursive"] extends true
		? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement, Options>
		: Options["all"] extends true
		? `${Head}${Replacement}${Replace<Tail, Search, Replacement, Options>}`
		: `${Head}${Replacement}${Tail}`
	: Input;
