import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background-color: #282c34;
`;

export const Nav = styled.nav`
  padding: calc(19px + 1vmin) calc(21px + 1vmin);
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

export const Li = styled.li`
  display: block;

  &:not(:last-child) {
    margin-right: calc(10px + 1vmin);
  }
`;

export const Link = styled(NavLink)`
  display: block;
  padding: calc(5px + 1vmin);
  font-size: calc(12px + 1vmin);
  line-height: 1.1;
  color: #61dafb;

  &.active {
    color: #fff;
  }
`;
