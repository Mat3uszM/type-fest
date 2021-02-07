import {CamelCase} from './camel-case';

/**
Convert object props to camelCase recursively.

This can be useful when, for example, converting some API types from other style.

@see CamelCasedProperties
@see CamelCase
@example
```
interface User {
    UserId: number;
    UserName: string;
}

interface UserWithFriends {
    UserInfo: User;
    UserFriends: User[];
}

const result: CamelCasedPropertiesDeep<UserWithFriends> = {
    userInfo: {
        userId: 1,
        userName: "Tom",
    },
    userFriends: [
        {
            userId: 2,
            userName: "Jerry",
        },
        {
            userId: 3,
            userName: "Spike",
        },
    ],
};

```
*/
export type CamelCasedPropertiesDeep<T> = T extends Array<infer U>
	? Array<CamelCasedPropertiesDeep<U>>
	: {
			[K in keyof T as CamelCase<K>]: CamelCasedPropertiesDeep<T[K]>;
	};
