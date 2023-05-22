import { css } from "@emotion/react"

export default css`
  html,
  body {
    margin: 0;
    padding: 0;
  }
  body {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }
  :focus {
    outline: 0;
  }

  .hidden {
    display: none;
  }
`
