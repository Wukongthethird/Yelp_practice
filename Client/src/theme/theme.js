import  { extendTheme}  from "@chakra-ui/react"
import ButtonComponent from "./button";
import inputFieldComponent from "./inputfield";
import formComponent from "./formTheme";



const theme = extendTheme({
 
fonts: {
  body: "system-ui, sans-serif",
  heading: "Nunito Sans",
  mono: "Menlo, monospace",
},
components :{
  Button:ButtonComponent,
  Input:inputFieldComponent,
  Form:formComponent
},
breakpoints: {
  xs: "30em",
  sm: "36em",
  md: "46.25em",
  lg: "62.5em",
  xl: "78.125em",
  xxl: "95em"
},
})


// const theme = extendTheme({
//   components: {
//     Button: {
//       // 1. We can update the base styles
//       baseStyle: {
//         fontWeight: 'bold', // Normally, it is "semibold"
//       },
//       // 2. We can add a new button size or extend existing
//       sizes: {
//         xl: {
//           h: '56px',
//           fontSize: 'lg',
//           px: '32px',
//         },
//       },
//       // 3. We can add a new visual variant
//       variants: {
//         'with-shadow': {
//           bg: 'red.400',
//           boxShadow: '0 0 2px 2px #efdfde',
//         },
//         // 4. We can override existing variants
//         solid: (props: StyleFunctionProps) => ({
//           bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
//         }),
//         // 5. We can add responsive variants
//         sm: {
//           bg: 'teal.500',
//           fontSize: 'md',
//         },
//       },
//       // 6. We can overwrite defaultProps
//       defaultProps: {
//         size: 'lg', // default is md
//         variant: 'sm', // default is solid
//         colorScheme: 'green', // default is gray
//       },
//     },
//   },
// })



export default  theme;

