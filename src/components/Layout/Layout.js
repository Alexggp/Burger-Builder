import React from 'react';
import Aux from '../../hoc/AuxComponent';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Classes from './Layout.module.css';

const layout = (props) =>(
  <Aux>
    <Toolbar/>
    <div> Toolbar, SideDrwaer, Backdrop</div>
    <main className={Classes.Content}>
      {props.children}
    </main>
  </Aux>

)

export default layout;