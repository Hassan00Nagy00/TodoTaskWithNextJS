import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Simple ToDo App",
  description: "A small ToDo app made with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container nav">
            <div className="brand">My ToDo App</div>
            <nav>
              <Link className="link" href="/">
                Dashboard
              </Link>
              <Link className="link" href="/tasks">
                Add Task
              </Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
