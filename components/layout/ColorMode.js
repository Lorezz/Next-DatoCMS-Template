import { useColorMode } from '@chakra-ui/react';
import { MdWbSunny, MdBrightness3 } from 'react-icons/md';

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === 'light' ? (
        <MdBrightness3 size={24} onClick={toggleColorMode} />
      ) : (
        <MdWbSunny size={24} onClick={toggleColorMode} />
      )}
    </>
  );
}

export default ColorMode;
