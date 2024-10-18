import React from "react";
import styles from "./Container.module.css";

//Define the props interface for the Container component
interface ChildrenProps {
  children: React.ReactNode;
}

const Container: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={styles.flexContainer}>{children}</div>;
};

export default Container;
