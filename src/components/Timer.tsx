import styles from "./Timer.module.scss";

import Button from "./Button.tsx";
import { createSignal } from "solid-js";

const Timer = () => {
  const [editMode, setEditMode] = createSignal(true);

  const [minutes, setMinutes] = createSignal();
  const [seconds, setSeconds] = createSignal(0);

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    console.log(value);
  };

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

        <div class={styles.timer__box}>
          {editMode() ? (
            <div class={styles.timer__time__input__wrapper}>
              <div class={styles.timer__time__input}>
                <input
                  type="number"
                  value={minutes()}
                  onInput={handleMinutesChange}
                />
              </div>

              <div>:</div>

              <div class={styles.timer__time__input}>
                <input type="number" />
              </div>
            </div>
          ) : (
            <div class={styles.timer__time} onClick={() => setEditMode(true)}>
              <span>10</span>
              <span>:</span>
              <span>00</span>
            </div>
          )}
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
