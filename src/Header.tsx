import React from 'react';
import { Container, Nav, Ul, Li, Link } from './Header.style';

const Header = (): JSX.Element => (
  <Container>
    <Nav>
      <Ul>
        <Li>
          <Link to="/repository-1">REPOSITORY 1</Link>
        </Li>
        <Li>
          <Link to="/repository-2">REPOSITORY 2</Link>
        </Li>
      </Ul>
    </Nav>
  </Container>
);

export default Header;
