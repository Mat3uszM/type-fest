/**
Returns a boolean for whether the given type is `never`.

@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
@link https://stackoverflow.com/a/53984913/10292952

@example
```
import type {IsNever} from 'type-fest';

```

@category Utilities
*/
export type IsNever<T> = [T] extends [never] ? true : false;
