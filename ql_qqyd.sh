url="https://eventv3.reader.qq.com/activity/pkg11955"
spdd(){
for ((s=30;s>0;s--))
do
echo 看视频中，等待$s秒
sleep 1
done
}
ye(){
ye=$(curl -s -H "Cookie:$ck" "$url/initV4")
}
jg(){
ye
dt=$(date '+%Y-%m-%d %H:%M:%S')
coin=$(echo $ye | grep -o "coin.*" | cut -d '"' -f2 | grep -o "[0-9]*")
cash=$(echo $ye | grep -o "cash.*" | cut -d '"' -f3)
zxjg="$rw$(echo $zx | grep -o "msg.*" | cut -d '"' -f3)"
ts="$dt $zxjg 当前金币$coin 当前现金$cash"
echo $ts
}
xyhtxyqm(){
rw="新用户填写邀请码"
zx=$(curl -s -H "Cookie:$ck" "$url/inivite/fillcode?code=382826606")
jg
}
xzydkwjl(){
ye
rwkx=$(echo $ye | grep -o "showQuestionnaire.*" | grep -o "finish.*" | cut -d '"' -f2 | grep -o "[a-z]*")
rwqk=$(echo $ye | grep -o "questionnaireDto.*" | grep -o "finish.*" | cut -d '"' -f2 | grep -o "[a-z]*")
if [ "$rwkx" == "true" -a "$rwqk" != "true" ]
then rw="选择阅读口味奖励"
zx=$(curl -s -H "Cookie:$ck" "https://commontgw6.reader.qq.com/h5/questionnaire/sendCoin")
jg
fi
}
mrdk(){
rwkx=$(curl -s -H "Cookie:$ck" "$url/queryPunchCardStatus" | grep -o "finish.*" | cut -d '"' -f2 | grep -o "[a-z]*")
if [ "$rwkx" != "true" ]
then rw="每日打卡"
zx=$(curl -s -H "Cookie:$ck" "$url/punchCard_v2")
jg
fi
}
dkkxsp(){
rwkx=$(curl -s -H "Cookie:$ck" "$url/queryPunchCardStatus" | grep -o "watched.*" | cut -d '"' -f2 | grep -o "[a-z]*")
if [ "$rwkx" != "true" ]
then spdd
rw="打卡看小视频"
zx=$(curl -s -H "Cookie:$ck" "$url/punchCardWatchVideo")
jg
fi
}
wzcj(){
c=$(curl -s -H "Cookie:$ck" "$url/queryPunchCardStatus" | grep -o "count.*" | cut -d '"' -f2 | grep -o "[0-9]*")
if [ $c -ne 0 ]
then rw="网赚抽奖"
for ((i=c;i>0;i--))
do
spdd
zx=$(curl -s -H "Cookie:$ck" "$url/pickLottery")
i=$(echo $zx | grep -o "num.*" | cut -d '"' -f2 | grep -o "[0-9]*")
echo 倒数第$i次$rw
jg
done
fi
}
ydzdsj(){
rw="阅读指定书籍"
zx=$(curl -s -H "Cookie:$ck" "$url/pickReadConfigBook")
jg
}
jsjkxsp(){
ye
rwqk=$(echo $ye | grep -o "addShelf.*" | grep -o "watched.*" | cut -d '"' -f2 | grep -o "[a-z]*")
if [ "$rwqk" != "true" ]
then rw="加书架看小视频"
zx=$(curl -s -H "Cookie:$ck" "$url/addBookShelfWatchVideo")
jg
fi
}
ydkxsp(){
rw="阅读看小视频"
time="5@30@60@120"
for ((i=1;i<5;i++))
do
spdd
zxt=$(echo $time | cut -d "@" -f$i)
zx=$(curl -s -H "Cookie:$ck" "$url/readBookWatchVideo?targetTime=$zxt")
echo 第$i次$rw
jg
done
}
kxsp(){
ye
vc=$(($(echo $ye | grep -o "videoCount.*" | cut -d '"' -f2 | grep -o "[0-9]*")+1))
lm=$(($(echo $ye | grep -o "limit.*" | cut -d '"' -f2 | grep -o "[0-9]*")+1))
rw="看小视频"
for ((i=vc;i<lm;i++))
do
spdd
zx=$(curl -s -H "Cookie:$ck" "$url/watchVideo")
echo 第$i次$rw
jg
done
}
kbx(){
rw="开宝箱"
bxn=$(curl -s -H "Cookie:$ck" "$url/queryOpenBoxInfo" | grep -o "openNum.*" | cut -d '"' -f2 | grep -o "[0-9]*")
for ((i=bxn;i>0;i--))
do
zx=$(curl -s -H "Cookie:$ck" "$url/openBox")
echo 倒数第$i次$rw
jg
spdd
rw="看视频得奖励"
zx=$(curl -s -H "Cookie:$ck" "$url/pickOpenBoxWatchVideo")
echo 倒数第$i次$rw
jg
sleep 3605
done
}
run(){
xyhtxyqm
xzydkwjl
mrdk
dkkxsp
wzcj
ydzdsj
jsjkxsp
ydkxsp
kxsp
kbx
}
if [ -s ck ]
then ck=$(cat ck)
if [ -z "$ck" ]
then echo 文件ck内无cookie，请将cookie保存至ck文件内
fi
else 
read -p "请输入cookie，格式为qrsn=xxx;ywguid=xxx;ywkey=xxx，如有多个请用@隔开：" ck
echo "$ck" > ck
fi
if [ $(cat ck | grep -o "@" | wc -l) -gt 0 ]
then zs=$(($(cat ck | grep -o "@" | wc -l)+1))
[ ! -n "$(cat ck | cut -d "@" -f"$zs")" ] && zs=$(cat ck | grep -o "@" | wc -l)
else zs=1
fi
for ((i=1;i<$((zs+1));i++))
do 
echo $dt 总共有$zs个账户，正在执行第$i个账户
ck=$(cat ck | cut -d "@" -f"$i")
if [ -n "$ck" ]
then run
echo 执行第$i个账户结束
fi
sleep 0
done