import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Layout from 'import/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
