import Footer from "../components/Footer";
import ServerProtectedComponents from "../components/ServerProtectedComponent";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ServerProtectedComponents>
        <Navbar />
        {children}
        <Footer />
      </ServerProtectedComponents>
    </>
  );
}
