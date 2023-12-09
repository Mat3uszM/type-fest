import {expectType} from 'tsd';
import type {Lt} from '../../source/internal';
import type {NegativeInfinity, PositiveInfinity} from '../../source/numeric';

expectType<Lt<1, 2>>(true);
expectType<Lt<2, 1>>(false);
expectType<Lt<10, 2>>(false);
expectType<Lt<10, -2>>(false);
expectType<Lt<2, 2>>(false);
expectType<Lt<-2, -2>>(false);
expectType<Lt<-2, -3>>(false);
expectType<Lt<PositiveInfinity, -999>>(false);
expectType<Lt<PositiveInfinity, 999>>(false);
expectType<Lt<999, PositiveInfinity>>(true);
expectType<Lt<999, NegativeInfinity>>(false);
expectType<Lt<-999, NegativeInfinity>>(false);
expectType<Lt<PositiveInfinity, PositiveInfinity>>(false);
expectType<Lt<NegativeInfinity, NegativeInfinity>>(false);
expectType<Lt<PositiveInfinity, NegativeInfinity>>(false);
