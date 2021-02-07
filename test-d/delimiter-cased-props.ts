import {expectType} from 'tsd';
import {DelimiterCasedProperties} from '../ts41/delimiter-cased-props';

declare const foo: DelimiterCasedProperties<{ helloWorld: { fooBar: string } }, '/'>;
expectType<{ 'hello/world': { fooBar: string } }>(foo);

// Verify Example
interface User {
	userId: number;
	userName: string;
}
const result: DelimiterCasedProperties<User, '-'> = {
	'user-id': 1,
	'user-name': 'Tom'
};
expectType<DelimiterCasedProperties<User, '-'>>(result);
