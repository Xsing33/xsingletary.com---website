import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xavier Singletary: GTM Engineering, Not Another Tool",
  description:
    "GTM engineering systems for Series B/C sales and marketing teams. The tools aren't the problem. The connections between them are.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg"></div>
        <div className="scanlines"></div>
        <div className="vignette"></div>
        {children}
      </body>
    </html>
  );
}
