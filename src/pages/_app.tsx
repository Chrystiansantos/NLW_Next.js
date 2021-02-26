import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      {/* eslint react/jsx-props-no-spreading: "off" */}
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
