import { extendTheme, ThemeConfig, ThemeOverride, Input, Textarea, Select } from '@chakra-ui/react';

const robotoRegular = 'RobotoRegular, sans-serif';
const robotoBold = 'RobotoBold, sans-serif';
const robotoItalic = 'RobotoItalic, sans-serif';
const robotoLight = 'RobotoLight, sans-serif';
const ppMoriSemiBold = 'PPMoriSemiBold, RobotoBold, sans-serif';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  colors: {
    primary: '#DE352D',
    secondary: '#7C110C',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    lightGray: '#E2E8F0',
  },
};

type CustomColors = typeof colors;

const theme = extendTheme(<ThemeOverride>{
  breakpoints: {
    xl: '1441px',
    '2xl': '1980px',
  },
  colors: { ...colors.colors },
  components: {
    Container: {
      variants: {
        pageContainer: {
          background: colors.colors.white,
          maxWidth: '100%',
          minHeight: '100vh',
          paddingX: '0',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 400,
      },
    },
    Text: {
      sizes: {
        sm: {
          fontSize: '1rem',
        },
        md: {
          fontSize: '20px',
        },
      },
      variants: {
        textLink: {
          color: 'blue',
          textDecoration: 'underline',
        },
        textInput: {
          color: 'black',
        },
      },
      defaultProps: {
        size: 'md',
      },
    },
  },
  fontSizes: {
    xs: '16px',
    md: '22px',
    xl: '32px',
    xxl: '48px',
    '3.5xl': '2rem',
    '6.5xl': '4rem',
  },
  fonts: {
    heading: ppMoriSemiBold,
    body: robotoLight,
  },
  space: {
    '8.5': '32px',
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        overflowY: 'auto',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility',
        color: 'black',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      '.pos-absolute-xcenter': {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      '.pos-absolute-ycenter': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      '.flex-full-center': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '.datepicker-input': {
        // border: '1px solid #e5e5e5',
        background: '#e5e5e5',
        padding: '5px 15px',
        fontWeight: 'bold',
        borderRadius: '4px',
        minHeight: '40px',
        width: '100%',
        color: 'black',
      },
    },
  },
  sizes: {
    container: {
      lg: '1080px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
  },
  textStyles: {
    // Heading and Text config are prioritized over textStyle
    robotoRegular: {
      fontFamily: robotoRegular,
      fontWeight: 400,
    },
    robotoBold: {
      fontFamily: robotoBold,
      fontWeight: 400,
    },
    robotoLight: {
      fontFamily: robotoLight,
      fontWeight: 300,
    },
    robotoItalic: {
      fontFamily: robotoItalic,
      fontWeight: 400,
    },
    ppMoriSemiBold: {
      fontFamily: ppMoriSemiBold,
      fontWeight: 400,
    },
  },
  config,
});
Input.defaultProps = { ...Input.defaultProps, borderColor: 'black' };
Textarea.defaultProps = {
  ...Input.defaultProps,
  style: {
    border: '1px solid',
    borderColor: '#333333',
  },
};
Select.defaultProps = { ...Input.defaultProps, borderColor: 'black' };
type CustomTheme = typeof theme & CustomColors;
export type { CustomTheme };
export { theme };
