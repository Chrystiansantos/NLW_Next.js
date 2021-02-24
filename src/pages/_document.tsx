// irei impotar e irei utilizar esses componentes como se fossem as tags
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Preciso usar essa sintaxe de classe.
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* Head sera o cabecalho do html */}
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" />
          <link rel="shortcur icon" href="favicon.png" type="image/png" />
        </Head>
        <body>
          {/* Main sera onde ele ira aapresentar nosso app */}
          <Main />
          {/* Sao scripts que o Next ira injetar na nossa app de forma automatizada */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
