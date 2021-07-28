import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import Prism from 'prismjs';
// import 'prismjs/themes/prism-okaidia.css';

const CodeHilight = ({ code, language }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  let cname = language ? language.toLowerCase().trim() : 'language-javascript';
  if (cname.indexOf('lang') < 0) {
    cname = `language-${cname}`;
  }
  console.log(language, cname);
  return (
    <Box py={5}>
      <pre className="line-numbers">
        <code className={cname}>{code}</code>
      </pre>
    </Box>
  );
};
export default CodeHilight;
