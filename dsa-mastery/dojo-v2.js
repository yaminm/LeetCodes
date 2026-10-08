(function(){
"use strict";
const STORAGE="dsaJavaDojoV2";
const SESSION="dsaJavaDojoSessionV2";
const skills=[
 {id:"reflex",n:1,title:"Reflexes",he:"רפלקסים",desc:"length / size / division / % / loops / Math"},
 {id:"arrays",n:2,title:"Arrays & Strings",he:"מערכים ומחרוזות",desc:"char, substring, StringBuilder, matrix"},
 {id:"collections",n:3,title:"Collections",he:"Collections",desc:"Set / Map / Deque / PriorityQueue"},
 {id:"mechanics",n:4,title:"Interview Java",he:"Java של ראיון",desc:"overflow, comparators, equals, copying"},
 {id:"templates",n:5,title:"DSA Templates",he:"שלדי DSA",desc:"BFS / graph / backtracking / DP"}
];
const Q=[
{id:"r-length",s:"reflex",l:1,t:"mcq",p:"יש לך array, String ו-List. איזו שורה נכונה?",code:"int[] a = new int[5];\nString s = \"hello\";\nList<Integer> xs = List.of(1,2,3);",o:[["a.length == 5 && s.length() == 5 && xs.size() == 3",1],["a.length() == 5 && s.length == 5 && xs.size == 3",0],["a.size() == 5 && s.size() == 5 && xs.length == 3",0]],e:"Array משתמש ב-property בשם length. String משתמש ב-length(). Collection משתמש ב-size().",w:"זו אחת התקיעות הכי מיותרות בראיון — ולכן אנחנו רוצים אותה כרפלקס."},
{id:"r-div",s:"reflex",l:1,t:"input",p:"מה הערך של x?",code:"int x = 7 / 2;",a:["3"],e:"חלוקה בין שני int-ים היא integer division ולכן החלק השברי נחתך.",w:"Binary Search on Answer ובעיות capacity משתמשות בזה הרבה."},
{id:"r-mod",s:"reflex",l:1,t:"input",p:"מה הערך של x?",code:"int x = 17 % 5;",a:["2"],e:"% מחזיר את השארית מחלוקה: 17 = 3*5 + 2.",w:"Parity, cyclic indexing, hashing ו-number problems."},
{id:"r-ceil",s:"reflex",l:2,t:"mcq",p:"a ו-b חיוביים. איך מחשבים ceil(a / b) בלי double?",code:"int a = 10, b = 3;",o:[["a / b",0],["(a + b - 1) / b",1],["Math.ceil(a / b)",0],["a % b",0]],e:"למספרים חיוביים: (a + b - 1) / b. כאן נקבל 4.",w:"Koko Eating Bananas, shipping capacity ועוד בעיות feasibility."},
{id:"r-loop",s:"reflex",l:1,t:"mcq",p:"איזו לולאה עוברת על כל האינדקסים מהסוף להתחלה?",o:[["for (int i = a.length; i >= 0; i--)",0],["for (int i = a.length - 1; i >= 0; i--)",1],["for (int i = a.length - 1; i > 0; i--)",0]],e:"האינדקס האחרון הוא length-1 והראשון הוא 0.",w:"Off-by-one הוא מקור נפוץ לבאגים גם כשבחרת אלגוריתם נכון."},
{id:"r-minmax",s:"reflex",l:1,t:"input",p:"השלם רק את הביטוי שמחזיר את הגדול מבין a ו-b.",code:"int best = ________;",a:["Math.max(a,b)","Math.max(a, b)"],e:"Math.max(a, b). באותה צורה Math.min.",w:"כדאי שהדברים הקטנים האלה לא יתפסו cognitive load."},
{id:"a-digit",s:"arrays",l:1,t:"mcq",p:"c מכיל ספרה ASCII. איך הופכים אותה למספר?",code:"char c = '7';",o:[["(int)c",0],["c - '0'",1],["Integer.parseInt(c)",0],["c - 0",0]],e:"התווים '0'..'9' רציפים ולכן c-'0' נותן 0..9.",w:"Parsing של strings מופיע שוב ושוב."},
{id:"a-alpha",s:"arrays",l:1,t:"input",p:"איך ממפים אות lowercase ל-index בין 0 ל-25?",code:"char c = 'd';\nint idx = ________;",a:["c-'a'","c - 'a'"],e:"'a' הוא בסיס האינדקס. עבור d נקבל 3.",w:"Frequency array של int[26] לרוב פשוט ומהיר יותר מ-HashMap."},
{id:"a-sub",s:"arrays",l:2,t:"mcq",p:"מה מחזיר substring כאן?",code:"String s = \"abcdef\";\nString x = s.substring(2, 5);",o:[["\"cde\"",1],["\"cdef\"",0],["\"bcd\"",0],["\"def\"",0]],e:"ה-start כולל, ה-end לא כולל: indices 2,3,4.",w:"Exclusive end הוא פרט קטן שמפיל פתרונות string."},
{id:"a-builder",s:"arrays",l:2,t:"mcq",p:"מה הדרך הטבעית לבנות String בהדרגה בלולאה?",o:[["StringBuilder sb = new StringBuilder(); sb.append(x);",1],["String s = null; s.push(x);",0],["char[] תמיד חובה",0]],e:"StringBuilder מיועד לבנייה mutable של טקסט.",w:"Backtracking ו-string construction בלי ליצור המון Strings זמניים."},
{id:"a-matrix",s:"arrays",l:2,t:"input",p:"יש int[][] grid. כתוב ביטוי למספר העמודות.",code:"int rows = grid.length;\nint cols = ________;",a:["grid[0].length","grid[0].length;"],e:"מספר השורות הוא grid.length; מספר העמודות בשורה הראשונה הוא grid[0].length.",w:"Grid BFS/DFS צריך להיות אוטומטי."},
{id:"a-fill",s:"arrays",l:2,t:"mcq",p:"איך ממלאים int[] dist בערך -1?",o:[["Arrays.fill(dist, -1);",1],["dist.fill(-1);",0],["Collections.fill(dist, -1);",0]],e:"Arrays.fill עובד על arrays.",w:"DP, distances ו-sentinel initialization."},
{id:"c-set",s:"collections",l:2,t:"mcq",p:"איזו שורה גם מוסיפה x ל-Set וגם מאפשרת לזהות אם הוא כבר היה קיים?",o:[["if (!seen.add(x)) { /* duplicate */ }",1],["if (seen.put(x))",0],["if (seen.get(x) == null)",0]],e:"HashSet.add מחזיר false אם הערך כבר היה ב-Set.",w:"Duplicate detection יכול להיות קצר וברור."},
{id:"c-freq",s:"collections",l:2,t:"code",p:"כתוב שורה אחת שמגדילה את התדירות של x ב-Map<Integer,Integer>.",code:"Map<Integer,Integer> freq = new HashMap<>();\n// your line",rx:["freq\\.put\\(x,freq\\.getOrDefault\\(x,0\\)\\+1\\)","freq\\.merge\\(x,1,Integer::sum\\)"],hint:"גם getOrDefault וגם merge תקינים.",e:"שתי צורות טובות: freq.put(x, freq.getOrDefault(x,0)+1) או freq.merge(x,1,Integer::sum).",w:"זה אחד ה-idioms הכי נפוצים ב-Hashing."},
{id:"c-group",s:"collections",l:3,t:"mcq",p:"אתה מקבץ values לפי key. מה idiom נוח?",o:[["map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);",1],["map.get(key).add(value); תמיד",0],["map.put(key, value);",0]],e:"computeIfAbsent יוצר את הרשימה רק בפעם הראשונה.",w:"Adjacency lists, Group Anagrams ו-bucketing."},
{id:"c-stack",s:"collections",l:2,t:"mcq",p:"מה ברירת המחדל המועדפת ל-Stack מודרני ב-Java?",o:[["Stack<Integer>",0],["ArrayDeque<Integer> דרך Deque<Integer>",1],["LinkedHashMap<Integer,Integer>",0]],e:"Deque דרך ArrayDeque היא הבחירה המקובלת ל-stack/queue.",w:"פחות API ישן, ביצועים טובים ופעולות ברורות."},
{id:"c-queue",s:"collections",l:2,t:"mcq",p:"איזה pair מתאים ל-Queue FIFO עם ArrayDeque?",o:[["push / pop",0],["offerLast / pollFirst",1],["addFirst / removeFirst בלבד כי FIFO",0]],e:"מוסיפים בסוף ומוציאים מההתחלה.",w:"BFS צריך לצאת מהידיים בלי לחשוב."},
{id:"c-heap",s:"collections",l:2,t:"input",p:"כתוב את יצירת ה-min heap הפשוטה ל-Integer.",code:"PriorityQueue<Integer> pq = ________;",a:["new PriorityQueue<>()","new PriorityQueue<Integer>()"],e:"PriorityQueue טבעי הוא min-heap.",w:"Top-K, Dijkstra, scheduling."},
{id:"c-maxheap",s:"collections",l:3,t:"mcq",p:"איך יוצרים max heap של Integer?",o:[["new PriorityQueue<>(Comparator.reverseOrder())",1],["new PriorityQueue<>(Comparator.naturalOrder())",0],["new ArrayDeque<>()",0]],e:"Comparator.reverseOrder הופך את הסדר הטבעי.",w:"אין ב-Java max-heap נפרד כמו בחלק מהשפות."},
{id:"m-mid",s:"mechanics",l:3,t:"mcq",p:"איזה חישוב mid בטוח יותר מ-overflow?",o:[["(left + right) / 2",0],["left + (right - left) / 2",1],["right / 2",0]],e:"left + (right-left)/2 נמנע מחיבור שני ints גדולים.",w:"Binary Search template צריך להיות robust."},
{id:"m-comp",s:"mechanics",l:3,t:"mcq",p:"למה עדיף Integer.compare(a,b) על a-b בתוך comparator?",o:[["כי הוא קצר יותר",0],["כי a-b עלול overflow",1],["כי a-b לא מתקמפל",0]],e:"חיסור יכול overflow ולשבור ordering.",w:"Comparator שגוי יכול להפיל Heap/Sort בצורה לא צפויה."},
{id:"m-long",s:"mechanics",l:2,t:"mcq",p:"המערך מכיל עד 100,000 איברים שכל אחד עד 1e9. באיזה type לצבור sum?",o:[["int",0],["long",1],["short",0]],e:"הסכום יכול להגיע ל-1e14 ולכן int לא מספיק.",w:"ב-Senior interview מצופה שתזהה overflow לפני שהטסט מגלה אותו."},
{id:"m-eq",s:"mechanics",l:2,t:"mcq",p:"איך משווים תוכן של שני Strings?",o:[["a == b",0],["a.equals(b)",1],["a = b",0]],e:"== משווה references; equals משווה תוכן.",w:"בסיסי, אבל טעות כזאת בקוד ראיון פוגעת באמון."},
{id:"m-sort2d",s:"mechanics",l:3,t:"mcq",p:"איך ממיינים int[][] intervals לפי start?",o:[["Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));",1],["Arrays.sort(intervals); תמיד לפי a[0]",0],["Collections.sort(intervals)",0]],e:"Arrays.sort עם comparator על השורה.",w:"Intervals ו-greedy מתחילים לעיתים קרובות בדיוק כאן."},
{id:"m-copy",s:"mechanics",l:3,t:"input",p:"ב-backtracking, איך מוסיפים snapshot של path לתוצאות ולא reference משתנה?",code:"result.add( ________ );",a:["new ArrayList<>(path)","new ArrayList<Integer>(path)"],e:"צריך copy חדש של ה-state הנוכחי.",w:"אחרת כל התוצאות עלולות להצביע לאותה רשימה mutable."},
{id:"t-dirs",s:"templates",l:3,t:"mcq",p:"איזה מבנה נוח ל-4 כיוונים ב-grid?",o:[["int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};",1],["int[] dirs = {1,-1}; בלבד",0],["Map חובה",0]],e:"מערך direction pairs מפשט neighbor traversal.",w:"Grid BFS/DFS בלי ארבעה if-ים משוכפלים."},
{id:"t-bfs",s:"templates",l:3,t:"mcq",p:"ב-BFS, מה הסדר הטבעי?",o:[["pop stack → recurse",0],["poll queue → inspect neighbors → mark/enqueue unseen",1],["sort graph → binary search",0]],e:"BFS משתמש ב-queue ושומר frontier לפי שכבות.",w:"Shortest path בגרף לא ממושקל ו-level traversal."},
{id:"t-adj",s:"templates",l:4,t:"mcq",p:"לגרף עם nodes 0..n-1, איזו התחלה פשוטה ל-adjacency list?",o:[["List<List<Integer>> g = new ArrayList<>(); ואז להוסיף n רשימות",1],["int[] g = new int[n] תמיד",0],["PriorityQueue<List<Integer>>",0]],e:"List<List<Integer>> טבעי כשמספר השכנים משתנה.",w:"Modeling נכון לפני BFS/DFS."},
{id:"t-dp",s:"templates",l:4,t:"mcq",p:"אתה צריך dp בגודל n+1 עם sentinel גדול. מה pattern סביר?",o:[["int[] dp = new int[n+1]; Arrays.fill(dp, INF);",1],["List dp = null;",0],["StringBuilder dp",0]],e:"מאתחלים array ואז fill לערך שמייצג unreachable/unknown.",w:"DP mechanics צריכים להיות זולים מנטלית כדי להתמקד ב-state definition."},
{id:"t-heap-pair",s:"templates",l:4,t:"mcq",p:"Dijkstra שומר int[]{node,dist}. איך heap לפי dist?",o:[["new PriorityQueue<>(Comparator.comparingInt(a -> a[1]))",1],["new PriorityQueue<>(Comparator.comparingInt(a -> a[0]))",0],["new HashSet<>()",0]],e:"ממיינים את ה-pair לפי distance שב-index 1.",w:"Java boilerplate לא צריך להפריע להבנת Dijkstra."},
{id:"t-bounds",s:"templates",l:3,t:"code",p:"כתוב condition שמזהה תא מחוץ ל-grid עבור r,c,rows,cols.",rx:["r<0\\|\\|r>=rows\\|\\|c<0\\|\\|c>=cols","c<0\\|\\|c>=cols\\|\\|r<0\\|\\|r>=rows"],hint:"ארבעה boundaries עם ||.",e:"r < 0 || r >= rows || c < 0 || c >= cols.",w:"Grid traversal: זה צריך להיות muscle memory."}
];

function load(){try{return JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(e){return {}}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch(e){}}
let state=Object.assign({attempts:0,correct:0,streak:0,best:0,bySkill:{},misses:{},sessions:0,last:null},load());
skills.forEach(function(s){if(!state.bySkill[s.id])state.bySkill[s.id]={a:0,c:0}});
let root=null, session=null, timer=null, remaining=0;

function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function pct(c,a){return a?Math.round(c*100/a):0}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function skill(id){return skills.find(function(s){return s.id===id})}
function qBy(id){return Q.find(function(q){return q.id===id})}
function css(){
const el=document.createElement("style");el.id="jg-style";el.textContent=
".jg-root{position:fixed;inset:0;z-index:2147483000;background:#f4f0e8;color:#161616;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:auto;direction:rtl}"+
".jg-root *{box-sizing:border-box}.jg-top{position:sticky;top:0;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 24px;border-bottom:1px solid #c9c2b6;background:rgba(244,240,232,.94);backdrop-filter:blur(12px)}"+
".jg-brand{display:flex;align-items:center;gap:12px}.jg-mark{width:38px;height:38px;background:#161616;color:#f4f0e8;display:grid;place-items:center;font:bold 12px ui-monospace,monospace;transform:rotate(-2deg)}"+
".jg-brand b{font-size:15px;letter-spacing:.08em}.jg-brand small{display:block;color:#726c63;margin-top:2px}.jg-exit,.jg-btn{border:1px solid #161616;background:transparent;color:#161616;padding:10px 14px;font-weight:750;cursor:pointer}.jg-btn.primary{background:#161616;color:#fff}.jg-btn.blue{background:#2258ff;border-color:#2258ff;color:white}.jg-btn:disabled{opacity:.35;cursor:not-allowed}"+
".jg-stats{display:flex;gap:6px;flex-wrap:wrap}.jg-stat{border:1px solid #c9c2b6;padding:7px 10px;font:700 12px ui-monospace,monospace;background:#faf8f3}.jg-wrap{max-width:1180px;margin:auto;padding:34px 24px 70px}.jg-kicker{font:800 12px ui-monospace,monospace;letter-spacing:.12em;color:#2258ff;text-transform:uppercase}.jg-h1{font-size:clamp(38px,7vw,88px);line-height:.9;letter-spacing:-.055em;margin:12px 0 16px;max-width:850px}.jg-lead{font-size:18px;line-height:1.65;max-width:690px;color:#59534c}.jg-homegrid{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;margin-top:28px}.jg-panel{border:1px solid #b9b1a5;background:#fbf9f5;padding:22px;box-shadow:4px 4px 0 #161616}.jg-panel.flat{box-shadow:none}.jg-panel h2{margin:0 0 8px;font-size:18px}.jg-modegrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}.jg-mode{appearance:none;text-align:right;border:1px solid #b9b1a5;background:#f4f0e8;padding:18px;cursor:pointer;min-height:142px;transition:.14s transform,.14s box-shadow}.jg-mode:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #2258ff}.jg-mode strong{display:block;font-size:18px;margin:7px 0}.jg-mode span{color:#686158;line-height:1.45}.jg-mode .jg-num{font:800 11px ui-monospace,monospace;color:#2258ff}.jg-ladder{display:flex;flex-direction:column;gap:9px;margin-top:14px}.jg-rung{display:grid;grid-template-columns:34px 1fr 62px;align-items:center;gap:10px}.jg-rungnum{width:30px;height:30px;border:1px solid #161616;display:grid;place-items:center;font:bold 12px ui-monospace,monospace}.jg-rungbar{height:8px;background:#ded8ce;overflow:hidden}.jg-rungbar i{display:block;height:100%;background:#2258ff}.jg-rungpct{font:700 12px ui-monospace,monospace;text-align:left}.jg-rung small{color:#777067}.jg-sectiontitle{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:38px 0 14px}.jg-sectiontitle h2{font-size:26px;margin:0}.jg-sectiontitle span{color:#777067}.jg-chiprow{display:flex;gap:8px;flex-wrap:wrap}.jg-chip{border:1px solid #b9b1a5;background:#fbf9f5;padding:9px 11px;font:700 12px ui-monospace,monospace;cursor:pointer}.jg-chip.active{background:#d8ff42;border-color:#161616}.jg-qwrap{max-width:860px;margin:26px auto}.jg-progress{height:6px;background:#d7d1c7;margin:12px 0 26px}.jg-progress i{display:block;height:100%;background:#2258ff;transition:width .2s}.jg-qmeta{display:flex;justify-content:space-between;gap:10px;font:700 12px ui-monospace,monospace;color:#6c655d}.jg-q{font-size:clamp(24px,4vw,42px);line-height:1.12;letter-spacing:-.025em;margin:17px 0}.jg-code{direction:ltr;text-align:left;white-space:pre-wrap;background:#171717;color:#f8f4e9;padding:18px 20px;font:15px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;overflow:auto;border-right:5px solid #d8ff42;margin:16px 0}.jg-opts{display:grid;gap:9px;margin:20px 0}.jg-opt{width:100%;text-align:right;border:1px solid #aaa196;background:#fbf9f5;padding:15px 16px;font-size:15px;cursor:pointer}.jg-opt:hover{border-color:#2258ff}.jg-opt.sel{border:2px solid #2258ff;padding:14px 15px;background:#eef2ff}.jg-opt.good{border-color:#168048;background:#eaf8ef}.jg-opt.bad{border-color:#bd2e2e;background:#fff0ef}.jg-input{width:100%;direction:ltr;text-align:left;border:2px solid #161616;background:#fff;padding:15px 16px;font:16px ui-monospace,monospace;outline:none}.jg-input:focus{border-color:#2258ff}.jg-actions{display:flex;gap:8px;align-items:center;margin-top:16px}.jg-feedback{border:1px solid #161616;padding:18px;margin-top:18px;background:#fff}.jg-feedback.ok{border-right:7px solid #168048}.jg-feedback.no{border-right:7px solid #bd2e2e}.jg-feedback strong{font-size:18px}.jg-feedback p{line-height:1.6;color:#4f4942}.jg-why{font-size:13px;background:#f1eee8;padding:10px 12px;margin-top:10px}.jg-sessionend{text-align:center;max-width:720px;margin:60px auto}.jg-score{font:900 clamp(68px,15vw,150px)/.9 ui-monospace,monospace;color:#2258ff;letter-spacing:-.09em}.jg-minor{color:#6f685f}.jg-weak{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:22px 0}.jg-weak div{border:1px solid #b9b1a5;padding:12px;background:#fbf9f5}.jg-timer{font:800 13px ui-monospace,monospace;color:#bd2e2e}.jg-hidden{display:none!important}"+
"@media(max-width:760px){.jg-top{padding:10px 12px;align-items:flex-start}.jg-brand small{display:none}.jg-stats{display:none}.jg-wrap{padding:25px 14px 80px}.jg-homegrid{grid-template-columns:1fr}.jg-modegrid{grid-template-columns:1fr}.jg-h1{font-size:50px}.jg-panel{box-shadow:3px 3px 0 #161616;padding:17px}.jg-qwrap{margin:14px auto}.jg-q{font-size:28px}.jg-weak{grid-template-columns:1fr}.jg-exit{padding:8px 10px}}";
document.head.appendChild(el)
}
function openGym(){if(root)return; if(!document.getElementById("jg-style"))css(); root=document.createElement("div");root.className="jg-root";document.body.appendChild(root);home();document.body.style.overflow="hidden"}
function closeGym(){if(timer){clearInterval(timer);timer=null} if(root){root.remove();root=null}document.body.style.overflow=""}
function statsHtml(){return '<div class="jg-stats"><div class="jg-stat">Accuracy '+pct(state.correct,state.attempts)+'%</div><div class="jg-stat">Streak '+state.streak+'</div><div class="jg-stat">Sessions '+state.sessions+'</div></div>'}
function shell(body){root.innerHTML='<header class="jg-top"><div class="jg-brand"><div class="jg-mark">JAVA</div><div><b>JAVA DOJO</b><small>Reflex → Collections → Templates</small></div></div>'+statsHtml()+'<button class="jg-exit" data-jg="exit">חזרה למסלול</button></header>'+body}
function mastery(id){const x=state.bySkill[id]||{a:0,c:0};return pct(x.c,x.a)}
function home(){
let ladder=skills.map(function(s){return '<div class="jg-rung"><div class="jg-rungnum">'+s.n+'</div><div><b>'+s.he+'</b><small> · '+s.desc+'</small><div class="jg-rungbar"><i style="width:'+mastery(s.id)+'%"></i></div></div><div class="jg-rungpct">'+mastery(s.id)+'%</div></div>'}).join("");
shell('<main class="jg-wrap"><div class="jg-kicker">Java muscle memory — not Java theory</div><h1 class="jg-h1">פחות לזכור.<br>יותר לשלוף.</h1><p class="jg-lead">מתחילים מהבסיס שבאמת נתקעים עליו תחת לחץ — <b>length, division, %, loops, char</b> — ורק כשהוא אוטומטי עולים ל-Collections, Heap ו-DSA templates.</p><div class="jg-homegrid"><section class="jg-panel"><h2>בחר אימון</h2><div class="jg-modegrid"><button class="jg-mode" data-mode="warm"><span class="jg-num">05 Q · ~4 MIN</span><strong>Quick Warm-up</strong><span>חמש שאלות קצרות כדי להכניס את Java לידיים לפני DSA.</span></button><button class="jg-mode" data-mode="diag"><span class="jg-num">12 Q · ADAPTIVE BASELINE</span><strong>Diagnostic</strong><span>מתחיל ממש קל ועולה בהדרגה. בסוף נקבל תמונת רמה לפי שכבה.</span></button><button class="jg-mode" data-mode="weak"><span class="jg-num">08 Q · PERSONAL</span><strong>Weak Spots</strong><span>מחזיר בעיקר שאלות שטעית בהן או skills עם accuracy נמוך.</span></button><button class="jg-mode" data-mode="sprint"><span class="jg-num">10 Q · 08:00</span><strong>Interview Sprint</strong><span>ערבוב מהיר תחת זמן — רק אחרי שהבסיס כבר יושב.</span></button></div></section><aside class="jg-panel flat"><h2>Skill ladder</h2><p class="jg-minor">אין “Easy/Hard”. יש שכבות שצריכות להפוך לאוטומטיות בסדר טבעי.</p><div class="jg-ladder">'+ladder+'</div></aside></div><div class="jg-sectiontitle"><h2>Practice by skill</h2><span>אפשר גם לבחור שכבה ידנית</span></div><div class="jg-chiprow">'+skills.map(function(s){return '<button class="jg-chip" data-skill="'+s.id+'">'+s.n+' · '+s.he+'</button>'}).join("")+'</div></main>')
}
function build(mode,skillId){
let qs=[];
if(skillId){qs=shuffle(Q.filter(function(q){return q.s===skillId})).slice(0,8)}
else if(mode==="diag"){
 const picks=[];skills.forEach(function(s){const a=Q.filter(function(q){return q.s===s.id}).sort(function(x,y){return x.l-y.l});picks.push.apply(picks,a.slice(0,s.id==="reflex"?3:2))});qs=picks.slice(0,12)
}else if(mode==="weak"){
 const ranked=Q.slice().sort(function(a,b){const ma=state.misses[a.id]||0,mb=state.misses[b.id]||0;if(mb!==ma)return mb-ma;return mastery(a.s)-mastery(b.s)});qs=ranked.slice(0,8);if(!state.attempts)qs=shuffle(Q.filter(function(q){return q.l<=2})).slice(0,8)
}else if(mode==="sprint"){qs=shuffle(Q).slice(0,10)}
else{
 const low=skills.slice().sort(function(a,b){return mastery(a.id)-mastery(b.id)}).slice(0,2).map(function(s){return s.id});
 const pool=Q.filter(function(q){return q.l<=3&&(low.indexOf(q.s)>=0||q.s==="reflex")});
 qs=shuffle(pool).slice(0,5)
}
return {mode:mode||"skill",skill:skillId||null,ids:qs.map(function(q){return q.id}),i:0,c:0,answers:[],locked:false}
}
function start(mode,skillId){session=build(mode,skillId);try{sessionStorage.setItem(SESSION,JSON.stringify(session))}catch(e){} if(mode==="sprint"){remaining=8*60;timer=setInterval(function(){remaining--;const t=document.querySelector(".jg-timer");if(t)t.textContent=time(remaining);if(remaining<=0){clearInterval(timer);timer=null;finish()}},1000)}renderQ()}
function time(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function renderQ(){
if(!session||session.i>=session.ids.length){finish();return}
const q=qBy(session.ids[session.i]),sk=skill(q.s),progress=(session.i/session.ids.length)*100;
let input="";
if(q.t==="mcq"){input='<div class="jg-opts">'+shuffle(q.o).map(function(o){return '<button class="jg-opt" data-ok="'+o[1]+'">'+esc(o[0])+'</button>'}).join("")+'</div>'}
else{input='<div class="jg-opts"><input class="jg-input" id="jg-answer" autocomplete="off" spellcheck="false" placeholder="'+(q.t==="code"?"כתוב Java כאן…":"התשובה שלך…")+'"></div>'}
shell('<main class="jg-wrap"><div class="jg-qwrap"><div class="jg-qmeta"><span>'+sk.n+' · '+sk.he+' · step '+(session.i+1)+'/'+session.ids.length+'</span><span>'+(session.mode==="sprint"?'<b class="jg-timer">'+time(remaining)+'</b>':'Reflex '+q.l+'/4')+'</span></div><div class="jg-progress"><i style="width:'+progress+'%"></i></div><div class="jg-q">'+esc(q.p)+'</div>'+(q.code?'<pre class="jg-code">'+esc(q.code)+'</pre>':'')+input+(q.hint?'<div class="jg-minor">Hint זמין רק אחרי ניסיון ראשון.</div>':'')+'<div class="jg-actions"><button class="jg-btn primary" data-jg="check">בדוק</button><button class="jg-btn" data-jg="home">יציאה מהאימון</button></div><div id="jg-feedback"></div></div></main>');
const ans=document.getElementById("jg-answer");if(ans){ans.focus();ans.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();check()}})}
}
function norm(x){return String(x||"").replace(/\s+/g,"").replace(/;$/,"")}
function correct(q){
if(q.t==="mcq"){const sel=document.querySelector(".jg-opt.sel");return !!(sel&&sel.dataset.ok==="1")}
const val=(document.getElementById("jg-answer")||{}).value||"";
if(q.a)return q.a.some(function(x){return norm(x)===norm(val)});
if(q.rx){const n=norm(val);return q.rx.some(function(x){try{return new RegExp(x).test(n)}catch(e){return false}})}
return false
}
function check(){
if(session.locked)return;const q=qBy(session.ids[session.i]);
if(q.t==="mcq"&&!document.querySelector(".jg-opt.sel"))return;
if(q.t!=="mcq"&&!(document.getElementById("jg-answer").value||"").trim())return;
const ok=correct(q);session.locked=true;state.attempts++;state.bySkill[q.s].a++;
if(ok){state.correct++;state.streak++;state.best=Math.max(state.best,state.streak);state.bySkill[q.s].c++;session.c++}else{state.streak=0;state.misses[q.id]=(state.misses[q.id]||0)+1}
state.last=new Date().toISOString();save();
document.querySelectorAll(".jg-opt").forEach(function(b){if(b.dataset.ok==="1")b.classList.add("good");else if(b.classList.contains("sel")&&!ok)b.classList.add("bad");b.disabled=true});
const f=document.getElementById("jg-feedback");f.innerHTML='<div class="jg-feedback '+(ok?"ok":"no")+'"><strong>'+(ok?"✓ נכון":"✕ לא הפעם")+'</strong><p>'+esc(q.e)+'</p><div class="jg-why"><b>למה זה כאן?</b> '+esc(q.w)+'</div></div><div class="jg-actions"><button class="jg-btn blue" data-jg="next">'+(session.i+1===session.ids.length?"סיכום":"הבא →")+'</button></div>';
}
function next(){session.answers.push(session.ids[session.i]);session.i++;session.locked=false;renderQ()}
function finish(){
if(timer){clearInterval(timer);timer=null}if(!session)return;state.sessions++;save();
const score=pct(session.c,session.ids.length);
const details=skills.map(function(s){const ids=session.ids.filter(function(id){return qBy(id).s===s.id});if(!ids.length)return "";const good=ids.filter(function(id){return !(state.misses[id]||0)}).length;return '<div><b>'+s.he+'</b><br><span class="jg-minor">'+mastery(s.id)+'% mastery overall</span></div>'}).filter(Boolean).join("");
shell('<main class="jg-wrap"><div class="jg-sessionend"><div class="jg-kicker">SESSION COMPLETE</div><div class="jg-score">'+score+'%</div><h1>ה-Java נהיית זולה יותר מנטלית.</h1><p class="jg-lead" style="margin:auto">המטרה היא לא ציון מושלם. המטרה היא שה-syntax וה-APIs הקטנים יפסיקו לגנוב קשב מהאלגוריתם.</p><div class="jg-weak">'+details+'</div><div class="jg-actions" style="justify-content:center"><button class="jg-btn blue" data-mode="weak">תרגל Weak Spots</button><button class="jg-btn" data-jg="home">חזרה ל-Dojo</button></div></div></main>');session=null
}
function choose(e){const b=e.target.closest(".jg-opt");if(!b||session&&session.locked)return;document.querySelectorAll(".jg-opt").forEach(function(x){x.classList.remove("sel")});b.classList.add("sel")}
function click(e){
const target=e.target.closest("button,a,[role=button],.nav-item");
if(root){
 if(e.target.closest(".jg-opt")){choose(e);return}
 if(e.target.closest("[data-jg=exit]")){closeGym();return}
 if(e.target.closest("[data-jg=home]")){if(timer){clearInterval(timer);timer=null}session=null;home();return}
 if(e.target.closest("[data-jg=check]")){check();return}
 if(e.target.closest("[data-jg=next]")){next();return}
 const m=e.target.closest("[data-mode]");if(m){start(m.dataset.mode);return}
 const s=e.target.closest("[data-skill]");if(s){start("skill",s.dataset.skill);return}
 return
}
if(target&&/java\s*(dojo|gym)/i.test(target.textContent||"")){e.preventDefault();e.stopImmediatePropagation();openGym()}
}
document.addEventListener("click",click,true);
document.addEventListener("keydown",function(e){if((e.altKey||e.metaKey)&&e.key.toLowerCase()==="j"){e.preventDefault();openGym()}if(e.key==="Escape"&&root)closeGym()});
const observer=new MutationObserver(function(){document.querySelectorAll("button,a,[role=button],.nav-item").forEach(function(el){if(/^\s*java\s+dojo\s*$/i.test(el.textContent||"")&&!el.dataset.jgNamed){el.dataset.jgNamed="1";el.title="Java Dojo · adaptive practice"}})});
observer.observe(document.documentElement,{subtree:true,childList:true});
window.DSAJavaDojo={open:openGym,close:closeGym,state:function(){return state}};
})();