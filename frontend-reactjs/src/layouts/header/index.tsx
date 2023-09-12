import React from 'react';
import { ImImage } from 'react-icons/im';
import { Container, Content } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <h1>
          Image Bank <ImImage />
        </h1>
      </Content>
    </Container>
  );
};

export default Header;
