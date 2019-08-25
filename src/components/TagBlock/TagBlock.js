import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TAG = {
  tags_tech: {
    color: '#01aaf0',
  },
  tags_design: {
    color: '#98ce02',
  },
  tags_other: {
    color: '#ff4492',
  },
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
    Object.keys(tags).length > 0 && (
      <Container>
        {
          Object.keys(tags).map(key => (
            tags[key].map(tag => (
              <Tag tag={key}><TagText>{tag}</TagText></Tag>
            ))
          ))
        }
      </Container>
    )
  );
};

TagBlock.propTypes = {
  tags: PropTypes.arrayOf(),
};

TagBlock.defaultProps = {
  tags: ['BLOCKCHAIN', 'DESIGN', 'IOT'],
}

export default TagBlock;
