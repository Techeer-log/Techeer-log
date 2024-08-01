import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@1,8..60,300&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, tchead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  color:black;
  line-height: 1.2;
  overflow-x: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}

h1 {
    font-family: 'Pre-S';
    font-size: 3rem;  
    margin-top: 1rem;
}

h2 {
    font-family: 'Pre-S';
    font-size: 2.5rem;
    margin-top: 0.7rem;
}

h3 {
    font-family: 'Pre-S';
    font-size: 2rem;
    margin-top: 0.5rem;
}

h4 {
    font-family: 'Pre-S';
    font-size: 1.5rem;
}

strong {
    font-family: 'Pre-B';
    font-weight: 800;
}

@media (max-width: 1600px) , (max-height : 920px) {
    html {
      font-size: 15px;
    }
@media (max-width: 1400px) , (max-height : 870px) {
    html {
      font-size: 14px;
    }
  }
  @media (max-width: 1200px) , (max-height: 700px) {
    html {
      font-size: 12px;
    }
  }
  @media (max-width: 1000px) , (max-height: 600px) {
    html {
      font-size: 10px;
    }
  }
  @media (max-width: 800px) , (max-height: 500px) {
    html {
      font-size: 8.5px;
    }
  }
}
`;
