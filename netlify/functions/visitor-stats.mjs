import { getStore } from '@netlify/blobs';

const json=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
function koreanDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
async function count(store,prefix){let n=0;for await(const page of store.list({prefix,paginate:true})){n+=page.blobs.length;if(n>250000)throw Error('counter reached operational limit');}return n;}
export default async function handler(request){
  if(!['GET','POST'].includes(request.method))return json({error:'method not allowed'},405);
  try{
    const store=getStore('joil-visitor-events-v1');
    const day=koreanDate();
    if(request.method==='POST'){
      const payload=await request.json().catch(()=>null);
      const token=payload?.visitorId;
      if(typeof token!=='string'||!/^[a-f0-9-]{36}$/i.test(token))return json({error:'invalid visitorId'},400);
      // Immutable per-day key. No shared counter read/modify/write race.
      await store.set(`visits/${day}/${token}`,'1',{onlyIfNew:true});
    }
    const [today,total]=await Promise.all([count(store,`visits/${day}/`),count(store,'visits/')]);
    return json({today,total,date:day,method:'one anonymous browser per day'});
  }catch(error){console.error('visitor-stats:',error);return json({error:'visitor statistics unavailable'},503);}
}
