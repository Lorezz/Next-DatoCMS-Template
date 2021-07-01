// FRAGMENTS
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

const structured_content_block = `
content {
  value
  blocks {
    __typename
    ... on LinkRecord {
      id
      title
      externalLinkUrl
      internalLink {
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
    }
    ... on GalleryRecord {
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
    }
    ... on InternalVideoRecord {
      id
    }
    ... on EmbeddedVideoRecord {
      id
    }
    ... on CtaRecord {
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
      }
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

const modular_content_block = `
content_blocks {
  ... on CtaRecord {
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
    }
  }
  ... on LinkRecord {
    id
    title
    _modelApiKey
  }
  ... on InternalVideoRecord {
    id
  }
  ... on GalleryRecord {
    id
    images {
      id
      responsiveImage {
        ...imgFrag
      }
    }
  }
  ... on EmbeddedVideoRecord {
    id
  }
}
`;

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
  allAuthors {
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
      title
      description
      image {
        responsiveImage {
          ...imgFrag
        }
      }
    }
    slug
    title
    _publicationScheduledAt
    ${modular_content_block}
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
      }
    }
    ${structured_content_block}
    seo {
      description
      title
      image {
        title
        url(imgixParams: {auto: format, maxW: "300"})
      }
    }
  }
}

${imgFrag}
`;
