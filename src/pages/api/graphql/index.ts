import { createYoga } from 'graphql-yoga';
import {schema} from '../../../utils';
import type { NextApiRequest, NextApiResponse } from 'next'

const yoga = createYoga<{
    req: NextApiRequest
    res: NextApiResponse
  }>({
      schema,
      graphqlEndpoint: '/api/graphql'
    });

export default yoga;