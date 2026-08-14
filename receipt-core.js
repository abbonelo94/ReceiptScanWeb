export function parseReceiptItems(text){
  const result=[];
  const skip=/^(итого|всего|сумма|наличн|безнал|скидка|ндс|кассир|чек|спасибо|к оплате|оплат|плат|карта|сдача|налог|адрес|тел|инн|рн ккт|№|док|авто|auto|терминал|картой)/i;
  const number=s=>Number(String(s).replace(/\s/g,'').replace(',', '.'));
  for(const raw of String(text||'').split(/\r?\n/)){
    let line=raw.trim().replace(/\s+/g,' ');
    if(!line||skip.test(line)) continue;
    line=line.replace(/(?<=\d)[ОOоo](?=\d)/g,'0');
    let m=line.match(/^(.+?)\s+(\d+(?:[,.]\d+)?)\s*[xх×*]\s*(\d+(?:[,.]\d+)?)\s*(?:=\s*(\d+(?:[,.]\d+)?))?\s*(?:р\.?|руб\.?)?$/i);
    if(m){
      const qty=number(m[2]), total=number(m[4]||m[3]);
      if(qty>0&&total>0) result.push({name:cleanName(m[1]),qty,price:m[4]?round(total/qty):round(total),cat:'Другое'});
      continue;
    }
    m=line.match(/^(.+?)\s+(\d+(?:[,.]\d+)?)\s*(?:₽|руб\.?|р\.?)?$/i);
    if(m){const price=number(m[2]);if(price>0&&hasLetters(m[1])&&isItemName(m[1])&&!/^(итого|всего|сумма|док|номер|дата|время)/i.test(m[1]))result.push({name:cleanName(m[1]),qty:1,price:round(price),cat:'Другое'});continue}
    m=line.match(/^(.+?);\s*(\d+(?:[,.]\d+)?)\s*;\s*(\d+(?:[,.]\d+)?)(?:\s*;\s*(.+))?$/);
    if(m){const qty=number(m[2]),price=number(m[3]);if(qty>0&&price>0&&hasLetters(m[1])&&isItemName(m[1]))result.push({name:cleanName(m[1]),qty,price:round(price),cat:m[4]?.trim()||'Другое'});}
  }
  return result.filter(x=>x.name.length>1);
}
function hasLetters(s){return /[А-Яа-яA-Za-z]/.test(s)}
function isItemName(s){let x=String(s).trim();if(/[|¦°¢»«©®]/.test(x))return false;let letters=(x.match(/[А-Яа-яA-Za-z]/g)||[]).length;return letters>=3&&x.length<=80}
function cleanName(s){return s.replace(/^\d+[.)\s-]+/,'').replace(/\s{2,}/g,' ').trim()}
function round(n){return Math.round(n*100)/100}
