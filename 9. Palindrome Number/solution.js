/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {

    let reversedNum = 0;
    
    //edge cases
    if(x<0 || (x%10===0 && x>0)) return false; //leading zero number not count as a palindrome
    
    while( reversedNum < x){
        reversedNum = reversedNum*10 + x%10;
        x= Math.floor(x/10); //js divide ints are decimal
    }
    
    return reversedNum === x || Math.floor(reversedNum/10) === x;
    
};


var isPalindromeEasy = function(x) {
    
    if(x<0) return false;
    xStr = x +'';
    return xStr.split("").reverse().join("") === xStr
    
    
};