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
  background-color: #eee;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  p {
    text-decoration: none;
    font-size: 15px;
    color: #000;
    margin-top: 10px;
  }

  svg {
    font-size: 50px;
    text-decoration: none;
    color: #000;
  }
`;

export const CardNotFound = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  svg {
    margin-left: 10px;
    font-size: 25px;
  }
`;
