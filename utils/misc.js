const { log, debug, info, warn, error } = console
, now= ()=> (Date.now()/1000)%100000

log[𝚊𝚍𝚍] = { debug, info, warn, error } 

register({ log, now } )

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }

