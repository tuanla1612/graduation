import React, { Component } from 'react';
import './Header.css';
import NavItem from './NavItem/NavItem';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Identicon from 'identicon.js';

import { ReactComponent as BellIcon } from '../../img/icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../img/icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../img/icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../img/icons/plus.svg';

import { FaHome, FaFlag, FaUserFriends, FaHeadset, FaPager } from 'react-icons/fa';

// image
import fbLogo from '../../img/fbLogo.webp'
class Header extends Component {
    render(){
    return (
        <div className="header">
            <div className="headerLeft">
                <a href="/"><img src={fbLogo} className="logo" alt="fbLogo"/></a>
                <div className="headerInput">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="headerCenter">
                <div className="headerOption headerOptionActive">
                    <FaHome size="30" />
                </div>
                <div className="headerOption">
                    <FaFlag size="30" />
                </div>
                <div className="headerOption">
                    <FaUserFriends size="30" />
                </div>
                <div className="headerOption">
                    <FaPager size="30" />
                </div>
                <div className="headerOption">
                    <FaHeadset size="30" />
                </div>
            </div>
            
            <div className="headerRight">
                <div className="headerInfo">
                <a href="/profile">
                { this.props.account? <img
                    className='ml-2'
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                    />
                    : <span></span>
                }
                {this.props.account}</a>
                </div>

                {/* <IconButton>
                    <AddIcon />
                </IconButton>
                <IconButton>
                    <ForumIcon />
                </IconButton>
                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton>
                    <ExpandMoreIcon />
                </IconButton> */}
                <nav className="navbar">
                    <ul className="navbar-nav">
                        <NavItem icon={<PlusIcon />} />
                        <NavItem icon={<MessengerIcon />} />
                        <NavItem icon={<BellIcon />} />

                        <NavItem icon={<CaretIcon />}>
                        <DropdownMenu></DropdownMenu>
                        </NavItem>
                    </ul>
                </nav>
            </div>
        </div>
    )
            }
}

export default Header;
