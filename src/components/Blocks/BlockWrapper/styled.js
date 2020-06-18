import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  max-width: ${props => {
    if (props.blockLayout === 'outset') return '800px';
    if (props.blockLayout === 'fullWidth') return '100%';
    return '700px';
  }};
  margin: 0 auto;
  padding: 0 ${props => (props.blockLayout !== 'fullWidth' ? '16px' : '0')};
  box-sizing: content-box;
  background: ${props => (props.isBlockSelected ? '#D9EAFF' : 'transparent')};
  *::selection {
    background: ${props => (props.isBlockSelected ? 'transparent' : '#D9EAFF')};
  }
`;

export const BlockContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  border-radius: 2px;
  cursor: text;
`;
