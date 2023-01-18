import { oswald } from "./font";

const typography = {
  fontFamily: oswald.style.fontFamily,
  fontSize: 13,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: "1.15rem",
    fontWeight: 800,
    lineHeight: 1.25,
  },
  body1: {
    fontSize: 18,
  },
  button: {
    textTransform: "uppercase",
  },
};

export default typography;
