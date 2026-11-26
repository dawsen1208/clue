// Functional rooms shown as icons on the map before the user taps a building.
// SIMULATED DATA (模拟数据) for the design demo: added to test the "see what's inside" interaction.
// Locations and floors are NOT verified and must not be read as research data.
export const facilityTypes={
 toilet:{en:'Toilet',zh:'厕所',color:'#0b8043'},
 cafe:{en:'Café',zh:'咖啡厅',color:'#8d5b2c'},
 print:{en:'Printing',zh:'打印',color:'#5f6368'},
 study:{en:'Study space',zh:'自习空间',color:'#7b3fa0'},
 lift:{en:'Lift',zh:'电梯',color:'#d35400'}
};
// White glyphs drawn inside a 9-unit badge circle.
export const facilityGlyph={
 toilet:'<text y="3" text-anchor="middle" font-size="8" font-weight="800" fill="#fff" stroke="none">WC</text>',
 cafe:'<path d="M-5 -3h7v3a3.5 3.5 0 0 1-7 0z M2 -2h1.5a1.8 1.8 0 0 1 0 3.6H2" fill="none" stroke="#fff" stroke-width="1.6"/>',
 print:'<path d="M-3.5 -5h7v3h-7z M-5.5 -2h11v5h-11z M-3.5 1.5h7v4h-7z" fill="#fff" stroke="currentColor" stroke-width=".8"/>',
 study:'<path d="M-5.5 -3.5q2.75-1.4 5.5 0q2.75-1.4 5.5 0v7.5q-2.75-1.4-5.5 0q-2.75-1.4-5.5 0z M0 -3.5v7.5" fill="none" stroke="#fff" stroke-width="1.4"/>',
 lift:'<path d="M-3 -1l3-4.5l3 4.5z M-3 1l3 4.5l3-4.5z" fill="#fff"/>'
};
const plan={
 R30:[['cafe','Café','咖啡厅','G'],['print','Print & copy point','打印复印点','G'],['study','Silent study area','安静自习区','1'],['lift','Lifts','电梯','G']],
 R32:[['cafe','Café','咖啡厅','G'],['study','Open study space','开放自习区','1'],['print','Print point','打印点','UG'],['lift','Lifts','电梯','G']],
 R16:[['print','Print point','打印点','G'],['lift','Lift','电梯','G']],
 R18:[['lift','Lift','电梯','G']],
 R13:[['study','Study room','自习室','1'],['lift','Lift','电梯','G']],
 Y9:[['print','Print point','打印点','G'],['study','Computer lab (open access)','开放机房','G'],['lift','Lift','电梯','G']],
 Y3:[['cafe','Coffee point','咖啡点','G'],['lift','Lift','电梯','G']],
 R25:[],
 R6:[['cafe','Café','咖啡厅','G']],
 O1:[['cafe','Café','咖啡厅','G'],['print','Print shop','打印店','G'],['study','Study space','自习空间','1'],['lift','Lift','电梯','G']]
};
const aliases={cafe:'cafe coffee café 咖啡 咖啡厅 餐饮',print:'print printing printer copy 打印 复印',study:'study quiet desk 自习 学习 自习室',lift:'lift elevator 电梯 升降梯'};
export function sampleFacilities(){
 return Object.entries(plan).flatMap(([building,list])=>list.map(([type,name,zh,floor])=>({
  id:`fac-${building.toLowerCase()}-${type}`,type,building,name,zh,aliases:aliases[type],floor,source:null,accessible:false,genderNeutral:false,
  scenario:true,sample:true,facility:true,originalFloor:null,availability:'scenario-available',
  note:['模拟数据：示例功能房间，仅用于设计演示；实际位置与楼层并非真实。','Simulated data: a sample facility for this design demo. Its location and floor are not real.']
 })));
}
export const facilityOrder=['toilet','cafe','print','study','lift'];
// Types present in a building, toilets first. Ordinary rooms get no icon.
export const facilitiesIn=(directory,building)=>facilityOrder.filter(t=>directory.some(p=>p.building===building&&p.type===t));
