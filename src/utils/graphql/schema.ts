import { makeSchema } from "nexus";
import { join } from "path";
import * as types from './defines';

const schema = makeSchema({
    types,
    outputs: {
        typegen: join(__dirname, '../nexus/nexus-typegen.ts'),
        schema: join(__dirname, '../nexus/schema.graphql')
    }
})

export {schema};