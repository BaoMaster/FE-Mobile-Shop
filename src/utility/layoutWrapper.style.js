import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  padding: 20px 20px 40px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 10px;
  }
`;

export { LayoutContentWrapper };
