// Public seed directory. Room numbers never determine floors automatically.
export const checked='2026-11-12';
export const sources={
 map:{name:'University campus map',url:'https://www.birmingham.ac.uk/contact/campus-map'},
 library:{name:'University Library facilities',url:'https://www.birmingham.ac.uk/libraries/our-libraries/main-library'},
 rooms:{name:'University Library room guide',url:'https://www.birmingham.ac.uk/libraries/using/accessibility/ml-training-accessibility'},
 tlb:{name:'AccessAble · Teaching and Learning Building',url:'https://www.accessable.co.uk/university-of-birmingham/access-guides/teaching-and-learning-building'},
 libraryAccess:{name:'AccessAble · Main Library',url:'https://www.accessable.co.uk/university-of-birmingham/access-guides/library'},
 arts:{name:'University teaching room directory',url:'https://conferences.bham.ac.uk/venues/lecture-theatres/'}
};
export const buildings=[
 {id:'R30',name:'Main Library',zh:'主图书馆',x:1282,y:640,lat:52.4514,lon:-1.9305},
 {id:'R32',name:'Teaching and Learning Building',zh:'教学与学习大楼',x:1308,y:577,lat:52.4521,lon:-1.9320},
 {id:'R16',name:'Arts Building',zh:'文科楼',x:1398,y:685,lat:52.4504,lon:-1.9290},
 {id:'R18',name:'Strathcona Building',zh:'Strathcona 楼',x:1435,y:637,lat:52.4513,lon:-1.9283},
 {id:'R13',name:'Poynting Building',zh:'Poynting 楼',x:1428,y:865,lat:52.4491,lon:-1.9291},
 {id:'Y9',name:'Computer Science',zh:'计算机科学楼',x:1044,y:761,lat:52.4495,lon:-1.9360},
 {id:'Y3',name:'Winifred Hackett Building',zh:'Winifred Hackett 楼',x:1059,y:863,lat:52.4481,lon:-1.9358},
 {id:'R25',name:'Munrow Lecture Theatre',zh:'Munrow 阶梯教室',x:1258,y:501,lat:52.4530,lon:-1.9325},
 {id:'R6',name:'Aston Webb – Great Hall',zh:'Aston Webb · Great Hall',x:1316,y:879,lat:52.4482,lon:-1.9305},
 {id:'O1',name:'Guild of Students',zh:'学生会大楼',x:1516,y:853,lat:52.4482,lon:-1.9255}
];
export const places=[
 {id:'arts127',type:'room',building:'R16',name:'Lecture Room 3 · 127',zh:'Lecture Room 3 · 127',aliases:'ARTS-LR3 ARTS 127 文科 教室',floor:null,source:'arts',note:['房间名称有大学公开目录来源；楼层与具体入口尚待核实。','The university directory lists this room; floor and exact entrance need confirmation.']},
 {id:'library404',type:'room',building:'R30',name:'Training Room 1 · 404',zh:'培训教室 1 · 404',aliases:'training library 404 教室 图书馆',floor:'4',source:'rooms',note:['大学指南将此房间列于 Fourth Floor。请以现场楼层标识为准。','The university guide places this room on the fourth floor. Follow the building’s floor labels.']},
 {id:'library403',type:'room',building:'R30',name:'Training Room 2 · 403',zh:'培训教室 2 · 403',aliases:'training library 403 教室 图书馆',floor:'4',source:'rooms',note:['大学指南将此房间列于 Fourth Floor。','Listed on the fourth floor in the university guide.']},
 {id:'library143',type:'room',building:'R30',name:'Academic Skills Centre · 143',zh:'学术技能中心 · 143',aliases:'library 143 skills 教室 图书馆',floor:'1',source:'rooms',note:['公开指南注明 First Floor；不是通过房间号码推测楼层。','The guide states first floor; the floor is not inferred from the room number.']},
 {id:'strathconaG19',type:'room',building:'R18',name:'Lecture Theatre 3 · G19',zh:'Lecture Theatre 3 · G19',aliases:'STRA-LT3 G19 教室',floor:null,source:null,note:['保留自旧原型的待核对地点；G19 不自动解释为地面层。','An unverified room label retained from the earlier prototype. G19 does not automatically mean ground floor.']},
 {id:'poyntingS02',type:'room',building:'R13',name:'Large Lecture Theatre · S02',zh:'Large Lecture Theatre · S02',aliases:'PYTG-Large LT S02 教室',floor:null,source:null,note:['房间、楼层及入口需要核实，暂不提供室内转向。','Room, floor and entrance need checking; indoor turns are not supplied.']},
 {id:'computerUG04',type:'room',building:'Y9',name:'CPSC-UG04',zh:'CPSC-UG04',aliases:'computer science UG04 计算机 教室',floor:null,source:null,note:['UG04 为原始房间标识，楼层尚未核验。','UG04 is a room label; its floor is not yet checked.']},
 {id:'munrowLT',type:'room',building:'R25',name:'Munrow Lecture Theatre · MUN-LT',zh:'Munrow Lecture Theatre · MUN-LT',aliases:'Munrow Building MUN-LT 教室',floor:null,source:null,note:['建筑对应关系由前期项目确认；楼层与入口仍待现场核对。','Building mapping was confirmed in the earlier project; floor and entrance still need a site check.']},
 {id:'astonLT',type:'room',building:'R6',name:'AWEB-MAINLT',zh:'AWEB-MAINLT',aliases:'Aston Webb Main LT Great Hall 教室',floor:null,source:null,note:['Great Hall 区域仅作建筑查找线索，并非教室入口坐标。','The Great Hall area is a building-finding lead, not the classroom entrance.']},
 {id:'hackettG29',type:'room',building:'Y3',name:'WHB-G29',zh:'WHB-G29',aliases:'winifred hackett WHB-G29 教室',floor:null,source:null,note:['房间标识延续旧原型；楼层未核验。','Room label retained from the earlier prototype; floor unverified.']},
 {id:'libraryWC',type:'toilet',building:'R30',name:'Gender-neutral toilets',zh:'性别中立厕所',aliases:'toilet wc bathroom loo 厕所 卫生间 洗手间',floor:'G',source:'library',genderNeutral:true,accessible:false,note:['大学设施页注明地面层有此类厕所；具体门位需按现场指示寻找。','The university lists these facilities on the ground floor. Use on-site signs for the exact door.']},
 {id:'libraryAccessWC',type:'toilet',building:'R30',name:'Adapted toilet · Ground Floor East',zh:'无障碍厕所 · 地面层东侧',aliases:'toilet wc accessible 厕所 无障碍',floor:'G',source:'libraryAccess',accessible:true,genderNeutral:false,note:['AccessAble 的地面层东侧条目提供设施及通行信息；开放与可用性需现场确认。','Consult the Ground Floor East entry in AccessAble for access details. Current access and availability need checking.']},
 {id:'tlbWC',type:'toilet',building:'R32',name:'Gender-neutral toilets · Upper Ground',zh:'性别中立厕所 · Upper Ground',aliases:'toilet wc bathroom loo TLB 厕所 卫生间',floor:'UG',source:'tlb',genderNeutral:true,accessible:false,note:['指南列出各层的性别中立厕所；此条目聚焦 UG 层。','The guide lists gender-neutral toilets on all levels; this entry focuses on Upper Ground.']},
 {id:'tlbAccessWC',type:'toilet',building:'R32',name:'Adapted toilet · Rear North',zh:'无障碍厕所 · 北侧后部',aliases:'toilet wc accessible TLB 厕所 无障碍',floor:'UG',source:'tlb',accessible:true,genderNeutral:false,note:['指南说明北侧后部 UG 层有无障碍厕所。到达设施的完整路径尚未核验。','The guide describes an adapted toilet at the rear north on UG. A complete route to it is not verified.']}
];
