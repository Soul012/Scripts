/*
下载地址
http://a13.app.qq.com/o/simple.jsp?pkgname=com.cashtoutiao&ckey=CK1430507080047
邀请码必填得金币 29629303
[rewrite_local]
https://api.cashtoutiao.com/frontend/sign/record\S+ url script-request-body http://47.101.146.160/scripts/htt.js

hostname = api.cashtoutiao.com
##点任务获取数据##
===========ql===========
拉取
ql raw http://47.101.146.160/scripts/htt.js
变量
export htthd='{"loginId":"替换的","userId":替换的}'

多账号用@隔开
cron: 27 6-23 * * *
*/
// [task_local]
// */60 * * * * http://47.101.146.160/scripts/htt.js, tag=惠头条, img-url=circles.hexagongrid.fill.system, enabled=true

const $ = new Env('惠头条');
let status;
status = (status = ($.getval("httstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let htthdArr = [],httckArr = [],jzreadcount = ''
let htthd= $.isNode() ? (process.env.htthd ? process.env.htthd : "") : ($.getdata('htthd') ? $.getdata('htthd') : "")
let httck= $.isNode() ? (process.env.httck ? process.env.httck : "") : ($.getdata('httck') ? $.getdata('httck') : "")
let httcks = ''
let htthds = ''
const logs =0;

var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
  if (typeof $request !== "undefined") {
        await getck()
  } else {
      if(!$.isNode()){
          htthdArr.push($.getdata('htthd'))
          httckArr.push($.getdata('httck'))
          let jzreadcount = ($.getval('httcount') || '1');
          for (let i = 2; i <= jzreadcount; i++) {
            htthdArr.push($.getdata(`htthd${i}`))
            httckArr.push($.getdata(`httck${i}`))
            }
    console.log(`------------- 共${htthdArr.length}个账号-------------\n`)
      for (let i = 0; i < htthdArr.length; i++) {
        if (htthdArr[i]) {
          htthd = htthdArr[i];
          httck = httckArr[i]
          $.index = i + 1;
        
          console.log(`\n开始【惠头条${$.index}】`)

await ql()

  }
}
      }else  {
          if (process.env.htthd && process.env.htthd.indexOf('@') > -1) {
            htthdArr = process.env.htthd.split('@');
            
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            htthds = [process.env.htthd]
        
        };
        Object.keys(htthds).forEach((item) => {
        if (htthds[item]) {
            htthdArr.push(htthds[item])
        }
    })

          console.log(`共${htthdArr.length}个cookie`)
	        for (let k = 0; k < htthdArr.length; k++) {
                $.message = ""
                htthd = htthdArr[k]
                httck = httckArr[k]
                $.index = k + 1;
          console.log(`\n开始【惠头条${$.index}】`)
          //$.log(htthd)
await ql()
	        }
      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function getck() {
   if ($request.url.indexOf("sign/record") > -1) {
  const htthd = $request.body
if(htthd)    $.setdata(htthd,`htthd${status}`)
  const httck = JSON.stringify($request.headers)
if(httck)    $.setdata(httck,`httck${status}`)

$.log(decodeURIComponent  (htthd))
//$.log(httck)

   $.msg($.name,"",'惠头条'+`${status}` +'数据获取成功！')
 
}
}

async function ql(){

await qlsign1()
await qlxslist()
await qlreads()
await qllotteryinfo()
await info()
}
async function qlsign1(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/sign?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"loginId":"${qlsign.loginId}","versionName":"4.6.0","userId":${qlsign.userId},"appVersion":1043,"platform":1}`,
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.statusCode == 200)
        $.log(result.msg)
    
       if(result.statusCode != 200)
          
          $.log(result.msg+"，已经签到过")
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
async function qlxslist(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/newbie/task/list?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"loginId":"${qlsign.loginId}","registerTime":1630305246177,"versionName":"4.6.0","userId":${qlsign.userId},"appVersion":1043,"platform":1}`,
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.statusCode == 200){
        if(result.newbieTaskList){
            xslist = result.newbieTaskList
            for(let i=0;i<xslist.length;i++){
                taskId=xslist[7].taskId
                //$.log(taskId)
                await qlxsdotask(taskId)
            }
           
        }
    
       }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }  
  
  async function qlxsdotask(taskId){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/newbie/task/draw?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"loginId":"${qlsign.loginId}","versionName":"4.6.0","taskId":${taskId},"userId":${qlsign.userId},"appVersion":1043,"platform":1}`,
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.statusCode == 200){
     $.log(result.msg)
    
       }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qlcheck(type,newsId){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/collection/check?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"appVersion":1043,"loginId":"${qlsign.loginId}","versionName":"4.6.0","${type}":${newsId},"userId":${qlsign.userId},"platform":1}`,
     
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        //const result = JSON.parse(data)
        //if(logs)$.log(data)
        //if(result.statusCode == 200){
     //$.log(result.msg)
    
      // }else if(result.statusCode != 200)
          
         // $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
 async function qlread(newsId){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/read/sych/duration?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"versionName":"4.6.0","platform":1,"count":1,"userId":${qlsign.userId},"multiple":false,"channel":"dongfang","duration":30,"appVersion":1043,"loginId":"${qlsign.loginId}","readActionInfo":{"maxHistorySize":0,"toolTypes":[0],"moveAvgPressure":1.0454913377761841,"downCount":43,"monkey":false,"moveCount":1521,"downAvgPressure":0.014857879839837551}}`,
     
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
    if(result.statusCode == 200){
     $.log(result.incCredit)
    
      }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  } 
  
  async function qlreads(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `http://api.admin.cp.cashtoutiao.com/headLine/getVideoAndArticleNoCoverApi?userId=${qlsign.userId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"deviceId":"3ea6d7a3676b4f0a9d1e591250288888","appVersion":1043,"userId":${qlsign.userId},"versionName":"4.6.0","platform":1,"backVersion":"3","type":"toutiao","page":0}`,
headers:{
    
    
    'Host': 'api.admin.cp.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
    if(result.state == true){
    if(result.data){
        readlist = result.data
        for(let i=0;i<readlist.length;i++){
            readid=readlist[i].id
            await $.wait(30000)
            await qlcheck('newsId')
            await qlread(readid)
        }
    }
    
      }else if(result.state == false)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qllotteryinfo(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.easytask.huadongmedia.com/task-center/lottery/info`,
     body: `{"mediaId":"cashtoutiao","userId":"${qlsign.userId}"}`,
     
headers:{
    
'Host': 'api.easytask.huadongmedia.com',
'Content-Type': 'application/json',
'Origin': 'http://page.huadongmedia.com',
'Accept-Encoding': 'gzip, deflate, br',
'Connection': 'keep-alive',
'Accept': 'application/json, text/javascript, */*; q=0.01',
'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Referer': `http://page.huadongmedia.com/h5/product/lottery/index.html?mediaId=cashtoutiao&userId=${qlsign.userId}`,

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
    if(result.statusCode == 200){
        drawNum=result.lotteryInfo.drawRemainNum
     
     if(drawNum>0){
         $.log("drawRemainNum:"+result.lotteryInfo.drawRemainNum)
     for(let i=0;i<drawNum;i++){
        await qldraw()
    }}
      }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qldraw(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.easytask.huadongmedia.com/task-center/lottery/draw`,
     body: `{"mediaId":"cashtoutiao","userId":"${qlsign.userId}"}`,
     
headers:{
    
'Host': 'api.easytask.huadongmedia.com',
'Content-Type': 'application/json',
'Origin': 'http://page.huadongmedia.com',
'Accept-Encoding': 'gzip, deflate, br',
'Connection': 'keep-alive',
'Accept': 'application/json, text/javascript, */*; q=0.01',
'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Referer': `http://page.huadongmedia.com/h5/product/lottery/index.html?mediaId=cashtoutiao&userId=${qlsign.userId}`,

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
    if(result.statusCode == 200){
     $.log(result.drawInfo.coin)
   
      }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
 async function info(){
 return new Promise((resolve) => {
qlsign = JSON.parse(htthd)

    let nm = {
     url: `https://api.cashtoutiao.com/frontend/credit/summary?userId=${qlsign.userId}&loginId=${qlsign.loginId}&appVersion=1043&platform=1&versionName=4.6.0`,
     body: `{"loginId":"${qlsign.loginId}","versionName":"4.6.0","userId":${qlsign.userId},"appVersion":1043,"platform":1}`,
     
headers:{
    
    
    'Host': 'api.cashtoutiao.com',
'Content-Type': 'application/json',
'Connection': 'keep-alive',

'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
'Accept-Language': 'zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, zh-Hant-CN;q=0.8',
'Accept-Encoding': 'gzip, deflate',

    
}
     
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
    if(result.statusCode == 200){
     $.log(`remaining: ${result.userCreditSummary.remaining}\ntoday: ${result.userCreditSummary.todayIncome}\ntotal: ${result.userCreditSummary.total}\ncan bank: ${result.userCreditSummary.withDrawRemaining}`)
    
      }else if(result.statusCode != 200)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }  
  
  function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
