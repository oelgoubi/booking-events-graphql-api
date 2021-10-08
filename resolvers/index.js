const authResolver = require("./authResolver");
const eventResolver = require('./eventResolver');
const bookingResolver = require("./bookingResolver");


const rootResolver = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
}

module.exports = rootResolver