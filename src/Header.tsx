import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Header.style';

const Header = (): JSX.Element => (
  <Container>
    <nav>
      <ul>
        <li>
          <Link to="/repository-1">repository 1</Link>
        </li>
        <li>
          <Link to="/repository-2">repository 2</Link>
        </li>
      </ul>
    </nav>
  </Container>
);

export default Header;
