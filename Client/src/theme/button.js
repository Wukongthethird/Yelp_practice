import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const ButtonComponent = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base'
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
    login:{
      fontSize: 'md',
      height:'42px',
      width:"300px"

    }
  },
  // Styles for the visual style variations
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      bg: 'red.600',
      color: 'white',
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
})

export default ButtonComponent;