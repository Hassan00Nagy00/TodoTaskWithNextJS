import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My App",
  description: "Tasks + Products App (Next.js + MongoDB)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container nav">
            <div className="brand">My App</div>

            <nav style={{ display: "flex", gap: "20px" }}>
              <Link className="link" href="/">
                Home
              </Link>
              <Link className="link" href="/tasks">
                Tasks
              </Link>
              <Link className="link" href="/products">
                Products
              </Link>
              <Link className="link" href="/admin">
                Admin
              </Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
