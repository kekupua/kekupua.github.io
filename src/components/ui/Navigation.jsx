import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import style from '../../styleguide';

let StyledNavLink = styled(NavLink)({
    textDecoration: 'none',
    padding: style.sizes._300,
});

let NavigationContainer = styled.div({
    display: 'flex',
    width: '100%',
    height: style.sizes._900,
    position: 'fixed',
    background: '#000000e8',
    transition: 'opacity 0.15s',
})

export const Navigation = () => {
    let navigationRef = React.useRef(null);
    let handleScroll = (e) => {
        if (window.pageYOffset > 10 && navigationRef.current.style.opacity === "0") {
            navigationRef.current.style.display = 'flex';
            navigationRef.current.style.opacity = 1;
        } else if (window.pageYOffset === 0 && navigationRef.current.style.opacity !== "0") {
            navigationRef.current.style.opacity = 0;
            navigationRef.current.style.display = 'none';
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    });
    return (
        <NavigationContainer ref={navigationRef}>
            <StyledNavLink exact to="/">Home</StyledNavLink>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
            <StyledNavLink to="/essays">Essays</StyledNavLink>
        </NavigationContainer>
    )
}

export default Navigation;