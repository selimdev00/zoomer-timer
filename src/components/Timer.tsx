import styles from "./Timer.module.scss";

import Button from "./Button.tsx";
import { createSignal } from "solid-js";

const Timer = () => {
  let minutesInput: HTMLInputElement;
  let secondsInput: HTMLInputElement;

  let timer: number;

  const [editMode, setEditMode] = createSignal(true);

  const [minutes, setMinutes] = createSignal();
  const [seconds, setSeconds] = createSignal();

  const handleMinutesChange = (e: any) => {
    const value = e.target.value;
    if (value.length >= 2) {
      minutesInput.blur();
      setMinutes(value);
      secondsInput.focus();
    }
  };

  const handleSecondsChange = (e: any) => {
    let value = e.target.value;

    if (value > 59) {
      secondsInput.value = "59";
      value = "59";
    }

    if (value < 0) {
      return (secondsInput.value = "0");
    }

    if (value[0] === "-") {
      return (secondsInput.value = "0");
    }

    if (value.length >= 2) {
      secondsInput.blur();
      setEditMode(false);
      setSeconds(value);
    }
  };

  const switchToEditMode = () => {
    setEditMode(true);
    minutesInput.focus();
  };

  const startTimer = () => {
    if (minutes() === 0 && seconds() === 0) {
      return;
    }

    timer = setInterval(() => {
      if (seconds() < 10) {
        setSeconds(seconds());
      }

      if (seconds() > 0) {
        setSeconds(seconds() - 1);
      }

      if (seconds() === 0 && minutes() > 0) {
        setMinutes(minutes() - 1);
        setSeconds(59);
      }

      if (minutes() === 0 && seconds() === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  let missionInput: HTMLInputElement;
  const [mission, setMission] = createSignal();

  const applyMission = (e: any) => {
    e.preventDefault();

    setMission(missionInput.value);
  };

  return (
    <div class={styles.timer__wrapper}>
      <form onSubmit={applyMission} class={styles.timer__input__wrapper}>
        <input
          ref={missionInput}
          class={styles.timer__input}
          type="text"
          placeholder={"Conquer the world"}
        />

        <Button type={"submit"}>Apply mission to timer</Button>
      </form>

      <div class={styles.timer}>
        <div class={styles.timer__buttons}>
          <Button onClick={startTimer}>Start</Button>

          <Button onClick={stopTimer}>Stop</Button>
        </div>

        <div class={styles.timer__box}>
          {editMode() ? (
            <div class={styles.timer__time__input__wrapper}>
              <div class={styles.timer__time__input}>
                <input
                  ref={minutesInput}
                  type="number"
                  onInput={handleMinutesChange}
                  value={minutes()}
                />
              </div>

              <div>:</div>

              <div class={styles.timer__time__input}>
                <input
                  ref={secondsInput}
                  type="number"
                  onInput={handleSecondsChange}
                  value={seconds()}
                />
              </div>
            </div>
          ) : (
            <div class={styles.timer__time}>
              <span>{minutes() < 10 ? `0${minutes()}` : minutes()}</span>
              <span>:</span>
              <span>{seconds() < 10 ? `0${seconds()}` : seconds()}</span>
            </div>
          )}
        </div>

        <div class={styles.timer__buttons}>
          <Button
            onClick={() => {
              stopTimer();
              setMinutes();
              setSeconds();
            }}
          >
            Reset
          </Button>

          <Button
            onClick={() => {
              stopTimer();
              switchToEditMode();
            }}
          >
            Edit
          </Button>
        </div>
      </div>

      {mission() && <h1 class={styles.timer__mission}>"{mission()}"</h1>}
    </div>
  );
};

export default Timer;
