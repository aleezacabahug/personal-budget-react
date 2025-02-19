import React from 'react';

import {
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav
        role='navigation'
        aria-label='Main Menu'
        itemScope
        itemType="http://www.schema.org/SiteNavigationElement"
    >
        <ul>
            <li><Link itemProp="url" to="/" tabindex="1">Homepage</Link></li>
            <li><Link itemProp="url" to="/about" tabindex="2">About</Link></li>
            <li><Link itemProp="url" to="/login" tabindex="3">Login</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
