# Next-DatoCMS-Template

A free to use DatoCMS template and an open-source Next.js sample to create a complete site. You can duplicate this template and deploy the frontend from GitHub.

This project uses [Chackra Ui](https://chakra-ui.com/) as Ui library, and cotains some samples block from [Chakra Templates](https://chakra-templates.dev/) .

This project contains also some examples from [Framer Motion](https://www.framer.com/docs/examples/).

Contains examples of how to use DatoCMS Metatags for SEO, StructuredText, ModularContent, Dato ResponsiveImage, Mux video stream, Embedded video from Youtube or Vimeo, Leaflet and Mapbox Map, Code Highlighter, Swiper Carousel and several other useful Blocks.

## Features in progress:

- multi language
- datocms full text search
- map sample block

![preview](https://www.datocms-assets.com/47575/1625869520-screenshot-2021-07-10-at-00-24-19.png)

repository: [https://github.com/lorezz/next-datocms-template](https://github.com/lorezz/next-datocms-template)

demo: [https://next-datocms-template.netlify.app](https://next-datocms-template.netlify.app)

# Clone this project

## Solution 1: Clone Dato project then Deploy repository

Clone the Datocms project.

[![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=47575&name=Next-DatoCMS-Template)

Then deploy to Vercel or Netlify:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FLorezz%2FNext-DatoCMS-Template.git&env=NEXT_PUBLIC_DATO_KEY,SITE_URL&project-name=my-next-datocms-site&repository-name=my-next-datocms-site&demo-title=Next-DatoCMS-Template&demo-description=A%20free%20DatoCMS%20model%20with%20frontend%20code%20blocks%20to%20create%20a%20complete%20site.%20You%20can%20duplicate%20this%20template%20and%20deploy%20the%20frontend%20from%20GitHub.&demo-url=https%3A%2F%2Fnext-datocms-template.netlify.app&demo-image=https%3A%2F%2Fwww.datocms-assets.com%2F47575%2F1625869520-screenshot-2021-07-10-at-00-24-19.png)

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lorezz/next-datocms-template#NEXT_PUBLIC_DATO_KEY=YOU-DATOCMS-KEY&SITE_URL=YOUR-NETLIFY-URL)

## Solution 2: Do everything with DatoCMS stater

This button should start a setup that will guide you during the whole process

[![Deploy DatoCMS starter](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=https://github.com/Lorezz/Next-DatoCMS-Template)

# Setup the project in local

```bash
clone git@github.com:Lorezz/Next-DatoCMS-Template.git MY-PROJECT-NAME
cd MY-PROJECT-NAME
rm -fr *.git #remove all prev git
mv sample-env.local .env.local #and fill your variables
yarn install
yarn dev
```
