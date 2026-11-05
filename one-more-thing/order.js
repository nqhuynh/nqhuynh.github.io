import { settings, meetings } from './data.js?v=plain-names-4cols';
import { nextMeeting, longDate } from './calendar.js?v=plain-names-4cols';
const $ = selector => document.querySelector(selector);
const meeting = nextMeeting(meetings);
if (meeting?.menu) { $('#menu').href = meeting.menu; $('#menu').textContent = meeting.catering+' menu'; } else $('#menu').hidden = true;
$('#meeting-date').textContent = meeting ? longDate(meeting.start) : 'No upcoming meeting is scheduled.';
if (!meeting?.menu) { $('#order-form').hidden = true; if (meeting) $('#meeting-date').textContent = longDate(meeting.start)+': catering will be announced here.'; }
$('#order-form').addEventListener('submit', event => {
 event.preventDefault();
 if (!meeting?.menu) return;
 const values = new FormData(event.currentTarget);
 const name = values.get('name').trim(), items = values.get('items').trim(), notes = values.get('notes').trim();
 if (!name || !items) return;
 const subject = `One More Thing lunch order — ${meeting.id} — ${name}`;
 const body = `Hi Nghiem,\n\nMy order from ${meeting.catering} for ${longDate(meeting.start)}:\n\n${items}${notes ? '\n\nNotes: '+notes : ''}\n\nThanks,\n${name}`;
 $('#email-link').href = `mailto:${settings.organizer}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 $('#outlook-link').href = 'https://outlook.office.com/mail/deeplink/compose?'+new URLSearchParams({to:settings.organizer,subject,body});
 $('#order-text').value = `To: ${settings.organizer}\nSubject: ${subject}\n\n${body}`;
 $('#order-result').hidden = false;
 $('#order-result').scrollIntoView({behavior:'smooth',block:'nearest'});
});
