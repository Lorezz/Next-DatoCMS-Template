import { Box } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const CodeHilight = ({ code, language = 'language-javascript' }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  return (
    <Box py={10}>
      <pre className="line-numbers">
        <code className={'language-javascript'}>{code}</code>
      </pre>
    </Box>
  );
};
export default CodeHilight;
