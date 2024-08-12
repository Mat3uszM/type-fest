import {expectType} from 'tsd';
import type {SetRequiredDeep} from '../index';

// Update an optional nested key to required.
declare const variation1: SetRequiredDeep<{a?: number; b?: {c?: string}}, 'b.c'>;
expectType<{a?: number; b: {c: string}}>(variation1);

// Update a root key to required.
declare const variation2: SetRequiredDeep<{a?: number; b?: {c?: string}}, 'a'>;
expectType<{a: number; b?: {c?: string}}>(variation2);

// Keeps required key as required
declare const variation3: SetRequiredDeep<{a: number; b?: {c?: string}}, 'a'>;
expectType<{a: number; b?: {c?: string}}>(variation3);

// Update optional keys to required in a union.
declare const variation4: SetRequiredDeep<{a?: '1'; b?: {c?: boolean}} | {a?: '2'; b?: {c?: boolean}}, 'a' | 'b.c'>;
expectType<{a: '1'; b: {c: boolean}} | {a: '2'; b: {c: boolean}}>(variation4);
