import { inputAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  extendTheme,
  FormLabel,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

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


 const form =   {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  


const inputFieldComponent = defineMultiStyleConfig({ baseStyle });

export default inputFieldComponent;
