import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/Countdown.module.css';

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      clearTimeout(countdownTimeOut);
      setIsActive(false);
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isActive, time]);

  const minutes = useMemo(
    () =>
      // sempre irei arredondar o numero p baixo
      Math.floor(time / 60),
    [time],
  );

  const seconds = useMemo(
    () =>
      // sempre irei arredondar o numero p baixo
      Math.floor(time % 60),
    [time],
  );

  const [minuteLeft, minuteRigth] = useMemo(
    () => String(minutes).padStart(2, '0').split(''),
    [minutes],
  );

  const [secondLeft, secondRigth] = useMemo(
    () => String(seconds).padStart(2, '0').split(''),
    [seconds],
  );

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeOut);
    setTime(25 * 60);
    setIsActive(false);
  }, []);

  return (
    <div>
      <div className={style.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled type="button" className={`${style.countdonwButton}`}>
          Ciclo encerrado{' '}
          <img className={style.iconButton} src="icons/level.svg" alt="" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              onClick={resetCountdown}
              className={`${style.countdonwButton} ${style.countdonwButtonActive} `}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              onClick={startCountdown}
              className={style.countdonwButton}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
