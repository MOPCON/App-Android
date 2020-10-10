import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { darkBlue } from "../../theme/index"

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Tag = styled.View`
  padding: 5px 10px;
  border-radius: 15px;
  background: ${p => p.color};
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagText = styled.Text`
  color: ${darkBlue};
  font-size: 12px;
`;

const TagBlock = (props) => {
  const { tags } = props;

  return (
    Object.keys(tags).length > 0 && (
      <Container>
        {
          tags.map(tag => {
            return (
            <Tag key={tag.name} color={tag.color.mobile}><TagText>{tag.name}</TagText></Tag>
          )})
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
