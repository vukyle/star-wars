const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Star Wars Character Type
const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields:() => ({
        // id: {type:GraphQLString},
        name: {type: GraphQLString},
        gender: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        character: {
            type: CharacterType,
            args: {
                id: {type:GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get('https://swapi.co/api/people/' + args.id)
                    .then(res => res.data);
            }
        },
        characters: {
            type: new GraphQLList (CharacterType),
            resolve(parentValue, args){
                return axios.get('https://swapi.co/api/people/')
                    .then(res => res.data.results);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
