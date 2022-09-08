import "../styles/global.scss";
import type { AppProps } from "next/app";
import { store } from "../lib/app/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
