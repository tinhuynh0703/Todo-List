import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("key");
  }
  return <Component {...pageProps} />;
}
