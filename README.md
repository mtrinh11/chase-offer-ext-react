# A Chrome Extension to Activate Chase Credit Card offers.


## Notes for myself
So i don't necessarily need promises for the
content script. I just need to keep the port
open. 

Wow semi colons broke me, i guess the async operation in my content script doesn't
work if I don't include that semi colon after the "looking for offers" console.log
because it reads the async function all wonky...