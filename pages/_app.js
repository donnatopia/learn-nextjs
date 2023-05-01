import '../styles/global.css';

// top-level react component that wraps all the pages in the application
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}