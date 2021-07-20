import NextLink from 'next/link';
import { Tag, Link, useColorModeValue } from '@chakra-ui/react';

const TagBadge = ({
  slug,
  name,
  bgColor,
  color,
  size = 'md',
  noDefault = false
}) => {
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
    <NextLink href={`/tags/${slug}`} passHref={true}>
      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
        <Tag
          m={4}
          size={size}
          fontSize={size}
          rounded={'md'}
          fontWeight="bold"
          cursor="pointer"
          p={3}
          bg={
            noDefault ? bgColor.hex : useColorModeValue('gray.50', 'gray.800')
          }
          color={noDefault ? color.hex : useColorModeValue('black', 'white')}
          _hover={hover}>
          {`# ${name.toUpperCase()}`}
        </Tag>
      </Link>
    </NextLink>
  );
};

export default TagBadge;
