import moment from 'dayjs';

const toTime = timestamp => moment(timestamp).format('HH:mm');

export const normalizeScheduleData = (originScheduleData, savedSchedule = {}) => ({
  ...originScheduleData,
  time: `${toTime(originScheduleData.started_at * 1000)} - ${toTime(originScheduleData.ended_at * 1000)}`,
  saved: Boolean(savedSchedule[originScheduleData.session_id]),
  speaker: originScheduleData.speakers.map(s=>s.name).join(' | '),
  speaker_e: originScheduleData.speakers.map(s=>s.name_e).join(' | '),
  title: originScheduleData.topic,
  title_e: originScheduleData.topic_e,
});

export const normalizePeriodData = originPeriodData => ({
  title: originPeriodData.event,
  time: `${toTime(originPeriodData.started_at * 1000)} - ${toTime(originPeriodData.ended_at * 1000)}`,
});