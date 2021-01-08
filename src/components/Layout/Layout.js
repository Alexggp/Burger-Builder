import React from 'react';
import Aux from '../../hoc/AuxComponent';
import Classes from './Layout.module.css';

const layout = (props) =>(
  <Aux>
    <div> Toolbar, SideDrwaer, Backdrop</div>
    <main className={Classes.Content}>
      {props.children}
    </main>
  </Aux>

)

export default layout;