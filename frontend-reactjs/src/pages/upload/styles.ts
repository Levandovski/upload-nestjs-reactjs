import styled from 'styled-components';

interface ISize {
  mobile: string;
  tablet: string;
  desktopS: string;
  desktopL: string;
}
const size: ISize = {
  mobile: '360px',
  tablet: '640px',
  desktopS: '768px',
  desktopL: '1086px',
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding: 8px;
  margin-bottom: 72px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${size.mobile};
  width: 100%;
  height: auto;

  // tablets
  @media only screen and (min-width: ${size.tablet}) {
    max-width: ${size.tablet};
  }

  // laptops/desktops
  @media only screen and (min-width: ${size.desktopS}) {
    max-width: ${size.desktopS};
  }

  // laptops/desktops
  @media only screen and (min-width: ${size.desktopL}) {
    max-width: ${size.desktopL};
  }
`;

export const ContainerSearch = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: ${size.tablet}) {
    flex-direction: row;
  }
`;

export const ContentIconUpload = styled.label`
  font-size: 50px;
  padding-left: 15px;
  cursor: pointer;
`;

export const ContentRenderLayoutSearch = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;

  svg {
    font-size: 30px;
    /* padding-top: 5px; */
  }
`;
