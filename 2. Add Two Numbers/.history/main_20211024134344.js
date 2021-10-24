

const {addTwoNumbers} = require('./solution.js');
const {buildLinkListFromArray}  = require('./utils');




let res = addTwoNumbers(
    buildLinkListFromArray(
        [9,9,9,9,9,9,9]),
    buildLinkListFromArray([9,9,9,9])
)
console.dir(JSON.stringify(res));

