import { extendType } from "nexus";

const HelloQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.string('message', {
            resolve() {
                return 'Hello World';
            },
            description: 'a test to say hello'
        })
    }
})

export {HelloQuery};