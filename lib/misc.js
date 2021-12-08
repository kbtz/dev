Window[𝚙𝚛𝚘𝚝𝚘]=
{ 𝚗𝚘𝚠: ()=> (Date.now()/1000)%100000
, 𝚛𝚎𝚜: function() {
		const {innerWidth:w, innerHeight:h}= this
		, r= [w,h]
		r[𝚊𝚍𝚍]= {w, h} 
		return r }
}

const { log, debug, info, warn, error } = console
log[𝚊𝚍𝚍] = { debug, info, warn, error } 
register({ log } )

// Array.at for Safari
if(!Array.prototype.at) Array.prototype.at = function (i) { return this[i] }

