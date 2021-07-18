import { Box, Divider, Heading } from '@chakra-ui/react';

import FeaturedPost from 'components/template/FeaturedPost';
import FeatureContent from 'components/template/FeatureContent';
import PostGrid from 'components/template/PostGrid';
import ProductGrid from 'components/template/ProductGrid';
import Newsletter from 'components/template/Newsletter';

// const widgetTypes = [
//   'blog-latest',
//   'blog-featured',
//   'subscribe-form',
//   'products',
//   'story',
//   'contact-form'
// ];

const Widget = ({ id, numberOfItems, widget: widgetType }) => {
  if (widgetType === 'blog-latest') {
    return <PostGrid limit={numberOfItems} />;
  } else if (widgetType === 'blog-featured') {
    return <FeaturedPost limit={numberOfItems} />;
  } else if (widgetType === 'story') {
    return <FeatureContent limit={numberOfItems} />;
  } else if (widgetType === 'products') {
    return <ProductGrid limit={numberOfItems} />;
  } else if (widgetType === 'subscribe-form') {
    return <Newsletter />;
  } else if (widgetType === 'contact-form') {
    return <Newsletter />;
  }
};

function WidgetBlock({ title, widgets }) {
  return (
    <Box py={10} px={0}>
      <Heading as="h1">{title}</Heading>
      {widgets.map((w) => (
        <Widget key={w.id} {...w} />
      ))}
    </Box>
  );
}
export default WidgetBlock;
