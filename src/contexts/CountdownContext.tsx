import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface ICountdownProviderProps {
  children: ReactNode;
}
interface ICountdonwContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

let countdownTimeOut: NodeJS.Timeout;
export const CountdownContext = createContext({} as ICountdonwContextData);

export function CountdownProvider({ children }: ICountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState<number>(0.1 * 60);
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
  }, [isActive, time, startNewChallenge]);

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

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeOut);
    setTime(25 * 60);
    setIsActive(false);
    setHasFinished(false);
  }, []);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
