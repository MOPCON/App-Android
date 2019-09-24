import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const UnConfContainer = styled.View`
  padding: 16px;
  flex-grow:1;
`;

export const UnConfScrollView = styled.ScrollView`
  background-color: ${darkBlue};
`;

export const AgendaView = styled.View`
  display: ${p => (p.active ? 'flex' : 'none')};
`;