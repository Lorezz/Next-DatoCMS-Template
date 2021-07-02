import { Box } from '@chakra-ui/react';

import InternalLink from 'components/InternalLink';
import ExternalLink from 'components/ExternalLink';

const LinkBlock = ({ block }) => {
  // console.log('Link BLOCK', block);
  const { externalLinkUrl, internalLink } = block;
  if (externalLinkUrl) {
    return <ExternalLink {...block} />;
  } else if (internalLink) {
    return <InternalLink {...block} />;
  } else {
    return <Box>empty</Box>;
  }
};

export default LinkBlock;
