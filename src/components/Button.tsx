import styles from "./Button.module.scss";

const Button = ({ children }: { children: string }) => {
  return <button class={styles.button}>{children}</button>;
};

export default Button;
