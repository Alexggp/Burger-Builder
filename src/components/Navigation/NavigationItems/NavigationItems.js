import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItems link="/" active>Burger Builder</NavigationItems>
    <NavigationItems link="/">Checkout</NavigationItems>

  </ul>
);

export default navigationItems;