import css from 'styled-jsx/css';
import 'prismjs/themes/prism-okaidia.css';

export default css.global`
  :root {
    --color-primary: #84b9f5;
    --color-secondary: #16875d;
    --color-tertiary: #84b9f5;
    --color-foreground: #283848;
    --color-background: #ffffff;
    --color-muted: #666666;

    --grid-unit: 0.5rem;

    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    --font-family-heading: inherit;
    --font-family-body: inherit;
    --font-family-main: inherit;
    --font-family-code: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;

    --global-transition-time: 0.2s;

    --wrapper-max-width: 60rem;

    --header-nav-item-active-color: #b7ded0;
    --footer-copyright-color: #b7ded0;
    --external-url-background-color: #b7ded0;
  }

  html {
    font-size: 100%;
    background-color: var(--color-background);
  }

  body {
    font-size: 1rem;
    font-weight: var(--font-weight-light);
    font-family: var(--font-family-body);
    color: var(--color-foreground);
    margin: 0;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  /* accessibility fixes for prismjs */
  .token.comment {
    color: #adb8c2 !important;
  }

  .token.tag,
  .token.constant {
    color: #fc92b6 !important;
  }
`;
