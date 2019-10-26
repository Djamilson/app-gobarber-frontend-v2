import styled from 'styled-components';

export const ContainerCheckbox = styled.div`
  background: green;
`;

export const Content = styled.div`
  display: inline-block;
  line-height: 1.2;
  margin-bottom: 2px;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: 2rem;
    height: 20px;
    width: 20px;
    min-width: 20px;
  }

  &.checkbox {
    display: inline-flex;
    > input {
      line-height: 2;
      margin: 3px 8px 0 0;
      width: 35px; // The fix
    }
  }
`;
