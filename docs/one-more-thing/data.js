// Update this single file when a meeting or catering plan changes.
// Dates and presenters: "Restarting One More Thing" email thread.
export const settings = {
  organizer: 'nqh@ou.edu',
  calendarId: '01b917a3e046d15d8f446e8abd5b9a67c6807c391ba51d91d120834391979172@group.calendar.google.com',
  calendarSubscribe: 'https://calendar.google.com/calendar/u/0?cid=MDFiOTE3YTNlMDQ2ZDE1ZDhmNDQ2ZThhYmQ1YjlhNjdjNjgwN2MzOTFiYTUxZDkxZDEyMDgzNDM5MTk3OTE3MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
  menu: 'https://www.ubereats.com/store/gia-hoi-baguette/MRgeYXiNV8eTcMdeCk2gBg',
};
export const meetings = [
  { id:'2026-10-02', presenter:'Nghiem Q. Huynh', start:'2026-10-02T13:00:00-05:00', end:'2026-10-02T14:00:00-05:00', location:'CCD1, room 326', catering:'Panera Bread' },
  { id:'2026-10-16', presenter:'Minwoo Hyun', start:'2026-10-16T12:00:00-05:00', end:'2026-10-16T13:00:00-05:00', location:'CCD1, room 326', catering:'Panera Bread' },
  { id:'2026-10-23', presenter:'Christopher Malloy', start:'2026-10-23T13:00:00-05:00', end:'2026-10-23T14:00:00-05:00', location:'CCD1, room 326', catering:'Panera Bread' },
  { id:'2026-10-30', presenter:'Ruoyun Mao', start:'2026-10-30T12:00:00-05:00', end:'2026-10-30T13:00:00-05:00', location:'CCD1, room 326', catering:'Gia Hoi Baguette' },
  { id:'2026-11-06', presenter:'Victoria Mooers', start:'2026-11-06T13:00:00-06:00', end:'2026-11-06T14:00:00-06:00', location:'CCD1, room 326', catering:'Gia Hoi Baguette', menu:settings.menu },
  { id:'2026-12-04', presenter:'Judith Liu', start:'2026-12-04T12:00:00-06:00', end:'2026-12-04T13:00:00-06:00', location:'CCD1, room 326', catering:null, tentative:true },
];

// Personal websites verified against OU faculty listings and the authors’ pages.
export const people = {
 'Nghiem Q. Huynh': 'https://nghiemhuynh.com/',
 'Minwoo Hyun': 'https://minwoo-hyun.github.io/',
 'Judith Liu': 'https://sites.google.com/view/judithliu/home',
 'Christopher Malloy': 'https://chrismalloyecon.com/',
 'Ruoyun Mao': 'https://sites.google.com/view/rmao',
 'Victoria Mooers': 'https://vmooers.github.io/',
 'Tyler Ransom': 'https://tyleransom.github.io/',
};
