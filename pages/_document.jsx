import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {ServerStyleSheets} from '@material-ui/styles'

class ArunaDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      ctx.renderPage(sheet)
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-179600255-1" />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-179600255-1');`,
            }}
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ArunaDocument
