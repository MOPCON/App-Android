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
  padding: 3px 7px;
  border-radius: 12px;
  border: 1px;
  border-color: ${p => p.color};
  background: ${p => p.color};
  align-items: center;
  margin-right: 4px;
  margin-bottom: 10px;
`;

const TagText = styled.Text`
  color: #001333;
  font-size: 10px;
  flex-wrap: wrap;
  font-weight: bold;
`;

const TagBlock = (props) => {
  const { tags } = props;

  return (
    Object.keys(tags).length > 0 && (
      <>
        {
          tags.map(tag => {
            return (
            <Tag key={tag.name} color={'#ffcc00' || tag.color.mobile}><TagText>{tag.name}</TagText></Tag>
          )})
        }
      </>
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
