import {KebabCasedPropertiesDeep} from '../ts41/kebab-cased-props-deep';
import {expectType} from 'tsd';

declare const foo: KebabCasedPropertiesDeep<{helloWorld: {fooBar: string}}>;
expectType<{'hello-world': {'foo-bar': string}}>(foo);

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
