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
  justify-content: center;
  flex-wrap: wrap;

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
    justify-content: flex-start;
  }
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  box-shadow: 2px 2px 5px #ccc;
  height: 300px;
  width: 250px;
  margin-right: 15px;
  margin-top: 15px;
`;

export const CardImg = styled.img`
  width: 250px;
  height: 250px;
`;

export const CardDownload = styled.div`
  font-size: 50px;
  background-color: #eee;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
