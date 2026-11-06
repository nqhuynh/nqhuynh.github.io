import { settings, meetings, people } from './data.js?v=fewer-links-20261106';
import { dateLabel, timeLabel, nextMeeting } from './calendar.js?v=fewer-links-20261106';
const $ = selector => document.querySelector(selector);
const current = nextMeeting(meetings);
$('#subscribe').href = settings.calendarSubscribe;
for (const meeting of meetings) {
  const row = document.createElement('tr');
  if (meeting === current) row.className = 'next-row';
  const values = [dateLabel(meeting.start), `${timeLabel(meeting.start)}–${timeLabel(meeting.end)}`, meeting.presenter];
  for (const [index, value] of values.entries()) {
    const cell = document.createElement('td');
    cell.textContent = value;
    if (index === 0 && meeting === current) {
      const label = document.createElement('span');
      label.className = 'next-label';
      label.textContent = 'NEXT MEETING';
      cell.append(label);
    }
    if (index === 0 && meeting.tentative) {
      const label = document.createElement('span');
      label.className = 'tentative';
      label.textContent = 'Tentative';
      cell.append(label);
    }
    row.append(cell);
  }
  const rsvpCell = document.createElement('td');
  if (new Date(meeting.end) > new Date()) {
    const rsvp = document.createElement('a');
    rsvp.href = settings.rsvpForm;
    rsvp.textContent = 'RSVP';
    rsvp.setAttribute('aria-label', `RSVP for ${meeting.presenter}, ${dateLabel(meeting.start)}`);
    rsvpCell.append(rsvp);
  } else rsvpCell.textContent = '—';
  row.append(rsvpCell);
  $('#schedule-body').append(row);
}
$('#participants').textContent = Object.keys(people).join(', ')+'.';
