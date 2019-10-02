import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../locales';
import ScheduleView from './ScheduleView';
import ScheduleHeader from './ScheduleHeader';
import ScheduleItem from './ScheduleItem';

const ScheduleCard = (props) => {
  const { locale } = I18n;
  const onPressTitle = () => props.onPressTitle(props.scheduleData);
  const onSave = () => props.onSave(props.scheduleData);
  const { time, saved, title, title_e, speaker, speaker_e, room, tags } = props.scheduleData;
  return (
    <ScheduleView onPress={onPressTitle} disabled={props.disabled}>
      <ScheduleHeader time={time} saved={saved} onSave={onSave} />
      <ScheduleItem
        room={room}
        speaker={locale === 'en' ? speaker_e : speaker}
        title={locale === 'en' ? title_e : title}
        tags={tags}
        onPressTitle={onPressTitle}
      />
    </ScheduleView>
  );
};

ScheduleCard.propTypes = {
  scheduleData: PropTypes.shape({
    time: PropTypes.string,
    saved: PropTypes.bool,
    title: PropTypes.string,
    title_e: PropTypes.string,
    speaker: PropTypes.string,
    speaker_e: PropTypes.string,
    room: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
    })),
  }),
  onPressTitle: PropTypes.func,
  onSave: PropTypes.func,
  disabled: PropTypes.bool,
};

ScheduleCard.defaultProps = {
  scheduleData: {
    time: '',
    saved: false,
    title: '',
    title_e: '',
    speaker: '',
    speaker_e: '',
    room: '',
    tags: [{ color: '', name: '' }],
  },
  onPressTitle: () => { },
  onSave: () => { },
  disabled: false,
};

export default ScheduleCard;