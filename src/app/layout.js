import { Montserrat } from "next/font/google";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Portfolio | Ankush Rajput",
  description:
    "Portfolio of Ankush Rajput, a Full-Stack Engineer & AI Systems Builder architecting AI agents, RAG pipelines, and automation (LangChain, Pinecone, Qdrant, FastAPI) alongside scalable Next.js/Node.js applications, with SEO/AEO/GEO and Meta Ads growth engineering.",
  keywords:
    "Ankush Rajput, portfolio, full stack engineer, AI systems builder, AI agents, RAG, LangChain, Pinecone, Qdrant, vector database, Next.js, Node.js, Go, PostgreSQL, MongoDB, Supabase, SEO, AEO, GEO, Meta Ads, Figma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <meta
          name="google-site-verification"
          content="fCPHqjSiAJrJtF7Jz2y1dTiZo7zgGSTiomQ8b6p1sxk"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          id="favicon"
          rel="shortcut icon"
          href="/assets/images/favicon.png"
          type="image/x-png"
        />
        <SmoothScroll />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
