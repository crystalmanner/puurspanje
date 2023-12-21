import { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  title: "Huis kopen in Spanje",
  description:
    "Wij zijn al meer dan 15 jaar lang DE specialist als makelaar van vastgoed aan de Costa Cálida Noord en Costa Blanca Zuid te Spanje!",
  // canonical: "https://www.puurspanje.nl/",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Huis kopen in Spanje",
    url: "https://www.puurspanje.nl/",
    description:
      "Wij zijn al meer dan 15 jaar lang DE specialist als makelaar van vastgoed aan de Costa Cálida Noord en Costa Blanca Zuid te Spanje!",
    site_name: "Puurspanje",
    images: [
      {
        url:
          "https://www.puurspanje.nl/wp-content/uploads/2019/03/3829_2-1.jpg",
        width: 1024,
        height: 768,
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
