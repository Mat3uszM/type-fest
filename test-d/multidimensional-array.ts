import {expectType} from 'tsd';
import {MultidimensionalArray} from '../index';

function createArray<T extends number>(dimensions: T): MultidimensionalArray<unknown, T> {
	const root: unknown[] = [];

	let array = root;
	for (let i = 1; i < dimensions; ++i) {
		array[0] = [];
		array = array[0] as unknown[];
	}

	return root as MultidimensionalArray<unknown, T>;
}

const a: MultidimensionalArray<number, 3> = [];
const b: MultidimensionalArray<boolean, number> = [];
const c = createArray(2);
const d = createArray(7);

a[0][0][0] = 42;

type RecursiveArray<T> = Array<RecursiveArray<T>>;

expectType<number[][][]>(a);
expectType<RecursiveArray<boolean>>(b);
expectType<unknown[][]>(c);
expectType<unknown[][][][][][][]>(d);
