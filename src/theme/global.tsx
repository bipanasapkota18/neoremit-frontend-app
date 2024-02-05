import { css, Global } from "@emotion/react";

import Poppins from "@/assets/fonts/Poppins/Poppins-Regular.ttf";

const globalStyles = () => {
  return (
    <Global
      styles={() => css`
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: regular;
          src: url(${Poppins}) format("truetype");
        }
        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family: "Poppins";
          scroll-behavior: smooth;
          background: #f6f9ff;
        }
        body {
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          padding-top: 0px;
          margin: 0px;
          font-family: "Poppins";
        }
        * {
          box-sizing: border-box;
          &:before,
          &:after {
            box-sizing: border-box;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        ul,
        li,
        h6,
        p,
        img,
        figure {
          margin: 0px;
          padding: 0px;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          box-shadow: 0 0 0 30px white inset !important;
        }
      `}
    />
  );
};

export { globalStyles };
