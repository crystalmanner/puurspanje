import { Footer } from "./Footer";
import { Header } from "./Header";
import { TopBanner } from "./TopBanner";

export const MyApp: React.FC<{ headerWrapperClass?: string }> = ({
  children,
  headerWrapperClass,
}) => (
  <>
    <TopBanner />
    <Header wrapperClass={headerWrapperClass} />
    <main>{children}</main>
    <Footer />
  </>
);
