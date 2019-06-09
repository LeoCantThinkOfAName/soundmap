export default (gId: string, lang: string, callback: any) => {
  const contentful = require("contentful");
  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_API,
  });
  client
    .getEntries({
      content_type: "user",
      "fields.gid[in]": `${parseInt(gId)}`,
      locale: lang,
    })
    .then((res: any) => {
      const userData = {
        favList: res.items[0].fields.favorite
          ? res.items[0].fields.favorite
          : [],
        contentfulId: res.items[0].sys.id,
      };
      callback(userData);
    })
    .catch((err: any) => console.log(err));
};
