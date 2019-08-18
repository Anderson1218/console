import React from "./node_modules/react";
import styles from "./Layout.module.css";

//use React.Fragment
const Layout = props => {
  return (
    <>
      <div>Toolbar, SideDrawer, Backdrop ...</div>
      <main className={styles.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
