import React from "react";
import styles from "./Nav.module.css";

//Nav Component Logic
const Nav: React.FC = () => {
  return (
    <div className={styles.nav}>
      <h1>🍔 FoodApp</h1>
    </div>
  );
};

export default Nav;
