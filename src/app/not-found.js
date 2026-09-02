import "./not-found.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisableDevTools from "@/components/DisableDevTools";

export const metadata = {
  title: "Got Lost! Page Not Found",
};

export default function NotFound() {
  return (
    <main className="page-notfound">
      <DisableDevTools />
      <Header variant="sub" />

      <section className="page_404">
        <div className="container">
          <div className="wrapper">
            <h1 className="text-center">404</h1>
          </div>

          <div className="msg">
            <h3>Looks like you&apos;re lost</h3>
            <p>The page you are looking for is not available!</p>

            <div className="backbtn">
              <Link href="/" className="btn">
                <i className="fas fa-arrow-left"></i>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="notfound" />
    </main>
  );
}
