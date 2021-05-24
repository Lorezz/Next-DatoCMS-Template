export const imgFrag = `
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
  _modelApiKey
  pic {
    responsiveImage {
      ...imgFrag
    }
  }
}
`;

export const posts = `
query posts {
  posts: allPosts {
    _modelApiKey
    id
    slug
    title
    author {
      id
      name
    }
    content {
      blocks {
        ... on CtaRecord {
          id
          _modelApiKey
          title
          description
          externalLink
          internalLink {
            ... on TagRecord {
              id
              name
              _modelApiKey
            }
            ... on PostRecord {
              id
              _modelApiKey
            }
            ... on PageRecord {
              id
              _modelApiKey
            }
            ... on AuthorRecord {
              id
              name
              _modelApiKey
            }
          }
          action
        }
        ... on GalleryRecord {
          id
          _modelApiKey
          images {
            id
            responsiveImage {
              ...imgFrag
            }
            title
            url
          }
        }
        ... on InternalVideoRecord {
          id
          _modelApiKey
          loop
          autoplay
          video {
            id
            video {
              thumbnailUrl
              streamingUrl
              muxPlaybackId
              mp4Url
            }
          }
        }
        ... on LinkRecord {
          id
          _modelApiKey
          title
          externalLinkUrl
          internalLink {
            ... on AuthorRecord {
              id
              name
              _modelApiKey
            }
            ... on PageRecord {
              id
              _modelApiKey
              title
            }
            ... on PostRecord {
              id
              _modelApiKey
              title
            }
            ... on TagRecord {
              id
              name
              _modelApiKey
            }
          }
        }
        ... on EmbeddedVideoRecord {
          id
          _modelApiKey
          video {
            title
            url
          }
        }
      }
      value
      links {
        ... on TagRecord {
          id
          name
          _modelApiKey
        }
        ... on PostRecord {
          id
          _modelApiKey
        }
        ... on AuthorRecord {
          id
              name
              _modelApiKey
        }
      }
    }
  }
}
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
    contents {
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
          responsiveImage(imgixParams: {auto: format, maxW: "1200"}) {
            ...imgFrag
            title
            src
          }
          id
          url(imgixParams: {maxW: "1200", auto: format})
          title
          tags
        }
      }
    }
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
            responsiveImage {
              ...imgFrag
            }
          }
        }
        ... on GalleryRecord {
          id
          images {
            responsiveImage {
              ...imgFrag
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
      }
    }
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
