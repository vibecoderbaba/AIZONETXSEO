import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AIChatbot } from "@/components/platform/ai-chatbot";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "AIZONET | Premium AI Digital Marketing Agency in Raipur",
    template: "%s | AIZONET",
  },
  description: "AIZONET is a leading AI digital marketing agency in Raipur, Chhattisgarh. We specialize in AI SEO, automated Google Ads, Meta ads, and custom AI chatbots for small businesses.",
  keywords: ["AI Digital Marketing Agency", "AI Marketing Raipur", "Digital Marketing Chhattisgarh", "AI SEO Services India", "AI Marketing for Small Business"],
  authors: [{ name: "AIZONET Team" }],
  creator: "AIZONET",
  publisher: "AIZONET",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aizonet.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aizonet.in",
    siteName: "AIZONET",
    title: "AIZONET | AI-Powered Digital Marketing Agency",
    description: "Transform your business with AI-driven marketing strategies. ROI-focused AI SEO, Ads, and Automation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIZONET AI Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIZONET | AI-Powered Digital Marketing Agency",
    description: "Revolutionizing digital marketing with Artificial Intelligence.",
    images: ["/og-image.png"],
    creator: "@aizonet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          outfit.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <AIChatbot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

