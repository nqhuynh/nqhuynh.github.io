export const dateLabel = value => new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',month:'short',day:'numeric'}).format(new Date(value));
export const longDate = value => new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date(value));
export const timeLabel = value => new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'2-digit'}).format(new Date(value));
export const nextMeeting = (meetings,now=new Date()) => [...meetings].sort((a,b)=>new Date(a.start)-new Date(b.start)).find(m=>new Date(m.end)>now);
const utc = value => new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
const escapeICS = value => String(value).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function fold(line){let result='',length=0;for(const char of line){const n=new TextEncoder().encode(char).length;if(length+n>75){result+='\r\n ';length=1;}result+=char;length+=n;}return result;}
export function icsFor(m,now=new Date()){
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//One More Thing//OU Economics//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:omt-${m.id}@nghiemhuynh.com`,`DTSTAMP:${utc(now)}`,`DTSTART:${utc(m.start)}`,`DTEND:${utc(m.end)}`,`SUMMARY:${escapeICS('One More Thing — '+m.presenter)}`,`LOCATION:${escapeICS(m.location+', 308 Cate Center Drive, Norman, OK')}`,`DESCRIPTION:${escapeICS('OU Economics research brown bag. '+(m.tentative?'Tentative date. ':'')+'Catering: '+(m.catering||'To be announced')+'. Contact: nqh@ou.edu. Check the group calendar for changes.')}`,`STATUS:${m.tentative?'TENTATIVE':'CONFIRMED'}`,'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:One More Thing tomorrow','TRIGGER:-P1D','END:VALARM','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:One More Thing in one hour','TRIGGER:-PT1H','END:VALARM','END:VEVENT','END:VCALENDAR'];
 return lines.map(fold).join('\r\n')+'\r\n';
}
export function googleURL(m){const q=new URLSearchParams({action:'TEMPLATE',text:'One More Thing — '+m.presenter,dates:utc(m.start)+'/'+utc(m.end),ctz:'America/Chicago',location:m.location+', 308 Cate Center Drive, Norman, OK',details:'OU Economics research brown bag. '+(m.tentative?'Tentative date. ':'')+'Catering: '+(m.catering||'To be announced')+'. Check the group calendar for changes.'});return 'https://calendar.google.com/calendar/render?'+q;}
export function calendarFor(meetings, now = new Date()) {
 const events = meetings.map(meeting => {
  const calendar = icsFor(meeting, now);
  return calendar.slice(calendar.indexOf('BEGIN:VEVENT'), calendar.lastIndexOf('END:VCALENDAR'));
 });
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//One More Thing//OU Economics//EN','CALSCALE:GREGORIAN','X-WR-CALNAME:One More Thing - Fall 2026'].join('\r\n')+'\r\n'+events.join('')+'END:VCALENDAR\r\n';
}
