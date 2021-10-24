
  function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
* @param {ListNode} l1
* @param {ListNode} l2
* @return {ListNode}
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 **/
 
 var addTwoNumbers = function(l1, l2) {
    
    let res = null;
    let head = null
    carry = 0;
    debugger;
    while(l1 != null || l2 != null)
   // for(let i=0;i<3;i++)
    {
        
        let tempSum = 0;
       
        //calc
        if(l1 !== null) tempSum += l1.val; 
        if(l2 !== null) tempSum += l2.val;
        tempSum += carry;
        
        //for next round
        tempSum > 9 ? carry = 1 : carry = 0;
        
        //var handling
        tmp = new ListNode();

        tmp.val = tempSum%10;
      //  if(!res){ res = tmp; head = tmp;} //for first time

        if(l1 !== null)  l1 = l1.next;
        if(l2 !== null)  l2 = l2.next;
       
        
        
        if(res !== null){
          res.next = tmp; 
          res = res.next
        }
        else{
            head = tmp;
            res = head;
        }   
    }
    if(carry === 1)
    {
        res.next = ListNode(carry);
    }
    return head;
};

function getValues1(){
    l1 = new ListNode(2,new ListNode(4,new ListNode(3)))
    l2 = new ListNode(5,new ListNode(6,new ListNode(4)))

    return [l1,l2];
}

function getValues2(){
    l1 = new ListNode(2,new ListNode(4,new ListNode(3)))
    l2 = new ListNode(5,new ListNode(6,new ListNode(4)))

    return [l1,l2];
}

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
debugger;

let res = addTwoNumbers(
    buildLinkListFromArray(
        [9,9,9,9,9,9,9]),
    buildLinkListFromArray([9,9,9,9])
)
console.dir(JSON.stringify(res));

