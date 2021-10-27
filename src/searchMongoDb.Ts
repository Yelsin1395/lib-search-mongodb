function searcher(filter: any, condition: any) {
  const skip = filter.skip;
  const take = filter.take;
  const buildArraySearch = [];

  function _conditionValue(value: any) {
    if (value && (value === 'true' || value === 'false')) {
      return value === 'true';
    } else {
      return value;
    }
  }

  for (const key in filter) {
    if (key !== 'skip' && key !== 'take') {
      buildArraySearch.push({
        nameSchema: !condition[key] ? null : condition[key].nameSchema,
        alias: key,
        op: Object.keys(filter[key])[0],
        type: !condition[key] ? null : condition[key].typeSearch,
        value: _conditionValue(Object.values(filter[key])[0]),
      });
    }
  }

  return { skip, take, filter: buildArraySearch };
}

function buildConditionsSearch(array: any[]) {
  const buildConditions: any = {};

  for (const e of array) {
    buildConditions[e[0]] = { nameSchema: e[1], typeSearch: e[2] };
  }

  return buildConditions;
}

function queryFilterType(op: string): string {
  const filterType: any = {
    ct: 'contains',
    eq: 'equal',
    lt: 'lessThan',
    lte: 'lessThanOrEqualTo',
    gt: 'greaterThan',
    gte: 'greaterThanOrEqualTo',
  };

  return filterType[op];
}

function buildSearch(filter: any): any[] {
  const findBuildQuery: any[] = [];

  for (const item of filter) {
    const findObjectValue: any = {
      contains: { $regex: item.value, $options: 'i' },
      equal: { $eq: item.value },
      lt: { $lt: item.value },
      lte: { $lte: item.value },
      gt: { $gt: item.value },
      gte: { $gte: item.value },
    };

    if (item.value !== undefined && item.value !== null) {
      if (item.type === queryFilterType(item.op)) {
        findBuildQuery.push({ [item.nameSchema]: findObjectValue[item.type] });
      }
    }
  }

  return findBuildQuery.length === 0 ? [{}] : findBuildQuery;
}

export { searcher, buildConditionsSearch, queryFilterType, buildSearch };
