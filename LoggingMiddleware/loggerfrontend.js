const axios=require('axios');
let token='';
function setToken(tk){
    token=tk;
}
export function log(stack,level,pkg,message){
    const res=fetch('http://20.244.56.144/evaluation-service/logs',
    {method:'POST',
        headers:{
            'Authorization':'Bearer ${token}'
        },
        body:JSON.stringify({stack,level,pkg,message})
    });
}