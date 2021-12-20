/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { VisToExpressionAst } from '../../../src/plugins/visualizations/public';
import {
  buildExpression,
  buildExpressionFunction,
} from '../../../src/plugins/expressions/public';
import {
  SelfChangingVisExpressionFunctionDefinition,
  SelfChangingVisParams,
} from './self_changing_vis_fn';
import { EsaggsExpressionFunctionDefinition, IndexPatternLoadExpressionFunctionDefinition } from 'src/plugins/data/public';

export const toExpressionAst: VisToExpressionAst<SelfChangingVisParams> = (vis) => {
  const { counter } = vis.params;

/*   const esaggs = buildExpressionFunction<EsaggsExpressionFunctionDefinition>('esaggs', {
    index: buildExpression([
      buildExpressionFunction<IndexPatternLoadExpressionFunctionDefinition>('indexPatternLoad', {
        id: vis.data.indexPattern!.id!,
      }),
    ]),
    metricsAtAllLevels: vis.isHierarchical(),
    partialRows: false,
    aggs: vis.data.aggs!.aggs.map((agg) => buildExpression(agg.toExpressionAst())),
  });  */

  const selfChangingVis = buildExpressionFunction<SelfChangingVisExpressionFunctionDefinition>(
    'self_changing_vis',
    { counter }
  );

  //const ast = buildExpression([esaggs,selfChangingVis]);
  const ast = buildExpression([selfChangingVis]);

  return ast.toAst();
};
