/**
 * Generates a tuple based on the length of the input array
 * and fills each index with the index number.
 *
 * @example type FruitIndices = IndexOf<['apple', 'banana', 'plum']> // [0, 1, 2]
 * @example type FruitIndex = IndexOf<['apple', 'banana', 'plum']>[number] // 0 | 1 | 2
 *
 * @category Array
 * @category Utility
 */
export type IndexOf<
	Tuple extends any[] | readonly any[],
	Accumulator extends any[] = [],
> = LengthOf<Accumulator> extends Tuple['length']
	? Accumulator
	: IndexOf<Tuple, [...Accumulator, Accumulator['length']]>;

/**
 * Returns the length property of the input array; tuples will return the number of items in the tuple.
 *
 * @example type TotalFruits = LengthOf<['apple', 'banana', 'plum']> // 3
 * @example type TotalStrings = LengthOf<string[]> // number
 */
type LengthOf<Tuple extends any[] | readonly any[]> = Tuple['length'];
