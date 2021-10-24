const {ListNode}  = require('./ListNode');

function buildLinkListFromArray(array){
    let head = new ListNode();
    let iterate = head;

    for(let val of array){
        iterate.val = val;
        iterate.next = new ListNode();
        iterate = iterate.next;
    }
    iterate.next = null;

    return head;
}


module.exports = {buildLinkListFromArray};
