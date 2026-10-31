/** Atomic Mass Detective — chemistry engine. Reference masses in unified atomic mass units. */
export const U_GRAMS = 1.66053906660e-24;
export const ELEMENTS = Object.freeze({
 H:{name:'ไฮโดรเจน',z:1,ar:1.008},He:{name:'ฮีเลียม',z:2,ar:4.002602},Li:{name:'ลิเทียม',z:3,ar:6.94},Be:{name:'เบริลเลียม',z:4,ar:9.0121831},B:{name:'โบรอน',z:5,ar:10.81},C:{name:'คาร์บอน',z:6,ar:12.011},N:{name:'ไนโตรเจน',z:7,ar:14.007},O:{name:'ออกซิเจน',z:8,ar:15.999},F:{name:'ฟลูออรีน',z:9,ar:18.998403163},Ne:{name:'นีออน',z:10,ar:20.1797},Na:{name:'โซเดียม',z:11,ar:22.98976928},Mg:{name:'แมกนีเซียม',z:12,ar:24.305},Al:{name:'อะลูมิเนียม',z:13,ar:26.9815385},Si:{name:'ซิลิคอน',z:14,ar:28.085},P:{name:'ฟอสฟอรัส',z:15,ar:30.973761998},S:{name:'กำมะถัน',z:16,ar:32.06},Cl:{name:'คลอรีน',z:17,ar:35.45},K:{name:'โพแทสเซียม',z:19,ar:39.0983},Ca:{name:'แคลเซียม',z:20,ar:40.078},Fe:{name:'เหล็ก',z:26,ar:55.845}
});
export const ISOTOPES=Object.freeze({
 'H-1':{z:1,mass:1.00782503223},'H-2':{z:1,mass:2.01410177812},'He-4':{z:2,mass:4.00260325413},'C-12':{z:6,mass:12},'C-13':{z:6,mass:13.00335483507},'N-14':{z:7,mass:14.00307400443},'O-16':{z:8,mass:15.99491461957},'O-17':{z:8,mass:16.99913175650},'O-18':{z:8,mass:17.99915961286},'Cl-35':{z:17,mass:34.968852682},'Cl-37':{z:17,mass:36.965902602}
});
export const MOLECULES=Object.freeze({H2O:{name:'น้ำ',formula:{H:2,O:1}},CO2:{name:'คาร์บอนไดออกไซด์',formula:{C:1,O:2}},NH3:{name:'แอมโมเนีย',formula:{N:1,H:3}},CH4:{name:'มีเทน',formula:{C:1,H:4}},O2:{name:'ออกซิเจน',formula:{O:2}},H2:{name:'ไฮโดรเจน',formula:{H:2}},H2O2:{name:'ไฮโดรเจนเปอร์ออกไซด์',formula:{H:2,O:2}},C6H12O6:{name:'กลูโคส',formula:{C:6,H:12,O:6}},NaCl:{name:'โซเดียมคลอไรด์ (สารประกอบไอออนิก)',formula:{Na:1,Cl:1},ionic:true},CaCO3:{name:'แคลเซียมคาร์บอเนต (สารประกอบไอออนิก)',formula:{Ca:1,C:1,O:3},ionic:true}});
export const approxMassNumber=(protons,neutrons)=>Number(protons)+Number(neutrons);
export const atomicMassGrams=(u)=>u*U_GRAMS;
export function relativeAtomicMassFromGrams(g){if(!Number.isFinite(g)||g<0)throw Error('มวลต้องเป็นจำนวนไม่ติดลบ');return g/U_GRAMS;}
export function weightedMass(items){if(!Array.isArray(items)||!items.length)throw Error('ไม่มีข้อมูลไอโซโทป');const sum=items.reduce((s,x)=>s+Number(x.fraction),0);if(items.some(x=>!Number.isFinite(x.mass)||!Number.isFinite(x.fraction)||x.fraction<0)||Math.abs(sum-1)>1e-7)throw Error('สัดส่วนไอโซโทปต้องรวมเป็น 100%');return items.reduce((s,x)=>s+x.mass*x.fraction,0);}
export function formulaMass(formula){return Object.entries(formula).reduce((s,[symbol,count])=>{if(!ELEMENTS[symbol]||!Number.isInteger(count)||count<=0)throw Error('สูตรสารไม่ถูกต้อง');return s+ELEMENTS[symbol].ar*count;},0);}
export function formatNum(n,d=4){return Number(n).toLocaleString('th-TH',{maximumFractionDigits:d});}
export function answerClose(value,expected,tolerance=.012){return Number.isFinite(value)&&Math.abs(value-expected)<=Math.max(Math.abs(expected)*tolerance,.02);}
export function elementFromZ(z){return Object.entries(ELEMENTS).find(([,e])=>e.z===Number(z))?.[0]||'X';}
export function newChallenge(lab,seed=0){const v=seed%4;switch(Number(lab)){
 case 1:{const list=[{p:6,n:7,e:6},{p:8,n:8,e:10},{p:7,n:7,e:7},{p:6,n:6,e:5}];const x=list[v];return {question:`อะตอมที่มีโปรตอน ${x.p} นิวตรอน ${x.n} และอิเล็กตรอน ${x.e} มีเลขมวลเท่าใด?`,expected:x.p+x.n,unit:'',hint:'เลขมวล = จำนวนโปรตอน + จำนวนนิวตรอน',why:'อิเล็กตรอนไม่อยู่ในการคำนวณเลขมวล'};}
 case 2:{const x=[12,16,23,56][v];return{question:`อะตอมสมมติมีมวล ${x} u จงประมาณมวลหนึ่งอะตอมในหน่วย 10⁻²⁴ กรัม (ตอบตัวเลข)`,expected:x*1.66053906660,unit:'×10⁻²⁴ g',hint:'มวลจริง = มวลใน u × 1.66054 × 10⁻²⁴ กรัม',why:'ค่าประมาณนี้ไม่ใช่การระบุไอโซโทปจริง'};}
 case 3:{const a=[20,35,50,80][v];return{question:`ไอโซโทปสมมติ X-10 (มวล 10 u) มี ${a}% และ X-11 (มวล 11 u) มี ${100-a}% จงหามวลเฉลี่ย (u)`,expected:10*a/100+11*(100-a)/100,unit:'u',hint:'มวลเฉลี่ย = Σ(มวลไอโซโทป × ความชุกชุมแบบทศนิยม)',why:'ค่านี้เป็นค่าเฉลี่ยถ่วงน้ำหนัก ไม่ได้หมายถึงอะตอมที่มีเลขมวลเป็นทศนิยม'};}
 case 4:{const k=['H2O','CO2','NH3','CH4'][v];return{question:`หามวลโมเลกุลสัมพัทธ์ของ ${k} จากค่าในแอป (ตอบตัวเลข)`,expected:formulaMass(MOLECULES[k].formula),unit:'ไม่มีหน่วย',hint:'นำมวลอะตอมสัมพัทธ์คูณจำนวนอะตอมแล้วบวกกัน',why:'มวลโมเลกุลสัมพัทธ์ Mr ไม่มีหน่วย'};}
 case 5:{const x=[12,16,24,56][v];return{question:`มวลอะตอมของธาตุ X หนึ่งอะตอม = ${(x*1.66053906660).toFixed(3)} ×10⁻²⁴ g จงประมาณมวลอะตอมสัมพัทธ์ของ X`,expected:x,unit:'ไม่มีหน่วย',hint:'หารมวลอะตอมจริงด้วย 1.66054 ×10⁻²⁴ กรัม',why:'Ar เป็นอัตราส่วนมวล จึงไม่มีหน่วย'};}
 default:{const k=['H2O2','O2','H2','CO2'][v];return{question:`โจทย์รวม: หามวลโมเลกุลสัมพัทธ์ของ ${k}`,expected:formulaMass(MOLECULES[k].formula),unit:'ไม่มีหน่วย',hint:'เขียนชนิดและจำนวนอะตอมให้ครบก่อนคำนวณ',why:'การนับจำนวนอะตอมในสูตรเป็นขั้นตอนสำคัญ'};}
 }}
