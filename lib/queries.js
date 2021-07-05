// FRAGMENTS
const menuItemFrag = `fragment menuItemFrag on MenuItemRecord {
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
  name
  slug
  _modelApiKey
  pic {
    url(imgixParams: {auto: format, maxW: "200", q: "80"})
    responsiveImage {
      ...imgFrag
    }
  }
}
`;

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
  }
`;

const linkBlock = `
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
        title
        tags
        copyright
        url(imgixParams: {auto: format, maxW: "300", q: "80"})
        responsiveImage {
          ...imgFrag
        }
      }
`;
const galleryBlock = `
id
images {
  id
  alt
  author
  title
  tags
  url(imgixParams: {auto: format, maxW: "800", q: "80"})
  responsiveImage {
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
id
description
title
externalLink
internalLink {
  ... on TagRecord {
    id
    name
  }
  ... on PostRecord {
    id
    slug
    tags{
      id
      name
    }
  }
  ... on PageRecord {
    id
    title
    slug
  }
  ... on AuthorRecord {
    id
    name
  }
}`;
const embeddedVideoBlock = `
id
video{
  url
  thumbnailUrl
}
`;
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
    title
    tags
    copyright
    url(imgixParams: {auto: format, maxW: "900", q: "80"})
    responsiveImage {
      ...imgFrag
    }
  }
}`;

const seoBlock = `
title
description
image {
  url(imgixParams: {auto: format, maxW: "300"})
}`;

//QUERY

export const post = `
query post ($slug: String!) {
  post(filter: {slug: {eq: $slug}}) {
    id
    slug
    title
    excerpt{
      value
    }
    pic {
      url(imgixParams: {auto: format, maxW: "200", q: "80"})
      responsiveImage {
        ...imgFrag
      }
    }
    author {
      id
      name
    }
    ${structured_content_block}
  }
}
${imgFrag}
`;

export const postList = `
query postList {
  posts: allPosts {
    _modelApiKey
    id
    slug
    title
    excerpt{
      value
    }
    pic {
       url(imgixParams: {auto: format, maxW: "200", q: "80"})
       responsiveImage {
          ...imgFrag
        }
      }
  }
}
${imgFrag}
`;

export const author = `
query author ($slug: String!) {
  author(filter: {slug: {eq: $slug}}) {
    ...authorFrag
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

export const pages = `
query pages {
  pages: allPages {
    id
    seo {
      ${seoBlock}
    }
    slug
    title
    _publicationScheduledAt
    ${mod_blocks}
  }
}
${imgFrag}
`;

export const home = `
query home {
  home {
    id
    title
    slug
    slideshow {
      ${slideShowBlock}
    }
    ${structured_content_block}
    ${mod_blocks}
    seo {
      description
      title
      image {
        url(imgixParams: {auto: format, maxW: "300"})
      }
    }
  }
}
${imgFrag}
`;

export const siteQuery = `
query siteNav {
  site: _site {
    globalSeo {
      siteName
      fallbackSeo {
        title
        description
        image {
          url(imgixParams: {maxW: "800"})
        }
        twitterCard
      }
      twitterAccount
      titleSuffix
    }
    faviconMetaTags {
      tag
      content
      attributes
    }
    favicon {
      url
      id
      tags
      title
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
