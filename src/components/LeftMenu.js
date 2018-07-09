import React from 'react'

const LeftMenu = ({stickers_menu_tab, changeTab}) => {


    return <div className="site-menubar">
        <div className="site-menubar-body">
            <ul className="site-menu">

                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === 0 ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(0);}} >
                        <i className="site-menu-icon fa fa-mobile" aria-hidden="true"></i>
                        <span className="site-menu-title">Général</span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === 1 ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(1);}} >
                        <i className="site-menu-icon fa fa-image" aria-hidden="true"></i>
                        <span className="site-menu-title">Images</span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === 2 ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(2);}} >
                        <i className="site-menu-icon fa fa-font" aria-hidden="true"></i>
                        <span className="site-menu-title">Textes</span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === 3 ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(3);}} >
                        <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                        <span className="site-menu-title">Animations</span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === 4 ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(4);}} >
                        <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                        <span className="site-menu-title">Gifs</span>
                    </a>
                </li>

            </ul>
        </div>
    </div>
}

export default LeftMenu
