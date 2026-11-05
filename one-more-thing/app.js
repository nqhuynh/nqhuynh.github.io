import { settings, meetings, people } from './data.js?v=google-rsvp-20261105';
import { dateLabel, timeLabel, nextMeeting, icsFor, googleURL } from './calendar.js?v=google-rsvp-20261105';
const $ = selector => document.querySelector(selector);
const current = nextMeeting(meetings);
$('#subscribe').href = settings.calendarSubscribe;
function download(meeting) {
  const url = URL.createObjectURL(new Blob([icsFor(meeting)], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `one-more-thing-${meeting.id}.ics`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
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
    if (index === 0 && new Date(meeting.end) > new Date()) {
      const rsvp = document.createElement('a');
      rsvp.href = 'order.html';
      rsvp.className = 'rsvp-link';
      rsvp.textContent = 'Participate / RSVP';
      rsvp.setAttribute('aria-label', `RSVP for ${meeting.presenter}, ${dateLabel(meeting.start)}`);
      cell.append(rsvp);
    }
    row.append(cell);
  }
  const calendar = document.createElement('td');
  if (new Date(meeting.end) > new Date()) {
    const google = document.createElement('a');
    google.href = googleURL(meeting);
    google.target = '_blank';
    google.rel = 'noopener';
    google.textContent = 'Google';
    google.setAttribute('aria-label', `Add ${meeting.presenter}, ${dateLabel(meeting.start)}, to Google Calendar`);
    const ics = document.createElement('a');
    ics.href = '#';
    ics.textContent = '.ics';
    ics.setAttribute('aria-label', `Download calendar event for ${meeting.presenter}, ${dateLabel(meeting.start)}`);
    ics.addEventListener('click', event => { event.preventDefault(); download(meeting); });
    calendar.append(google, ' · ', ics);
  } else calendar.textContent = '—';
  row.append(calendar);
  $('#schedule-body').append(row);
}
$('#participants').textContent = Object.keys(people).join(', ')+'.';
