export default function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const resolvePage = (link) => {
  //console.log(link.__typename)
  if (link?.slug && link.slug != 'home') {
    return `/${link.slug}`;
  }
  return `/`;
};
