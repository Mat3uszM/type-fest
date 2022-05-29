import {expectTypeOf} from 'expect-type';
import {RequiredDeep} from '../index';

interface Foo {
	baz?: string | undefined;
	bar?: {
		function?: ((...args: any[]) => void) | undefined;
		object?: {key?: 'value'} | undefined;
		string?: string | undefined;
		number?: number | undefined;
		boolean?: false | undefined;
		date?: Date | undefined;
		regexp?: RegExp | undefined;
		symbol?: Symbol | undefined;
		null?: null | undefined;
		undefined?: undefined;
		map?: Map<string | undefined, string | undefined>;
		set?: Set<string | undefined>;
		array?: (string | undefined)[];
		tuple?: ['foo' | undefined] | undefined;
		readonlyMap?: ReadonlyMap<string | undefined, string | undefined>;
		readonlySet?: ReadonlySet<string | undefined>;
		readonlyArray?: readonly (string | undefined)[];
		readonlyTuple?: readonly ['foo' | undefined] | undefined;
	};
}

interface FooRequired {
	baz: string;
	bar: {
		function: (...args: any[]) => void;
		object: {key: 'value'};
		string: string;
		number: number;
		boolean: false;
		date: Date;
		regexp: RegExp;
		symbol: Symbol;
		null: null;
		undefined: never;
		map: Map<string, string>;
		set: Set<string>;
		array: string[];
		tuple: ['foo'];
		readonlyMap: ReadonlyMap<string, string>;
		readonlySet: ReadonlySet<string>;
		readonlyArray: readonly string[];
		readonlyTuple: readonly ['foo'];
	};
}

type FooBar = Exclude<Foo['bar'], undefined>;
type FooRequiredBar = FooRequired['bar'];

expectTypeOf<RequiredDeep<Foo>>().toEqualTypeOf<FooRequired>();
expectTypeOf<RequiredDeep<FooBar['function']>>().toEqualTypeOf<FooRequiredBar['function']>();
expectTypeOf<RequiredDeep<FooBar['object']>>().toEqualTypeOf<FooRequiredBar['object']>();
expectTypeOf<RequiredDeep<FooBar['string']>>().toEqualTypeOf<FooRequiredBar['string']>();
expectTypeOf<RequiredDeep<FooBar['number']>>().toEqualTypeOf<FooRequiredBar['number']>();
expectTypeOf<RequiredDeep<FooBar['boolean']>>().toEqualTypeOf<FooRequiredBar['boolean']>();
expectTypeOf<RequiredDeep<FooBar['date']>>().toEqualTypeOf<FooRequiredBar['date']>();
expectTypeOf<RequiredDeep<FooBar['regexp']>>().toEqualTypeOf<FooRequiredBar['regexp']>();
expectTypeOf<RequiredDeep<FooBar['map']>>().toEqualTypeOf<FooRequiredBar['map']>();
expectTypeOf<RequiredDeep<FooBar['set']>>().toEqualTypeOf<FooRequiredBar['set']>();
expectTypeOf<RequiredDeep<FooBar['array']>>().toEqualTypeOf<FooRequiredBar['array']>();
expectTypeOf<RequiredDeep<FooBar['tuple']>>().toEqualTypeOf<FooRequiredBar['tuple']>();
expectTypeOf<RequiredDeep<FooBar['readonlyMap']>>().toEqualTypeOf<FooRequiredBar['readonlyMap']>();
expectTypeOf<RequiredDeep<FooBar['readonlySet']>>().toEqualTypeOf<FooRequiredBar['readonlySet']>();
expectTypeOf<RequiredDeep<FooBar['readonlyArray']>>().toEqualTypeOf<FooRequiredBar['readonlyArray']>();
expectTypeOf<RequiredDeep<FooBar['readonlyTuple']>>().toEqualTypeOf<FooRequiredBar['readonlyTuple']>();
expectTypeOf<RequiredDeep<FooBar['undefined']>>().toBeNever();
expectTypeOf<RequiredDeep<FooBar['null']>>().toEqualTypeOf<FooRequiredBar['null']>();
