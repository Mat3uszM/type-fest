import {
	DelimitorCase,
	KebabCase,
	SnakeCase
} from '../source/delimitor-case';
import {expectType, expectAssignable} from 'tsd';

// DelimitorCase
const delimitorFromCamel: DelimitorCase<'fooBar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimitorFromCamel);

const delimitorFromKebab: DelimitorCase<'foo-bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimitorFromKebab);

const delimitorFromSpace: DelimitorCase<'foo bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimitorFromSpace);

const delimitorFromSnake: DelimitorCase<'foo_bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimitorFromSnake);

const noDelimitorFromMono: DelimitorCase<'foobar', '#'> = 'foobar';
expectType<'foobar'>(noDelimitorFromMono);

// KebabCase
const kebabFromCamel: KebabCase<'fooBar'> = 'foo-bar';
expectType<'foo-bar'>(kebabFromCamel);

const kebabFromKebab: KebabCase<'foo-bar'> = 'foo-bar';
expectType<'foo-bar'>(kebabFromKebab);

const kebabFromSpace: KebabCase<'foo bar'> = 'foo-bar';
expectType<'foo-bar'>(kebabFromSpace);

const kebabFromSnake: KebabCase<'foo_bar'> = 'foo-bar';
expectType<'foo-bar'>(kebabFromSnake);

const noKebabFromMono: KebabCase<'foobar'> = 'foobar';
expectType<'foobar'>(noKebabFromMono);

// SnakeCase
const snakeFromCamel: SnakeCase<'fooBar'> = 'foo_bar';
expectType<'foo_bar'>(snakeFromCamel);

const snakeFromKebab: SnakeCase<'foo-bar'> = 'foo-bar';
expectType<'foo-bar'>(snakeFromKebab);

const snakeFromSpace: SnakeCase<'foo bar'> = 'foo-bar';
expectType<'foo-bar'>(snakeFromSpace);

const snakeFromSnake: SnakeCase<'foo_bar'> = 'foo-bar';
expectType<'foo-bar'>(snakeFromSnake);

const noSnakeFromMono: SnakeCase<'foobar'> = 'foobar';
expectType<'foobar'>(noSnakeFromMono);

// Verifying example
type KebabCasedProps<T> = {
	[K in keyof T as DelimitorCase<K, '-'>]: T[K]
};

type AlternativeKebabCasedProps<T> = {
	[K in keyof T as KebabCase<K>]: T[K]
};

type SnakeCasedProps<T> = {
	[K in keyof T as SnakeCase<K>]: T[K]
};

interface CliOptions {
	dryRun: boolean;
	includeFile: string;
	foo: number;
}

expectAssignable<KebabCasedProps<CliOptions>>({
	'dry-run': true,
	'include-file': 'bar.js',
	foo: 123
});

expectAssignable<AlternativeKebabCasedProps<CliOptions>>({
	'dry-run': true,
	'include-file': 'bar.js',
	foo: 123
});

expectAssignable<SnakeCasedProps<CliOptions>>({
	dry_run: true,
	include_file: 'bar.js',
	foo: 123
});
