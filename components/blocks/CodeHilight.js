import { useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const CodeHilight = ({ code, language }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  return (
    <pre className="line-numbers">
      <code className={language}>{code}</code>
    </pre>
  );
};
export default CodeHilight;
