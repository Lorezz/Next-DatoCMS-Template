//COMMON BLOCKS

const internalLinkBlock = `
  __typename
  ... on AuthorRecord {
    id
    name
    slug
  }
  ... on PageRecord {
    id
    title
    slug
  }
  ... on PostRecord {
    id
    slug
    title
  }
  ... on TagRecord {
    id
    name
    slug
    bgColor{
      hex
    }
    color{
      hex
    }
  }
`;

const linkBlock = `
__typename
id
title
externalLinkUrl
internalLink {
  ${internalLinkBlock}
}
preview {
  id
  alt
  author
  copyright
  title
  tags
  copyright
  url(imgixParams: {auto:format, maxW: "300", maxH: "300", fit:crop})
  responsiveImage(imgixParams: {auto:format, maxW: "300", maxH: "300", fit:crop}) {
    ...imgFrag
  }
}
`;

const galleryBlock = `
__typename
id
layout
images {
  id
  alt
  author
  copyright
  title
  tags
  url(imgixParams: {auto:format, maxW: "800"})
  responsiveImage(imgixParams: {auto:format, maxW: "1200"}) {
    ...imgFrag
  }
}
`;

const internalVideoBlock = `
  id
  loop
  autoplay
  videoFile {
    mimeType
    size
    url
    video {
      mp4Url(res: medium)
      muxAssetId
      framerate
      duration
      muxPlaybackId
      streamingUrl
      thumbnailUrl(format: png)
    }
  }`;

const ctaBlock = `
  __typename
  id
  title
  layout
  description
  action
  video {
    url
    title
    thumbnailUrl
    provider
  }
  image {
    id
    title
    alt
    url(imgixParams:{auto:format,w:"800",h:"600",fit:crop})
    responsiveImage(imgixParams:{auto:format,w:"800",h:"600",fit:crop}){
      ...imgFrag
    }
  }
  externalLink
  internalLink {
    ${internalLinkBlock}
}`;

const embeddedVideoBlock = `
  id
  video{
    url
    thumbnailUrl
  }
`;

// FRAGMENTS
const menuItemFrag = `
fragment menuItemFrag on MenuItemRecord {
  id
  label
  subLabel
  href {
    ... on HomeRecord {
      __typename
      id
      title
      slug
    }
    ... on PageRecord {
      __typename
      id
      title
      slug
    }
  }
}
`;

const tagFrag = `
fragment tagFrag on TagRecord {
  id
  name
  slug
  bgColor{
    hex
  }
  color{
    hex
  }

}
`;

const imgFrag = `
  fragment imgFrag on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    webpSrcSet
    width
    alt
    title
  }
`;

const authorFrag = `
fragment authorFrag on AuthorRecord {
  id
  _modelApiKey
  slug
  motto
  name
  nick
  role
  bio(markdown: true)
  pic {
    url(imgixParams: {maxW: "800", auto:format, maxH: "800", fit:crop})
    responsiveImage(imgixParams: {maxW: "800", auto:format, maxH: "800", fit:crop}) {
      ...imgFrag
    }
  }
  links{
    ${linkBlock}
  }
  tags {
    id
    name
    slug
    bgColor {
      hex
    }
    color {
      hex
    }
  }
}
`;

const postFrag = `
fragment postFrag on PostRecord {
    id
    slug
    title
    _firstPublishedAt
    _publishedAt
    isFeatured
    publishDate
    excerpt{
      value
    }
    pic {
      alt
      author
      copyright
      title
      url(imgixParams: {auto:format, w: "1280" ,h:"600", fit:crop, })
      responsiveImage (imgixParams: { fit:crop, w:"1280", h:"600", auto:format }){
        ...imgFrag
      }
    }
    preview: pic {
      url(imgixParams: {auto:format, w:"600" ,h:"400",fit:crop, })
      responsiveImage (imgixParams: { fit:crop, w:"600", h:"400", auto:format }){
        ...imgFrag
      }
    }
    author {
      ...authorFrag
    }
    tags{
      ...tagFrag
    }
}
`;

//BIG BLOCKS
const structured_content_block = `
content {
  value
  blocks {
    __typename
    ... on LinkRecord {
      ${linkBlock}
    }
    ... on GalleryRecord {
      ${galleryBlock}
    }
    ... on InternalVideoRecord {
      ${internalVideoBlock}
    }
    ... on EmbeddedVideoRecord {
      ${embeddedVideoBlock}
    }
    ... on CtaRecord {
      ${ctaBlock}
    }
  }
  links {
    __typename
    ... on PostRecord {
      id
      slug
      _modelApiKey
    }
    ... on PageRecord {
      id
      slug
      _modelApiKey
    }
    ... on TagRecord {
      id
      slug
      name
      _modelApiKey
    }
  }
}`;

const mod_blocks = `
modBlocks {
  ... on CtaRecord {
    ${ctaBlock}
  }
  ... on LinkRecord {
    ${linkBlock}
  }
  ... on InternalVideoRecord {
    ${internalVideoBlock}
  }
  ... on GalleryRecord {
    ${galleryBlock}
  }
  ... on EmbeddedVideoRecord {
    ${embeddedVideoBlock}
  }
  ... on QuoteRecord {
    __typename
    id
    text
    attribution
  }
  ... on ParagraphRecord {
    __typename
    id
    text
  }
  ... on PageSectionRecord {
    __typename
    id
    title
    level
  }
  ... on CodeHighlightRecord {
    __typename
    id
    code
    language
  }
  ... on WidgetBlockRecord {
    __typename
    id
    title
    widgets {
      id
      numberOfItems
      widget
    }
  }
  ... on TestimonialsBlockRecord {
    __typename
    id
    title
    layout
    description
    testimonials {
      text
      summary
      role
      pic
      name
      id
    }
  }
  ... on TeamBlockRecord {
    __typename
    id
    title
    people {
      ...authorFrag
    }
  }
  ... on StatsBlockRecord {
    __typename
    id
    title
    stats {
      id
      value
      icon
      category
    }
  }
  ... on PricingBlockRecord {
    __typename
    id
    title
    text
    prices {
      id
      period
      title
      isMostPopular
      features
      currency
      amount
      action
    }
  }
  ... on FeatureBlockRecord {
    __typename
    id
    title
    features {
      id
      text
      title
      icon
    }
  }
}
`;

const slideShowBlock = `
id
name
slides {
  title
  id
    image {
    id
    alt
    author
    copyright
    title
    tags
    copyright
    url (imgixParams: { fit:crop, w:"1920", h:"720", auto:format })
    responsiveImage (imgixParams: { fit:crop, w:"1920", h:"720", auto:format }){
      ...imgFrag
    }
  }
}`;

const seoBlock = `
  attributes
  content
  tag
`;

//QUERY

export const post = `
query post ($slug: String!) {
  post(filter: {slug: {eq: $slug}}) {
    ...postFrag
    ${structured_content_block}
    seo: _seoMetaTags {
      ${seoBlock}
    }
  }
}
${imgFrag}
${authorFrag}
${tagFrag}
${postFrag}
`;

export const postList = `
query postList {
  posts: allPosts {
    ...postFrag
  }
}
${imgFrag}
${authorFrag}
${tagFrag}
${postFrag}
`;

export const filterPosts = `
query filterPosts($isFeatured: BooleanType, $limit: IntType) {
  posts: allPosts(filter: {isFeatured: {eq: $isFeatured}}, first: $limit, orderBy: _firstPublishedAt_DESC) {
    ...postFrag
  }
}
${imgFrag}
${authorFrag}
${tagFrag}
${postFrag}
`;

export const tagList = `
query tagList {
  tags: allTags(orderBy: name_ASC) {
    ...tagFrag
    pic {
      url(imgixParams: {w: "250", auto:format, h: "250", fit:crop})
      responsiveImage(imgixParams: {w: "250", auto:format, h: "250", fit:crop}) {
        ...imgFrag
      }
    }
  }
}
${imgFrag}
${tagFrag}
`;

export const tagBySlug = `
query tag ($slug: String!) {
  tag(filter: {slug: {eq: $slug}}) {
    ...tagFrag
    pic {
      url(imgixParams: {w: "1920", auto:format, h: "600", fit:crop})
      responsiveImage(imgixParams: {w: "1920", auto:format, h: "600", fit:crop}) {
        ...imgFrag
      }
    }
    seo: _seoMetaTags {
      ${seoBlock}
    }
  }
}
${tagFrag}
${imgFrag}
`;

export const tagRelated = `
query tagRelated ($id: ItemId!) {
  posts: allPosts(filter: {tags: {anyIn: [$id]}}) {
    ...postFrag
  }
  people: allAuthors(filter: {tags: {anyIn: [$id]}}) {
    ...authorFrag
  }
}
${imgFrag}
${authorFrag}
${tagFrag}
${postFrag}
`;

export const author = `
query author ($slug: String!) {
  author(filter: {slug: {eq: $slug}}) {
    ...authorFrag
    seo: _seoMetaTags {
      ${seoBlock}
    }
  }
}
${authorFrag}
${imgFrag}
`;

export const authors = `
query authors {
  authors: allAuthors {
    ...authorFrag
  }
}
${authorFrag}
${imgFrag}
`;

export const page = `
query post ($slug: String!) {
  page(filter: {slug: {eq: $slug}}) {
    id
    pic {
      alt
      author
      copyright
      title
      url(imgixParams: { fit:crop, w:1280, h:600, auto:format})
      responsiveImage(imgixParams: { fit:crop, w:1280, h:600, auto:format }){
        ...imgFrag
      }
    }
    title
    slug
    seo: _seoMetaTags {
      ${seoBlock}
    }
    slideshow {
      ${slideShowBlock}
    }
    ${structured_content_block}
    ${mod_blocks}

  }
}
${imgFrag}
${authorFrag}
`;

export const pages = `
query pages {
  pages: allPages(filter: {isContentGenerated: {eq: "false"}}) {
    id
    title
    slug
  }
}
`;

export const home = `
query home {
  home {
    id
    title
    slug
    seo: _seoMetaTags {
      ${seoBlock}
    }
    slideshow {
      ${slideShowBlock}
    }
    ${structured_content_block}
    ${mod_blocks}

  }
}
${authorFrag}
${imgFrag}
`;

export const siteQuery = `
query siteNav {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  footer {
    copy
    socials: social {
      id
      title
      externalLinkUrl
    }
    showNewsletterForm
    columns {
      id
      title
      pages {
        __typename
        ... on HomeRecord {
          id
          slug
          title
        }
        ... on PageRecord {
          id
          title
          slug
        }
      }
    }
  }
  menu: navigationMenu{
    nav: mainNavLinks {
      ...menuItemFrag
      children {
        ...menuItemFrag
      }
    }
    showThemeSwitch
    actions: actionButtons {
      id
      title
      externalLinkUrl
      internalLink{
        ${internalLinkBlock}
      }
    }
  }
}
${menuItemFrag}
`;
