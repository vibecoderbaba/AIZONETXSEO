import { Metadata } from "next";

export function constructMetadata({
  title = "AIZONET | Premium AI Digital Marketing Agency in Raipur",
  description = "AIZONET is a leading AI digital marketing agency in Raipur, Chhattisgarh. We specialize in AI SEO, automated Google Ads, and AI chatbots.",
  image = "/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@aizonet",
    },
    icons,
    metadataBase: new URL("https://aizonet.in"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
