/**
 *  Question: https://leetcode.com/problems/add-two-numbers/
 */
const {buildLinkListFromArray}  = require('./utils');
const {addTwoNumbers} = require('./solution.js');


let res = addTwoNumbers(
    buildLinkListFromArray(
        [9,9,9,9,9,9,9]),
    buildLinkListFromArray([9,9,9,9])
)
console.dir(JSON.stringify(res));

