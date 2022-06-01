import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as CogIcon } from '../../../img/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../../img/icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../../img/icons/arrow.svg';

const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
  
    function DropdownItem(props) {
        return (
            <a href="/#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    function DropdownItemImage(props) {
        return (
            <a href="/#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <img src={props.image} alt="pic" className="icon-profile" />
            {props.children}
            <br/>
            See your profile
            </a>
        );
    }
  
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
        <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                {/* <DropdownItem>My Profile</DropdownItem> */}
                <DropdownItemImage>Test</DropdownItemImage>

                <hr className="hrTag" />
                <DropdownItem>Give Feedback</DropdownItem>
                <hr className="hrTag" />

                <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="settings"
                >Settings & Privacy</DropdownItem>

                <DropdownItem
                    rightIcon={<ChevronIcon />}
                    goToMenu="help"
                >Help & Support</DropdownItem>

                <DropdownItem>Dark Mode</DropdownItem>

                <DropdownItem
                    leftIcon={<ArrowIcon />}
                >Switch to Classic Facebook</DropdownItem>

                <DropdownItem>Log Out</DropdownItem>

                {/* <DropdownItem
                    leftIcon="🦧"
                    rightIcon={<ChevronIcon />}
                    goToMenu="animals"
                >Animals</DropdownItem> */}
            </div>
        </CSSTransition>
  
        <CSSTransition
            in={activeMenu === 'settings'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h2>Settings & Privacy</h2>
                </DropdownItem>
                <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
                <DropdownItem>Privacy Checkup</DropdownItem>
                {/* <DropdownItem leftIcon={<EnhancedEncryptionIcon />}>Privacy Checkup</DropdownItem> */}
                <DropdownItem>Privacy Shortcuts</DropdownItem>
                <DropdownItem>Activity Log</DropdownItem>
                <DropdownItem>News Feed Preferences</DropdownItem>
                <DropdownItem>Language</DropdownItem>
            </div>
        </CSSTransition>

        <CSSTransition
            in={activeMenu === 'help'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h2>Help & Support</h2>
                </DropdownItem>
                <DropdownItem>Help Center</DropdownItem>
                {/* <DropdownItem leftIcon={<ChatBubbleIcon />}>Help Community</DropdownItem> */}
                <DropdownItem>Help Community</DropdownItem>
                <DropdownItem>Support Inbox</DropdownItem>
                <DropdownItem>Report a Problem</DropdownItem>
            </div>
        </CSSTransition>
  
        {/* <CSSTransition
            in={activeMenu === 'animals'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h2>Animals</h2>
                </DropdownItem>
                <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
                <DropdownItem leftIcon="🐸">Frog</DropdownItem>
                <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
                <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
            </div>
        </CSSTransition> */}
      </div>
    );
}

export default DropdownMenu;