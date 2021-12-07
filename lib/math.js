const { ceil, floor, random: rand } = Math

register({ rand } )

symbols('𝚌𝚎𝚒𝚕', '𝚏𝚕𝚘𝚘𝚛')

Number[𝚙𝚛𝚘𝚝𝚘]=
{ [𝚌𝚎𝚒𝚕]: function() { return ceil(this) } 
, [𝚏𝚕𝚘𝚘𝚛]: function() { return floor(this) } 
}
