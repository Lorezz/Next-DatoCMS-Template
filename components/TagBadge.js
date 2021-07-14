import NextLink from 'next/link';
import { Badge, useColorModeValue } from '@chakra-ui/react';

const TagBadge = ({ slug, name, bgColor, color, size = 'md' }) => {
  const colors = {
    light: 'purple.400',
    light_hover: 'purple.500',
    dark: 'green.300',
    dark_hover: 'green.400'
  };
  const c = useColorModeValue(colors.light, colors.dark);
  const bg = useColorModeValue(colors.light_hover, colors.dark_hover);

  let hover = {
    bg,
    color: c
  };
  if (bgColor?.hex && color?.hex) {
    hover = {
      bg: bgColor?.hex,
      color: color?.hex
    };
  }
  return (
    <NextLink href={`/tags/${slug}`}>
      <Badge
        m={4}
        fontSize={size}
        cursor="pointer"
        px={2}
        py={1}
        bg={useColorModeValue('gray.50', 'gray.800')}
        _hover={hover}
        fontWeight={'400'}>
        {`#${name}`}
      </Badge>
    </NextLink>
  );
};

export default TagBadge;
