import { inputAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  extendTheme,
  FormLabel,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);



const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    fontFamily: "mono", // change the font family
    // color: 'red.600', // change the input text color
    // borderColor: "",
    border: "0px solid",
    background: "gray.100",
    // borderWidth: 3,
    my: "10px",
    _hover: {
      bg: "gray.300",
      // _dark: {
      //   bg: "whiteAlpha.100"
      // }
    },
    _focusVisible: {
      bg: "gray.300",
      // _dark: {
      //   bg: "whiteAlpha.100"
      // }
    },
  },
});



const inputFieldComponent = defineMultiStyleConfig({ baseStyle });

export default inputFieldComponent;
