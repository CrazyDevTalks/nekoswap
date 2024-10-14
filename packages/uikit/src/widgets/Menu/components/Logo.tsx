import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import Flex from "../../../components/Box/Flex";
import { LogoIcon, LogoWithTextIcon } from "../../../components/Svg";
import { MenuContext } from "../context";
import { Svg, SvgProps } from '@pancakeswap/uikit'
import { is } from "date-fns/locale";

interface Props {
  href: string;
  isDark: boolean;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

const StyledLink = styled("a")`
  display: flex;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: block;
    }
  }
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<Props> = ({ href, isDark }) => {
  const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const logoSrc = isDark ? "/images/nekoswap_logo.png" : "/images/nekoswap_logo.png";

  return (
    <Flex alignItems="center">
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="NekoSwap home page">
          <img src={logoSrc} width="160" alt="logo" />
        </StyledLink>
      ) : (
        <StyledLink href={href} as={linkComponent} aria-label="NekoSwap home page">
          <img src={logoSrc} width="160" alt="logo" />
        </StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(Logo);

