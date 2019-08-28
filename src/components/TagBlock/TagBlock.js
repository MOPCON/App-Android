import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
`;

const Tag = styled.View`
  padding: 5px 10px;
  border-radius: 3px;
  background: ${p => p.color};
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
    tags.length > 0 && (
      <Container>
        {
          tags.map(tag => (
            <Tag color={tag.color}><TagText>{tag.name}</TagText></Tag>
          ))
        }
      </Container>
    )
  );
};

TagBlock.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  })),
};

TagBlock.defaultProps = {
  tags: [],
}

export default TagBlock;
