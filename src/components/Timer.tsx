import styles from "./Timer.module.scss";

import Button from "./Button.tsx";

const Timer = () => {
  return (
    <div class={styles.timer__wrapper}>
      <div class={styles.timer__input__wrapper}>
        <input
          class={styles.timer__input}
          type="text"
          placeholder={"Conquer the world"}
        />

        <Button>Apply mission to timer</Button>
      </div>

      <div class={styles.timer}>
        <div class={styles.timer__buttons}>
          <Button>Start</Button>

          <Button>Reset</Button>
        </div>

        <div class={styles.timer__time}>
          <span>09</span>
          <span>:</span>
          <span>54</span>
        </div>

        <div class={styles.timer__buttons}>
          <Button>+</Button>

          <Button>-</Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
