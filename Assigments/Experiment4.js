const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require("graphql");

// Student Type
const StudentType = new GraphQLObjectType({
    name: "Student",

    fields: {
        name: {
            type: GraphQLString
        },

        age: {
            type: GraphQLInt
        },

        course: {
            type: GraphQLString
        }
    }
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",

    fields: {
        student: {
            type: StudentType,

            resolve: () => {
                return {
                    name: "Manu",
                    age: 20,
                    course: "B.Tech CSE"
                };
            }
        }
    }
});

// Create GraphQL Schema
const schema = new GraphQLSchema({
    query: RootQuery
});

// GraphQL Query
const query = `
{
    student {
        name
        age
        course
    }
}
`;

// Execute Query
graphql({
    schema: schema,
    source: query
})
.then((result) => {
    console.log(JSON.stringify(result, null, 2));
})
.catch((error) => {
    console.log(error);
});