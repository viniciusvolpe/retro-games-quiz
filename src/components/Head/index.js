import Head from "next/head";
import db from "../../../db.json";

const SiteHeade = () => {
  return (
    <Head>
      <title>{db.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={db.title} />
      <meta property="og:image" content={db.bg} />
      <link
        href="http://fonts.cdnfonts.com/css/amiga-forever"
        rel="stylesheet"
      />
    </Head>
  );
};

export default SiteHeade;
