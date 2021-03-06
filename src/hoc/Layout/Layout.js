import React, { Component } from 'react';
import Aux from '../AuxComponent/AuxComponent';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrwaer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component{
  state = {
    showSideDrawer: false
  }
  sideDrwaerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrwaerToggleHandler = () => {
    this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
  };

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrwaerToggleHandler}/>
        <SideDrwaer 
          open={this.state.showSideDrawer}
          closed={this.sideDrwaerCloseHandler}/>
        <div> Toolbar, SideDrwaer, Backdrop</div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;