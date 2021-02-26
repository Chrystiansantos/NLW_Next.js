import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState<number>(1);
  const [currentExperience, setCurrentExperience] = useState<number>();
  const [challengesCompleted, setChallengesCompleted] = useState<number>(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level + 1) * 4, 2);
  }, [level]);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
  }, []);
  const startNewChallenge = useCallback(() => {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];
    setActiveChallenge(challenge);
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  return (
    <ChallengesContext.Provider
      value={
        {
          level,
          currentExperience,
          challengesCompleted,
          startNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceToNextLevel,
        } as IChallengesContextData
      }
    >
      {children}
    </ChallengesContext.Provider>
  );
}
