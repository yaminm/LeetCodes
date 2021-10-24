const {ListNode}  = require('./ListNode');


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

module.exports = {addTwoNumbers};
