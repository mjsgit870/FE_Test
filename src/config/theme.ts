import { createTheme } from "@mantine/core";
import { roboto } from "./font";

export const theme = createTheme({
  colors: {
    primary: [
      "#e8f7ea",
      "#d1efd5",
      "#a3dfaa",
      "#75ce7f",
      "#4cbd55",
      "#3cb649",
      "#30923a",
      "#256d2c",
      "#1b491e",
      "#102510",
    ],
  },

  fontFamily: `${roboto.style.fontFamily}, sans-serif`,
  headings: {
    fontFamily: `${roboto.style.fontFamily}, sans-serif`,
  },
});
