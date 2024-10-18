import React from "react";
import styles from "./FlexContainer.module.css";

//Define the props interface for the Container component
interface ChildrenProps {
  children: React.ReactNode;
}

const FlexContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={styles.flexContainer}>{children}</div>;
};
export default FlexContainer;
