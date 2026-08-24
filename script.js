const quotes=[
  "The universe is vast. Your attention is precious.",
  "You don't need to feel motivated. You just need to begin.",
  "Curiosity is a form of discipline.",
  "A small break can refresh a long journey.",
  "Protect your attention like a scientist protects a clean experiment."
];

document.getElementById("quote").textContent="“"+quotes[Math.floor(Math.random()*quotes.length)]+"”";

let seconds=600, interval=null, running=false;
const timer=document.getElementById("timer"), startBtn=document.getElementById("startBtn");

function renderTimer(){
  const m=String(Math.floor(seconds/60)).padStart(2,"0");
  const s=String(seconds%60).padStart(2,"0");
  timer.textContent=`${m}:${s}`;
}
function setTimer(min){
  clearInterval(interval); running=false; seconds=min*60;
  startBtn.textContent="Start break"; renderTimer();
  document.querySelectorAll(".timer-controls button").forEach(b=>b.classList.remove("active"));
  [...document.querySelectorAll(".timer-controls button")].find(b=>b.textContent===min+" min")?.classList.add("active");
}
function toggleTimer(){
  if(running){clearInterval(interval);running=false;startBtn.textContent="Resume break";return}
  running=true;startBtn.textContent="Pause break";
  interval=setInterval(()=>{
    seconds--;renderTimer();
    if(seconds<=0){
      clearInterval(interval);running=false;seconds=0;renderTimer();
      startBtn.textContent="Start another break";
      alert("🌱 Break finished. Ready to get back to what matters?");
    }
  },1000);
}
function showPanel(type){
  const panel=document.getElementById("panel"), content=document.getElementById("panelContent");
  panel.classList.remove("hidden");
  if(type==="music"){
    const playlists = [
      {name:"🌙 Lunar Drift", desc:"soft sounds", id:"PL9Fo6yCLZEIVQF2vbdmVioUarjX4-X9yh"},
      {name:"☁️ Cloud Nine", desc:"light moods", id:"PL9Fo6yCLZEIXrEmHEHcx5j0P6p5yCxFSE"},
      {name:"✨ Stardust Sessions", desc:"little sparks", id:"PL9Fo6yCLZEIXbbPWwXvDp4L9h3JF6Ey0r"},
      {name:"🌌 Midnight Orbit", desc:"late-night energy", id:"PL9Fo6yCLZEIXc-n8qlLxEUq8JL0O4FfBN"}
    ];
    const first = playlists[0];
    content.innerHTML=`<p class="eyebrow">MUSIC LAB</p><h2>🎧 Your Music</h2>
      <p>Pick a playlist and keep listening without leaving Focus Lab.</p>
      <div class="music-player">
        <iframe id="musicFrame"
          src="https://www.youtube-nocookie.com/embed/videoseries?list=${first.id}&rel=0"
          title="${first.name}"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="playlist-grid" id="playlistGrid"></div>
      <p class="music-note">✓ Curated by you · No recommendations inside Focus Lab</p>`;
    const grid=document.getElementById("playlistGrid");
    playlists.forEach((p,i)=>{
      const a=document.createElement("button");
      a.className="playlist"+(i===0?" active":"");
      a.innerHTML=`🎵 <span><strong>${p.name}</strong><small>${p.desc} · play here →</small></span>`;
      a.onclick=()=>{
        document.getElementById("musicFrame").src=`https://www.youtube-nocookie.com/embed/videoseries?list=${p.id}&rel=0`;
        document.querySelectorAll(".playlist").forEach(x=>x.classList.remove("active"));
        a.classList.add("active");
      };
      grid.appendChild(a);
    });
  }else{
    content.innerHTML=`<p class="eyebrow">CURATED ONLY</p><h2>🎬 Short Break</h2>
      <p>Add only the short videos you deliberately choose. No infinite scrolling.</p>
      <div class="linkbox">+ Add a video · 5–15 minute break · Then stop</div>`;
  }
  panel.scrollIntoView({behavior:"smooth",block:"center"});
}
function closePanel(){document.getElementById("panel").classList.add("hidden")}
renderTimer();
