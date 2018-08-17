import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const UnConfContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
`;

export const UnConfScrollView = styled.ScrollView``;

export const AgendaView = styled.View`
  display: ${p => (p.active ? 'flex' : 'none')};
`;