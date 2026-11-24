'use strict';
const $ = (id) => document.getElementById(id);
const state = {stage:null, concern:null};
const serviceDetails = {
  advisory:{title:'Independent Technology Advisory',description:'I help CEOs, investors, and executive teams make confident technology decisions without committing significant resources to the wrong platforms, vendors, or architectural approaches.'},
  scalability:{title:'Product Scalability',description:'I help founders and growing businesses turn promising products into scalable platforms without letting technical limitations, fragile architecture, or operational growing pains hold them back.'},
  leadership:{title:'Fractional CTO Leadership',description:'I help companies access experienced executive technology leadership to guide growth, solve difficult problems, and deliver critical initiatives without the cost or long-term commitment of a full-time executive.'},
  ai:{title:'Practical AI Transformation',description:'I help business and technology leaders turn AI opportunities into measurable business results without sacrificing governance, security, or accountability.'},
  strategy:{title:'Business-Aligned Technology Strategy',description:'I help executive teams turn business priorities into actionable technology strategies and investments without losing sight of measurable outcomes, costs, or long-term direction.'},
  productivity:{title:'Team & Organizational Productivity',description:'I help technology leaders improve productivity, accountability, and delivery performance without adding unnecessary headcount, complexity, or bureaucracy.'},
  architecture:{title:'Architecture Modernization',description:'I help technology leaders untangle complicated environments, eliminate unnecessary dependencies, and establish simpler architectures without disrupting systems that already deliver value.'},
  cost:{title:'Technology Cost & Efficiency',description:'I help CEOs, CFOs, and technology leaders reduce technology spending and simplify their systems without sacrificing the capabilities their businesses depend on.'}
};
const stageNames={prototype:'Prototyping / pre-launch',scaling:'Ready to scale',established:'Established'};
const concernNames={knowledge:'Knowledge & direction',growth:'Growth & scale',efficiency:'Efficiency & delivery',cost:'Cost & simplification'};
// The decision table reflects the supplied flowchart. Additional combinations have sensible
// deterministic matches so each of the four concerns works for all company stages.
const matches = {
  prototype:{
    knowledge:['advisory'],
    growth:['scalability'],
    efficiency:['advisory','architecture'],
    cost:['advisory','cost']
  },
  scaling:{
    knowledge:['leadership'],
    growth:['scalability','ai'],
    efficiency:['productivity','leadership','architecture'],
    cost:['cost','architecture']
  },
  established:{
    knowledge:['strategy','leadership'],
    growth:['strategy','scalability','ai'],
    efficiency:['productivity','architecture','strategy','ai'],
    cost:['cost','architecture']
  }
};
const rationales={
  advisory:'Independent guidance helps you make the right foundational decisions before investing heavily in technology.',
  scalability:'A resilient product and scalable operating model allow growth without turning every new customer into a new technical problem.',
  leadership:'Experienced fractional leadership provides direction and accountability while you build the right capabilities.',
  ai:'Practical AI is most useful when tied to specific outcomes, clear governance, and measurable improvements.',
  strategy:'A clear technology strategy connects day-to-day decisions to the outcomes the business needs.',
  productivity:'Streamlined workflows and clearer ownership help teams deliver more without defaulting to more headcount.',
  architecture:'Untangling dependencies and modernizing architecture can remove friction without disruptive reinvention.',
  cost:'A disciplined look at licensing, platforms, and overlapping systems can reduce spend while preserving what matters.'
};
function step(name,progress,label,percent){
  ['step-one','step-two','results'].forEach(id=>$(id).classList.toggle('hidden',id!==name));
  $('progress-fill').style.width=progress;
  $('step-label').textContent=label;
  $('step-percent').textContent=percent;
}
function chooseStage(stage){
  state.stage=stage;state.concern=null;
  $('stage-understanding').textContent=`You selected: ${stageNames[stage]}.`;
  step('step-two','55%','02 / YOUR CHALLENGE','ALMOST THERE.');
  document.querySelector('.panel').scrollIntoView({behavior:'smooth',block:'start'});
}
function chooseConcern(concern){state.concern=concern;showResults();}
function showResults(){
  const {stage,concern}=state;
  step('results','100%','YOUR RESULTS','YOU MADE IT.');
  $('result-intro').textContent=`For an ${stage==='established'?'established':'early or growing'} business prioritizing ${concernNames[concern].toLowerCase()}, these are the areas I'd explore first. The recommendations follow the decision tree, rather than an AI assessment.`;
  const chips=[stageNames[stage],concernNames[concern]];
  $('classifications').replaceChildren(...chips.map(t=>{const e=document.createElement('span');e.className='chip';e.textContent=t;return e;}));
  const container=$('recommendations');container.replaceChildren();
  matches[stage][concern].forEach((id,i)=>{
    const detail=serviceDetails[id];const card=document.createElement('article');card.className='rec';
    const no=document.createElement('div');no.className='rec-number';no.textContent=`FOCUS ${String(i+1).padStart(2,'0')}`;
    const title=document.createElement('h3');title.className='rec-title';title.textContent=detail.title;
    const text=document.createElement('p');text.className='rec-summary';text.textContent=detail.description;
    const why=document.createElement('div');why.className='rec-why';why.textContent=rationales[id];
    card.append(no,title,text,why);container.append(card);
  });
  const subject=encodeURIComponent('Technology assessment follow-up');
  const body=encodeURIComponent(`Hi Marty,\n\nI completed the technology check-in.\n\nCompany stage: ${stageNames[stage]}\nTop priority: ${concernNames[concern]}\nRecommendations: ${matches[stage][concern].map(id=>serviceDetails[id].title).join(', ')}\n\nI'd like to discuss these recommendations.\n`);
  $('contact-link').href=`mailto:marten.vanzwietering@techcxo.com?subject=${subject}&body=${body}`;
  document.querySelector('.panel').scrollIntoView({behavior:'smooth',block:'start'});
}
document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>chooseStage(b.dataset.stage)));
document.querySelectorAll('[data-concern]').forEach(b=>b.addEventListener('click',()=>chooseConcern(b.dataset.concern)));
$('back-one').addEventListener('click',()=>step('step-one','15%','01 / YOUR BUSINESS',"LET'S START HERE."));
$('back-two').addEventListener('click',()=>step('step-two','55%','02 / YOUR CHALLENGE','ALMOST THERE.'));
$('restart').addEventListener('click',()=>{state.stage=null;state.concern=null;step('step-one','15%','01 / YOUR BUSINESS',"LET'S START HERE.");window.scrollTo({top:0,behavior:'smooth'});});
$('copy').addEventListener('click',async()=>{
  const content=`Technology check-in\nStage: ${stageNames[state.stage]}\nPriority: ${concernNames[state.concern]}\n\nRecommendations:\n${matches[state.stage][state.concern].map(id=>`- ${serviceDetails[id].title}: ${serviceDetails[id].description}`).join('\n')}`;
  try{await navigator.clipboard.writeText(content);$('copy').textContent='✓ Copied';setTimeout(()=>$('copy').textContent='Copy my results ↗',1800)}
  catch{$('copy').textContent='Copy unavailable';setTimeout(()=>$('copy').textContent='Copy my results ↗',1800)}
});
