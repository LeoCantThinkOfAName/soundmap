export const fetchTracks = (lang: string, callback: any) => {
  const contentful = require("contentful");
  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_API,
  });
  client
    .getEntries({ content_type: "track", locale: lang })
    .then((res: any) => {
      callback(res.items);
    })
    .catch((err: any) => console.log(err));
};
