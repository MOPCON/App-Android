import React from 'react';
import PropTypes from 'prop-types';
import TagBlock from '../TagBlock/TagBlock';

import * as Style from './style';
const SpeakerItem = props => {
  const { name, job, company, picture, tags } = props;

  return (
    <Style.SpeakerItemContainer>
      <Style.ImageContainer>
        <Style.Image source={{ uri: picture }}></Style.Image>
      </Style.ImageContainer>
      <Style.ContentContainer>
        <Style.Title>{name}</Style.Title>
        <Style.Info>{job} @ {company}</Style.Info>
        <TagBlock tags={tags} />
      </Style.ContentContainer>
    </Style.SpeakerItemContainer>
  );
}

SpeakerItem.propTypes = {
  name: PropTypes.string,
  job: PropTypes.string,
  company: PropTypes.string,
  picture: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  })),
}
SpeakerItem.defaultProps = {
  name: '',
  job: '',
  company: '',
  picture: '',
  tags: [],
}

export default SpeakerItem;