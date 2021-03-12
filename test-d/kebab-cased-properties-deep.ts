import {KebabCasedPropertiesDeep} from '../ts41/kebab-cased-properties-deep';
import {expectType} from 'tsd';

declare const foo: KebabCasedPropertiesDeep<{helloWorld: {fooBar: string}}>;
expectType<{'hello-world': {'foo-bar': string}}>(foo);

declare const bar: KebabCasedPropertiesDeep<Set<{fooBar: string}>>;
expectType<Set<{'foo-bar': string}>>(bar);

// Verify Example
interface User {
	userId: number;
	userName: string;
}

interface UserWithFriends {
	userInfo: User;
	userFriends: User[];
}

const result: KebabCasedPropertiesDeep<UserWithFriends> = {
	'user-info': {
		'user-id': 1,
		'user-name': 'Tom'
	},
	'user-friends': [
		{
			'user-id': 2,
			'user-name': 'Jerry'
		},
		{
			'user-id': 3,
			'user-name': 'Spike'
		}
	]
};
expectType<KebabCasedPropertiesDeep<UserWithFriends>>(result);
