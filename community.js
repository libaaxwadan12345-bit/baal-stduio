(function(){
  const ready = !!(window.supabase && window.BS_SUPABASE_URL && window.BS_SUPABASE_ANON_KEY && !window.BS_SUPABASE_URL.includes('PASTE_') && !window.BS_SUPABASE_ANON_KEY.includes('PASTE_'));
  const client = ready ? window.supabase.createClient(window.BS_SUPABASE_URL, window.BS_SUPABASE_ANON_KEY) : null;
  const emojis = ['❤️','🔥','😍','😂','😢'];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const keyFor = e => [e.anime,e.title,e.number].map(v=>String(v||'').trim().toLowerCase()).join('|').replace(/\s+/g,' ').slice(0,180);
  function visitorId(){let id=localStorage.getItem('bs_guest_visitor');if(!id){id=(crypto.randomUUID?crypto.randomUUID():('v'+Date.now()+Math.random().toString(36).slice(2)));localStorage.setItem('bs_guest_visitor',id)}return id}
  function notice(msg){return `<p class="community-note">${esc(msg)}</p>`}
  async function mountEpisodes(episodes){
    const cards=[...document.querySelectorAll('#episodeGrid .episode-card')];
    for(let i=0;i<cards.length;i++){
      const card=cards[i], episode=episodes[i]; if(!episode) continue;
      const key=keyFor(episode); card.dataset.episodeKey=key;
      let html=`<section class="episode-community" data-community="${esc(key)}"><h4>Bulshada Episode-kan</h4>`;
      if(!client){html+=notice('Faallooyinka iyo reactions-ku waxay shaqaynayaan marka Supabase la xiro. Akhri README-SO.txt.');}
      else {
        html+=`<div class="reaction-row" aria-label="Reactions">${emojis.map(x=>`<button class="reaction-btn" type="button" data-react="${x}" aria-label="${x}">${x} <b data-count="${x}">0</b></button>`).join('')}</div>`;
        html+=`<form class="guest-comment-form"><label>Magaca aad rabto<input name="guest_name" maxlength="30" minlength="2" required placeholder="Magac ama naanays"></label><label>Faalladaada<textarea name="body" maxlength="500" required rows="3" placeholder="Aragtidaada ku saabsan episode-kan..."></textarea></label><input name="website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn primary" type="submit">Dir faallo</button><span class="community-feedback" aria-live="polite"></span><small>Faalladaada marka hore waa la hubinayaa. Ha gelin telefoon, email ama xog gaar ah.</small></form><div class="approved-comments"><h5>Faallooyinka</h5><div class="comment-list">Loading...</div></div>`;
      }
      html+='</section>';
      const old=card.querySelector('.episode-community'); if(old)old.remove(); card.insertAdjacentHTML('beforeend',html);
      if(client){await loadEpisodeCommunity(card,key)}
    }
  }
  async function loadEpisodeCommunity(card,key){
    const section=card.querySelector('.episode-community'); if(!section)return;
    const [commentsRes,reactionsRes]=await Promise.all([
      client.from('episode_comments').select('id,guest_name,body,created_at').eq('episode_key',key).eq('status','approved').order('created_at',{ascending:false}).limit(30),
      client.from('episode_reactions').select('emoji').eq('episode_key',key)
    ]);
    if(commentsRes.error){section.querySelector('.comment-list').textContent='Faallooyinka hadda lama soo qaadi karin.';console.error(commentsRes.error)}
    else {const list=section.querySelector('.comment-list');list.innerHTML=commentsRes.data.length?commentsRes.data.map(c=>`<article class="guest-comment"><b>${esc(c.guest_name)}</b><p>${esc(c.body)}</p><small>${new Date(c.created_at).toLocaleDateString()}</small></article>`).join(''): '<p class="community-note">Weli faallo la oggolaaday ma jirto.</p>'}
    if(reactionsRes.error){console.error(reactionsRes.error);return}
    const counts={}; emojis.forEach(x=>counts[x]=0); reactionsRes.data.forEach(r=>{if(counts[r.emoji]!==undefined)counts[r.emoji]++});
    section.querySelectorAll('[data-count]').forEach(el=>el.textContent=counts[el.dataset.count]||0);
    const my=localStorage.getItem('bs_react_'+key); if(my)section.querySelector(`[data-react="${my}"]`)?.classList.add('selected');
  }
  document.addEventListener('click',async e=>{
    const btn=e.target.closest('[data-react]'); if(!btn||!client)return;
    const section=btn.closest('.episode-community'),key=section?.dataset.community;if(!key)return;
    btn.disabled=true;
    const emoji=btn.dataset.react;
    const {error}=await client.from('episode_reactions').upsert({episode_key:key,visitor_id:visitorId(),emoji},{onConflict:'episode_key,visitor_id'});
    btn.disabled=false;
    if(error){alert('Reaction lama kaydin. Mar kale isku day.');console.error(error);return}
    localStorage.setItem('bs_react_'+key,emoji);await loadEpisodeCommunity(btn.closest('.episode-card'),key);
  });
  document.addEventListener('submit',async e=>{
    const form=e.target.closest('.guest-comment-form');if(!form||!client)return;e.preventDefault();
    const f=new FormData(form),name=String(f.get('guest_name')||'').trim(),body=String(f.get('body')||'').trim(),feedback=form.querySelector('.community-feedback'),key=form.closest('.episode-community').dataset.community;
    if(f.get('website'))return;
    if(name.length<2||body.length<2||body.length>500){feedback.textContent='Magaca ama faallada hubi.';return}
    const last=Number(localStorage.getItem('bs_comment_time')||0);if(Date.now()-last<30000){feedback.textContent='Sug 30 ilbiriqsi ka hor faallo kale.';return}
    const submit=form.querySelector('button[type="submit"]');submit.disabled=true;feedback.textContent='Waa la dirayaa...';
    const {error}=await client.from('episode_comments').insert({episode_key:key,guest_name:name,body,status:'pending'});
    submit.disabled=false;
    if(error){feedback.textContent='Faallada lama dirin. Isku day mar kale.';console.error(error);return}
    localStorage.setItem('bs_comment_time',String(Date.now()));form.reset();feedback.textContent='Mahadsanid! Faalladaada waa la helay, waxay sugaysaa hubin.';
  });
  async function submitAudition(application){
    if(!client) return {ok:false, reason:'not_configured'};
    const {error}=await client.from('audition_applications').insert({
      applicant_name:String(application.name||'').trim(),
      contact:String(application.contact||'').trim(),
      desired_role:String(application.role||'').trim(),
      experience:String(application.experience||'').trim(),
      message:String(application.message||'').trim(),
      status:'new'
    });
    if(error){console.error(error);return {ok:false,reason:'send_failed'}}
    return {ok:true};
  }
  async function refreshAdmin(){
    const box=document.getElementById('communityAdminStats');if(!box)return;
    if(!client){box.innerHTML=notice('Marka Supabase la xiro, tirada comments-ka iyo reactions-ka halkan ayay ka muuqan doonaan.');return}
    const [c,r]=await Promise.all([client.from('episode_comments').select('id',{count:'exact',head:true}).eq('status','approved'),client.from('episode_reactions').select('id',{count:'exact',head:true})]);
    box.innerHTML=`<div class="community-admin-stats"><div><b>${c.count??'—'}</b><span>Faallooyin la oggolaaday</span></div><div><b>${r.count??'—'}</b><span>Reactions guud</span></div></div><p class="community-note">Faallooyinka sugaya hubinta ka maamul Supabase → Table Editor → episode_comments. U beddel status-ka pending una beddel approved si ay website-ka uga muuqdaan.</p>`;
  }
  window.BSCommunity={mountEpisodes,refreshAdmin,submitAudition};
})();
