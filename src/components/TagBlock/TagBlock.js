import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TAG = {
  BLOCKCHAIN: {
    color: '#01aaf0',
    text: 'Blockchain',
  },
  DESIGN: {
    color: '#ff4492',
    text: 'Design',
  },
  IOT: {
    color: '#98ce02',
    text: 'IoT',
  }
};

const Container = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
`;

const Tag = styled.View`
  padding: 5px 10px;
  border-radius: 3px;
  background: ${p => TAG[p.tag].color};
  align-items: center;
  margin-right: 10px;
`;

const TagText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const TagBlock = (props) => {
  const { tags } = props;

  return (
    <Container>
      {
        tags.map(tag => (
          <Tag tag={tag}><TagText>{TAG[tag].text}</TagText></Tag>
        ))
      }
    </Container>
  );
};

TagBlock.propTypes = {
  tags: PropTypes.arrayOf(),
};

TagBlock.defaultProps = {
  tags: ['BLOCKCHAIN', 'DESIGN', 'IOT'],
}

export default TagBlock;
