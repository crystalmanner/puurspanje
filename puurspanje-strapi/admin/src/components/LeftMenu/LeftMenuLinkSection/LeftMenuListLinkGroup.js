import styled from 'styled-components';

const LeftMenuListLinkGroup = styled.div`
  &:hover {
    background: ${props => props.theme.main.colors.leftMenu['link-hover']};
  }

  > span {
    padding-top: 1rem;
    padding-bottom: 0.2rem;
    padding-left: 1.6rem;
    min-height: 3.6rem;
    display: flex;
    justify-content: space-between;
    border-left: 0.3rem solid transparent;
    cursor: pointer;
    user-select: none;
    color: ${props => props.theme.main.colors.leftMenu['link-color']};
    line-height: 1.8rem;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;

    &:hover {
      color: ${props => props.theme.main.colors.white};
      border-left: 0.3rem solid ${props => props.theme.main.colors.strapi.blue};
      text-decoration: none;
    }
  }

  a {
    padding-left: 3rem;
    svg {
      left: 3.6rem;
    }
  }
`;

export default LeftMenuListLinkGroup;
