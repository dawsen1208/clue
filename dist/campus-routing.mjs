import {buildings} from './data.mjs';
import {mapToGeo} from './core.mjs';

// Points are read from the supplied map artwork, not surveyed entrances.
const entries=[
['station','University Station','大学火车站',234,596],['north','North Gate','北门',510,449],['south','South Gate','南门',674,910],['green','Green Heart','Green Heart',552,608],
['R0','The Harding Building',543,729],['R1','Law Building',507,724],['R2','Frankland Building',442,720],['R3','Hills Building',437,771],['R4','Aston Webb – Lapworth Museum',473,780],['R5','Aston Webb – B Block',498,801],['R7','Aston Webb – Student Hub',564,822],['R8','Physics West',606,772],['R9','Nuffield',634,784],['R10','Physics East',665,805],['R11','Medical Physics',614,859],['R12','Bramall Music Building',579,806],['R14','Barber Institute of Fine Arts',697,699],['R15','Watson Building',631,686],['R17','Ashley Building',668,616],['R19','Education Building',740,595],['R20','J G Smith Building',654,519],['R21','Muirhead Tower',614,583],['R23','University Centre',454,644],['R24','Green Heart Forum',469,672],['R26','Geography and Environmental Sciences',304,664],['R27','Biosciences Building',355,650],['R28','Murray Learning Centre',271,677],['R29','The Alan Walters Building',631,515],['R31','Collaborative Teaching Laboratory',616,557],['R33','Fry Building',675,551],['R34','Cuore',587,583],['R35','Molecular Sciences Building',393,587],['R36','Community Safety Lodge',561,499],['R37','Wellbeing Lodge',595,505],['R38','Aston Webb Dome and Semi-Circle',530,809],['R39','Aston Webb Semi-Circle (West)',474,746],['R40','Security',506,819],
['B1','Medical School',120,536],['B2','Institute of Biomedical Research',36,526],['B3','Heritage Building',72,438],['B4','Robert Aitken Institute for Clinical Research',212,420],['B5','Denis Howell Building',248,438],['B6','Institute of Research and Development',392,354],['B7','90 Vincent Drive',318,353],['B8','Henry Wellcome Building',241,316],['B9','University Medical Practice',263,97],['B10','Advanced Therapies Facility',60,486],['B11','Biomedical Innovation Hub',398,417],['B13','Wolfson Centre for Medical Education',75,534],['B14','Medical School Extension',34,566],['B15','Old Queen Elizabeth Hospital',130,436],['B17','13 Pritchatts Road',278,193],['B18','Information and Computer Technology',359,403],['B21','Cancer Immunology Building',244,419],
['G1','32 Pritchatts Road',489,369],['G2','31 Pritchatts Road',501,402],['G3','European Research Institute',520,393],['G4','3 Elms Road',530,350],['G5','Computer Centre',604,270],['G6','Metallurgy and Materials',576,396],['G7','IRC Net Shape Laboratory',631,430],['G8','Gisbert Kapp Building',664,434],['G9','52 Pritchatts Road',701,471],['G10','Institute of Advanced Studies',756,478],['G11','Maples Nursery',884,463],['G12','Winterbourne House and Garden',910,427],['G13','Hornton Grange',758,403],['G14','Garth House',704,299],['G15','Westmere',820,335],['G16','Lucas House',859,275],['G17','Peter Scott House',837,251],['G18','Priorsfield',802,240],['G19','Park House',778,168],['G20','Wolfson Advanced Glasshouses',678,135],['G22','Elms Day Nursery',707,84],['G23','Edgbaston Park Hotel and Conference Centre',689,365],['G24','Centre for Human Brain Health',704,413],['G25','Environmental Research Facility',630,207],['G26','Plasma Furnace',568,335],['G27','Elms Glasshouses',683,123],
['Y1','The Old Gym',404,755],['Y2','Haworth Building',332,732],['Y4','Terrace Huts',421,852],['Y5','Estates West',289,872],['Y6','Maintenance Building',322,890],['Y7','Landscape Services Building',347,917],['Y8','Engineering Building',291,732],['Y11','Chemical Engineering',271,786],['Y12','Biochemical Engineering',225,778],['Y13','Chemical Engineering Workshop',222,802],['Y14','Sport, Exercise and Rehabilitation Sciences',206,876],['Y15','Civil Engineering Laboratories',241,915],['Y16','Y16',208,698],['Y17','Public Health',204,737],['Y18','Bournbrook Sports Pavilion',364,975],['Y19','NBIF',208,922],['Y20','UKRRIN',273,746],
['O2','St Francis Hall',769,803],['O3','University House',831,773],['O4','Ash House',848,905],['O5','Beech House',876,892],['O6','Cedar House',900,880],['O7','Sport & Fitness',760,893],['O8','Fir House',821,850],['O9','Elm House',865,833],['O10','Business School',890,748],
['oakley','Oakley Court',167,74],['ashcroft','Ashcroft',141,180],['prit-house','Pritchatts House',226,143],['prit-village','Pritchatts Park Village',164,159],['spinney','The Spinney',230,220],['bournbrook','Bournbrook Student Accommodation',286,972],['jarratt','Jarratt Hall',802,1010]
];
export const originPoints=[...buildings,...entries.map(row=>{
 const [id,name,zh,x,y]=row.length===4?[row[0],row[1],row[1],row[2],row[3]]:row;
 const p={id,name,zh,x:x+786,y:y+47};
 return {...p,...mapToGeo(p),kind:['station','north','south','green'].includes(id)?'landmark':'building'};
})];
export const sameBuilding=(origin,place)=>Boolean(origin?.id&&origin.id===place?.building);
export const initialGuideStage=(origin,place,demo)=>sameBuilding(origin,place)?(demo?2:1):0;

const junctions=[[234,606],[277,627],[340,621],[428,607],[484,619],[551,630],[608,628],[664,625],[719,646],[727,728],[704,789],[672,851],[611,877],[542,866],[453,859],[398,850],[313,866],[282,811],[274,753],[248,683],[501,479],[454,539],[432,581],[518,561],[570,543],[602,543],[611,568],[612,607],[666,720],[610,708],[546,708],[495,680],[675,918],[217,596],[313,500],[406,387],[331,257],[300,110],[673,65],[739,196],[776,320],[791,468],[743,530],[756,596],[850,744],[842,896],[737,966],[206,1000],[70,845],[125,646],[220,397],[445,300],[510,170],[593,82]].map(([x,y])=>({x:x+786,y:y+47}));
const main=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,1],[20,21,22,3],[21,23,24,25,26,27,6],[8,28,29,30,31,4],[5,30,13],[9,28,10],[11,32,46,45,44,9],[0,33,49,48,47,16],[33,34,35,36,37,53,38,39,40,41,42,43,8],[34,50,36],[35,51,52,53],[42,25],[43,44]];
const edges=main.flatMap(chain=>chain.slice(1).map((id,i)=>[chain[i],id,true]));
edges.push([27,29,false],[31,14,false]);
const gap=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const nearest=point=>junctions.reduce((best,p,i)=>gap(point,p)<gap(point,junctions[best])?i:best,0);
export function walkingRoute(origin,destination,stepFree=false){
 if(!origin||!destination)return null;
 if(origin.id===destination.id)return {points:[origin],length:0};
 const start=nearest(origin),end=nearest(destination),d=junctions.map(()=>Infinity),prev=[],open=new Set(junctions.map((_,i)=>i));
 d[start]=0;
 while(open.size){
  const u=[...open].reduce((a,b)=>d[a]<=d[b]?a:b);
  if(!Number.isFinite(d[u])||u===end)break;
  open.delete(u);
  for(const [a,b,level] of edges){
   if(stepFree&&!level)continue;
   const v=a===u?b:b===u?a:-1;
   if(!open.has(v))continue;
   const cost=d[u]+gap(junctions[u],junctions[v]);
   if(cost<d[v]){d[v]=cost;prev[v]=u;}
  }
 }
 if(!Number.isFinite(d[end]))return null;
 const path=[end];while(path[0]!==start)path.unshift(prev[path[0]]);
 return {points:[origin,...path.map(i=>junctions[i]),destination],length:d[end]+gap(origin,junctions[start])+gap(destination,junctions[end])};
}
// Deliberately narrow, explicit simulated access catalog. Nothing here certifies physical access.
const accessBuildings=new Set(['R30','R32']);
const accessOrigins=new Set(['R30','R32','green','station','north','south']);
export function accessMatch(place,origin){
 return !!origin&&!place.sample&&accessOrigins.has(origin.id)&&accessBuildings.has(place.building)&&
   (place.type!=='toilet'||place.accessible===true)&&['G','UG','1','4'].includes(place.floor);
}
export function closestToilet(places,origin,{stepFree=false,adapted=false}={}){
 return places.filter(p=>p.type==='toilet'&&(!adapted||p.accessible===true)&&(!stepFree||accessMatch(p,origin)))
  .map(place=>({place,path:walkingRoute(origin,originPoints.find(b=>b.id===place.building),stepFree)}))
  .filter(p=>p.path).sort((a,b)=>a.path.length-b.path.length)[0]?.place||null;
}
export function planGeometry(building,floor){
 const cols=building.split('').reduce((h,c)=>h*31+c.charCodeAt(0),0);
 const level=floor==='G'?0:floor==='UG'?1:floor==='LG'?-1:Number(floor)+2;
 const seed=(cols*17+level*13)>>>0;
 const rooms=4+seed%4, corridor=102+(seed%27), bend=150+(seed%110);
 return {rooms,corridor,bend,flip:seed%2===0,seed};
}

