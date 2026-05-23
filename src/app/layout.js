import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "PDF QnA",
  description: "RAG Implementation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body>
        {children}
        <footer className="footer">Made by Kartik</footer>
      </body>
    </html>
  );
}
