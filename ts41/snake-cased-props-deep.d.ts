import {DelimiterCasedPropsDeep} from './delimiter-cased-props-deep';

/**
Convert object props to snake_case recursively.

This can be useful when, for example, converting some API types from other style.

@see SnakeCase
@see SnakeCasedProps
@example
```
interface User {
	userId: number;
	userName: string;
}

interface UserWithFriends {
	userInfo: User;
	userFriends: User[];
}

const result: SnakeCasedPropsDeep<UserWithFriends> = {
	user_info: {
		user_id: 1,
		user_name: "Tom",
	},
	user_friends: [
		{
			user_id: 2,
			user_name: "Jerry",
		},
		{
			user_id: 3,
			user_name: "Spike",
		},
	],
};

*/
export type SnakeCasedPropsDeep<T> = DelimiterCasedPropsDeep<T, '_'>;
