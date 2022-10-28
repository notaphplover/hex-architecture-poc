import { SqlParameter, SqlQuerySpec } from '@azure/cosmos';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { BaseMultipleFilter } from '../models/BaseMultipleFilter';
import { BaseMultipleValueFilter } from '../models/BaseMultipleValueFilter';
import { EntityDb } from '../models/EntityDb';
import { Filter } from '../models/Filter';
import { FilterKind } from '../models/FilterKind';
import { FindQuery } from '../models/FindQuery';
import { FindQueryPaginationOptions } from '../models/FindQueryPaginationOptions';
import { IntersectionFilter } from '../models/IntersectionFilter';
import { IntersectionValueFilter } from '../models/IntersectionValueFilter';
import { InValueFilter } from '../models/InValueFilter';
import { MapKey } from '../models/MapKey';
import { MultipleFilter } from '../models/MultipleFilter';
import { MultipleValueFilter } from '../models/MultipleValueFilter';
import { NegationFilter } from '../models/NegationFilter';
import { NegationValueFilter } from '../models/NegationValueFilter';
import { SingleFilter } from '../models/SingleFilter';
import { UnionFilter } from '../models/UnionFilter';
import { UnionValueFilter } from '../models/UnionValueFilter';
import { ValueFilter } from '../models/ValueFilter';
import { ValueFilterKind } from '../models/ValueFilterKind';

interface SqlQuerySpecWhereClauseGenerationResult {
  whereClause: string;
  parameters: SqlParameter[];
}

@Injectable()
export class CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter<
  TEntity extends EntityDb<MapKey>,
> implements Converter<FindQuery<TEntity>, SqlQuerySpec>
{
  readonly #collectionName: string;

  constructor(collectionName: string) {
    this.#collectionName = collectionName;
  }

  public convert(findQuery: FindQuery<TEntity>): SqlQuerySpec {
    const whereClauseGenerationResult: SqlQuerySpecWhereClauseGenerationResult =
      this.#getWhereClause(findQuery.filters);

    return {
      parameters: whereClauseGenerationResult.parameters,
      query: `${this.#getSelectClause()} ${this.#getFromClause()} ${
        whereClauseGenerationResult.whereClause
      } ${this.#getOffsetLimitClause(findQuery.paginationOptions)}`,
    };
  }

  #buildParameterGenerator(): () => string {
    let parameterCount: number = 0;
    const parameterGenerator: () => string = () => `p${parameterCount++}`;

    return parameterGenerator;
  }

  #getSelectClause(): string {
    return 'SELECT *';
  }

  #getFromClause(): string {
    return `FROM ${this.#collectionName}`;
  }

  #getWhereClause(
    filter: Filter<TEntity>,
  ): SqlQuerySpecWhereClauseGenerationResult {
    const parameterGenerator: () => string = this.#buildParameterGenerator();

    const [whereClause, parameters]: [string, SqlParameter[]] =
      this.#getWhereClauseFromFilter('c', filter, parameterGenerator);

    const sqlQuerySpecWhereClauseGenerationProgress: SqlQuerySpecWhereClauseGenerationResult =
      {
        parameters: parameters,
        whereClause: whereClause.length === 0 ? '' : `WHERE ${whereClause}`,
      };

    return sqlQuerySpecWhereClauseGenerationProgress;
  }

  #getWhereClauseFromFilter(
    baseAlias: string,
    filter: Filter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    return this.#isMultipleFilter(filter)
      ? this.#getWhereClauseFromMultipleFilter(
          baseAlias,
          filter,
          parameterGenerator,
        )
      : this.#getWhereClauseFromSingleFilter(
          baseAlias,
          filter,
          parameterGenerator,
        );
  }

  #getWhereClauseFromMultipleFilter(
    baseAlias: string,
    multipleFilter: MultipleFilter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    let result: [string, SqlParameter[]];

    switch (multipleFilter.kind) {
      case FilterKind.intersection:
        result = this.#getWhereClauseFromIntersectionFilter(
          baseAlias,
          multipleFilter,
          parameterGenerator,
        );
        break;
      case FilterKind.negation:
        result = this.#getWhereClauseFromNegationFilter(
          baseAlias,
          multipleFilter,
          parameterGenerator,
        );
        break;
      case FilterKind.union:
        result = this.#getWhereClauseFromUnionFilter(
          baseAlias,
          multipleFilter,
          parameterGenerator,
        );
        break;
    }

    return result;
  }

  #baseGetWhereClauseFromMultipleFilter<
    TMultipleFilter extends BaseMultipleFilter<FilterKind, TEntity>,
  >(
    baseAlias: string,
    multipleFilter: TMultipleFilter,
    parameterGenerator: () => string,
    whereClauseFragmentsSeparator: string,
  ): [string, SqlParameter[]] {
    const whereClauseFragments: string[] = [];
    const parameters: SqlParameter[] = [];

    for (const valueFilter of multipleFilter.filters) {
      const [whereClauseFragment, parametersFromFilter]: [
        string,
        SqlParameter[],
      ] = this.#getWhereClauseFromFilter(
        baseAlias,
        valueFilter,
        parameterGenerator,
      );

      whereClauseFragments.push(whereClauseFragment);
      parameters.push(...parametersFromFilter);
    }

    let whereClauseFragment: string;

    if (whereClauseFragments.length === 0) {
      whereClauseFragment = '';
    } else {
      whereClauseFragment = `(${whereClauseFragments.join(
        whereClauseFragmentsSeparator,
      )})`;
    }

    return [whereClauseFragment, parameters];
  }

  #getWhereClauseFromIntersectionFilter(
    baseAlias: string,
    multipleFilter: IntersectionFilter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    return this.#baseGetWhereClauseFromMultipleFilter(
      baseAlias,
      multipleFilter,
      parameterGenerator,
      ' AND ',
    );
  }

  #getWhereClauseFromNegationFilter(
    baseAlias: string,
    negationFilter: NegationFilter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    const [whereClauseFragment, parameters]: [string, SqlParameter[]] =
      this.#getWhereClauseFromFilter(
        baseAlias,
        negationFilter.filter,
        parameterGenerator,
      );

    const notWhereClauseFragment: string =
      whereClauseFragment.length === 0 ? '' : `NOT (${whereClauseFragment})`;

    return [notWhereClauseFragment, parameters];
  }

  #getWhereClauseFromUnionFilter(
    baseAlias: string,
    multipleFilter: UnionFilter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    return this.#baseGetWhereClauseFromMultipleFilter(
      baseAlias,
      multipleFilter,
      parameterGenerator,
      ' OR ',
    );
  }

  #getWhereClauseFromSingleFilter(
    baseAlias: string,
    singleFilter: SingleFilter<TEntity>,
    parameterGenerator: () => string,
  ): [string, SqlParameter[]] {
    const whereClauseFragments: string[] = [];
    const parameters: SqlParameter[] = [];

    for (const key in singleFilter) {
      if (Object.prototype.hasOwnProperty.call(singleFilter, key)) {
        const valueFilter: ValueFilter<unknown> = singleFilter[key];

        const [whereClauseFragment, parametersFromValueFilter]: [
          string,
          SqlParameter[],
        ] = this.#valueFilterToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          valueFilter,
        );

        whereClauseFragments.push(whereClauseFragment);
        parameters.push(...parametersFromValueFilter);
      }
    }

    let whereClauseFragment: string;

    if (whereClauseFragments.length > 0) {
      whereClauseFragment = `(${whereClauseFragments.join(' AND ')})`;
    } else {
      whereClauseFragment = '';
    }

    return [whereClauseFragment, parameters];
  }

  #getOffsetLimitClause(
    paginationOptions: FindQueryPaginationOptions | undefined,
  ) {
    let clause: string = '';

    if (paginationOptions !== undefined) {
      if (paginationOptions.offset !== undefined) {
        clause += `OFFSET ${paginationOptions.offset} `;
      }
      if (paginationOptions.limit !== undefined) {
        clause += `LIMIT ${paginationOptions.limit} `;
      }
    }

    return clause;
  }

  #isMultipleFilter<T>(value: Filter<T>): value is MultipleFilter<T> {
    return Object.values(FilterKind).includes(
      (value as MultipleFilter<T>).kind,
    );
  }

  #isMultipleValueFilter<T>(
    value: ValueFilter<T>,
  ): value is MultipleValueFilter<T> {
    return Object.values(ValueFilterKind).includes(
      (value as MultipleValueFilter<T>).kind,
    );
  }

  #isNotValueFilter<T>(value: ValueFilter<T>): value is NegationValueFilter<T> {
    return Object.values(ValueFilterKind).includes(
      (value as NegationValueFilter<T>).kind,
    );
  }

  #multipleValueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    multipleValueFilter: MultipleValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    let result: [string, SqlParameter[]];

    switch (multipleValueFilter.kind) {
      case ValueFilterKind.in:
        result = this.#inValueFilterToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          multipleValueFilter,
        );
        break;
      case ValueFilterKind.intersection:
        result = this.#intersectionValueFilterToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          multipleValueFilter,
        );
        break;
      case ValueFilterKind.union:
        result = this.#unionValueFilterToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          multipleValueFilter,
        );
        break;
    }

    return result;
  }

  #notValueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    notValueFilter: NegationValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    const [whereClauseFragment, parameters]: [string, SqlParameter[]] =
      this.#valueFilterToWhereClauseFragmentAndParameter(
        baseAlias,
        key,
        parameterGenerator,
        notValueFilter.filter,
      );

    const notWhereClauseFragment: string =
      whereClauseFragment.length === 0 ? '' : `NOT (${whereClauseFragment})`;

    return [notWhereClauseFragment, parameters];
  }

  #inValueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    inValueFilter: InValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    const keyAlias: string = `${baseAlias}.${key}`;

    const parameterName: string = parameterGenerator();
    const parameterValue: string = `[${inValueFilter.filters
      .map((value: NonNullable<unknown>) =>
        this.#valueFilterToStringValue(value),
      )
      .join(',')}]`;

    return [
      `ARRAY_CONTAINS(${parameterName}, ${keyAlias})`,
      [
        {
          name: parameterName,
          value: parameterValue,
        },
      ],
    ];
  }

  #baseMultipleValueFilterToWhereClauseFragmentAndParameter<
    TMultipleValueFilter extends BaseMultipleValueFilter<
      ValueFilterKind,
      unknown
    >,
  >(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    multipleValueFilter: TMultipleValueFilter,
    whereClauseFragmentsSeparator: string,
  ): [string, SqlParameter[]] {
    const whereClauseFragments: string[] = [];
    const parameters: SqlParameter[] = [];

    for (const valueFilter of multipleValueFilter.filters) {
      const [whereClauseFragment, parametersFromIntersectionValueFilter]: [
        string,
        SqlParameter[],
      ] = this.#valueFilterToWhereClauseFragmentAndParameter(
        baseAlias,
        key,
        parameterGenerator,
        valueFilter,
      );

      whereClauseFragments.push(whereClauseFragment);
      parameters.push(...parametersFromIntersectionValueFilter);
    }

    let whereClauseFragment: string;

    if (whereClauseFragments.length === 0) {
      whereClauseFragment = '';
    } else {
      whereClauseFragment = `(${whereClauseFragments.join(
        whereClauseFragmentsSeparator,
      )})`;
    }

    return [whereClauseFragment, parameters];
  }

  #intersectionValueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    intersectionValueFilter: IntersectionValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    return this.#baseMultipleValueFilterToWhereClauseFragmentAndParameter(
      baseAlias,
      key,
      parameterGenerator,
      intersectionValueFilter,
      ' AND ',
    );
  }

  #unionValueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    intersectionValueFilter: UnionValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    return this.#baseMultipleValueFilterToWhereClauseFragmentAndParameter(
      baseAlias,
      key,
      parameterGenerator,
      intersectionValueFilter,
      ' OR ',
    );
  }

  #valueToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    valueFilter: unknown,
  ): [string, SqlParameter | undefined] {
    let whereClauseFragment: string;
    let sqlParameter: SqlParameter | undefined = undefined;

    const keyAlias: string = `${baseAlias}.${key}`;

    if (valueFilter === undefined) {
      whereClauseFragment = `NOT IS_DEFINED(${keyAlias})`;
    } else {
      if (valueFilter === null) {
        whereClauseFragment = `IS_NULL(${keyAlias})`;
      } else {
        const parameterName: string = parameterGenerator();
        const parameterValue: string =
          this.#valueFilterToStringValue(valueFilter);

        whereClauseFragment = `${keyAlias} = ${parameterName}`;
        sqlParameter = {
          name: parameterName,
          value: parameterValue,
        };
      }
    }

    return [whereClauseFragment, sqlParameter];
  }

  #valueFilterToWhereClauseFragmentAndParameter(
    baseAlias: string,
    key: string,
    parameterGenerator: () => string,
    valueFilter: ValueFilter<unknown>,
  ): [string, SqlParameter[]] {
    let whereClauseFragment: string;
    let parameters: SqlParameter[];

    if (this.#isMultipleValueFilter(valueFilter)) {
      [whereClauseFragment, parameters] =
        this.#multipleValueFilterToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          valueFilter,
        );
    } else {
      if (this.#isNotValueFilter(valueFilter)) {
        [whereClauseFragment, parameters] =
          this.#notValueFilterToWhereClauseFragmentAndParameter(
            baseAlias,
            key,
            parameterGenerator,
            valueFilter,
          );
      } else {
        const [whereClauseFragmentFromValue, parameter]: [
          string,
          SqlParameter | undefined,
        ] = this.#valueToWhereClauseFragmentAndParameter(
          baseAlias,
          key,
          parameterGenerator,
          valueFilter,
        );

        whereClauseFragment = whereClauseFragmentFromValue;
        parameters = [];

        if (parameter !== undefined) {
          parameters.push(parameter);
        }
      }
    }

    return [whereClauseFragment, parameters];
  }

  #valueFilterToStringValue(
    valueFilter: NonNullable<ValueFilter<unknown>>,
  ): string {
    let parameterValue: string;

    if (typeof valueFilter === 'number') {
      parameterValue = `${valueFilter}`;
    } else {
      const stringifiedValueFilter: string = valueFilter.toString();
      parameterValue = `'${stringifiedValueFilter}'`;
    }

    return parameterValue;
  }
}
