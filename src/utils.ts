const max_len=5;

export function generate(){
    let ans="";
    const subset="1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
    for(let i=0;i<max_len;i++){
        ans+=subset[Math.floor(Math.random()*subset.length)];
    }
    return ans;
}