import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const ScheduleContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
`;

export const ScheduleScrollView = styled.ScrollView`
`;

export const AgendaView = styled.View`
  display: ${p => (p.active ? 'flex' : 'none')};
`;