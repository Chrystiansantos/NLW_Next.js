import { useCallback, useEffect, useMemo, useState } from 'react';
import style from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState<number>(25 * 60);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      setActive(false);
      setTime(25 * 60);
    }

  }, [active, time])


  const minutes = useMemo(() => {
    // sempre irei arredondar o numero p baixo
    return Math.floor(time / 60);
  }, [time]);

  const seconds = useMemo(() => {
    // sempre irei arredondar o numero p baixo
    return Math.floor(time % 60);
  }, [time]);

  const [minuteLeft, minuteRigth] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [time])

  const [secondLeft, secondRigth] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [time])

  const startCountdown = useCallback(() => {
    setActive(true);
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
      <button type="button" onClick={startCountdown} className={style.countdonwButton}>Iniciar um ciclo</button>
    </div>
  )
}
