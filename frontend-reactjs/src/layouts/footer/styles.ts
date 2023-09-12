import styled from "styled-components";

interface ISize {
  mobile: string;
  tablet: string;
  desktopS: string;
  desktopL: string;
}
const size: ISize = {
  mobile: "360px",
  tablet: "640px",
  desktopS: "768px",
  desktopL: "1086px",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color:  var(--footer);
  height: 85px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${size.mobile};
  width: 100%;
  color: #fff;

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
