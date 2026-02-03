
const answers={
 q1:'carnivorous',q2:'scent',q3:'pouch',q4:'fossil',q5:'habitat',
 q6:'true',q7:'false',q8:'not given',q9:'false',
 q10:'not given',q11:'false',q12:'true',q13:'not given'
};

const explanations={
 q1:'The passage states it was exclusively carnivorous.',
 q2:'It relied more on scent during hunting.',
 q3:'Newborns stayed in the pouch.',
 q4:'A carbon-dated fossil is mentioned.',
 q5:'Loss of habitat contributed to decline.'
};

let time=900,timer,startTime;

function startTest(){
 const n=document.getElementById('name').value.trim();
 if(!n) return alert('Enter name');
 document.getElementById('loginPage').classList.add('hidden');
 document.getElementById('examPage').classList.remove('hidden');
 document.getElementById('student').innerText='Candidate: '+n;
 startTime=Date.now();
 timer=setInterval(()=>{
  time--;
  document.getElementById('timer').innerText=
   Math.floor(time/60)+':'+String(time%60).padStart(2,'0');
  if(time<=0) submitTest();
 },1000);
}

function submitTest(){
 clearInterval(timer);
 let score=0;
 let detail='';
 for(let q in answers){
  let el=document.getElementById(q);
  let val=el.value.toLowerCase().trim();
  if(val===answers[q]){score++; detail+=`<p>✔ ${q}</p>`;}
  else detail+=`<p>✘ ${q} — ${explanations[q]||''}</p>`;
 }
 let taken=Math.floor((Date.now()-startTime)/1000);
 let recs=JSON.parse(localStorage.getItem('records')||'[]');
 recs.push({name:document.getElementById('student').innerText.replace('Candidate: ',''),score,time:taken});
 localStorage.setItem('records',JSON.stringify(recs));

 document.getElementById('examPage').classList.add('hidden');
 document.getElementById('resultPage').classList.remove('hidden');
 document.getElementById('scoreboard').classList.remove('hidden');
 document.getElementById('resultPage').innerHTML=`<h2>Your Score: ${score}/13</h2>${detail}`;

 renderBoard();
}

function renderBoard(){
 let r=JSON.parse(localStorage.getItem('records')||'[]');
 r.sort((a,b)=>b.score-a.score||a.time-b.time);
 let t=document.getElementById('board');
 t.innerHTML='<tr><th>Name</th><th>Score</th><th>Time(s)</th></tr>';
 r.forEach(x=>t.innerHTML+=`<tr><td>${x.name}</td><td>${x.score}</td><td>${x.time}</td></tr>`);
}
