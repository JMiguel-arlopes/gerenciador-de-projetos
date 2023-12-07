import styles from "./container.module.css";

export default function Container(props) {
  const { direction } = props;

  return (
    <div className={`${styles.container} ${styles[direction]}`}>
      {props.children}
    </div>
  );
}
