//Maintain Group
namespace maintain_group;
//Maintain Group table
entity ZUSER {
    
key ZUSERNAME :String(12)@assert.unique @mandatory @assert.notNull;//User Name 

ZGROUP :String(12);//User ID group 


}