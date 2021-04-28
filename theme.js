import { extendTheme } from '@chakra-ui/react';

const t = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif'
  },
  colors: {
    discord: '#7289da'
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;'
  },
  styles: {
    global: (props) => ({
      'html, #__next': {
        height: '100%'
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column'
      },
      '.body': {
        // todo check how to do this without breaking the site
        // height: '100%', // Push footer to bottom
        overflowY: 'scroll' // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth'
      },
      '#nprogress': {
        pointerEvents: 'none'
      },
      '#nprogress .bar': {
        background: 'green.200',
        position: 'fixed',
        zIndex: '1031',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px'
      },
      'html, body': {
        // fontSize: 'sm',
        // background: props.colorMode === 'dark' ? '#36353a' : '#f4f4f4',
        // color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif'
      },
      a: {
        color: props.colorMode === 'dark' ? 'orange.400' : 'orange.300',
        textDecoration: 'none',
        fontSize: '14px'
      }
    })
  },
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme(t);

export default theme;
