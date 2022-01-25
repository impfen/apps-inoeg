import Head from "next/head";
import { title } from "process";
import { Footer, Header } from "./page";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: any;
  locale?: string;
  setLocale: (locale: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  setLocale = () => undefined,
  locale = "de",
}) => {
  const HeaderContent = header;
  const FooterContent = footer;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header mobile={footer}>
        <HeaderContent locale={locale} setLocale={setLocale} />
      </Header>

      {children}

      {FooterContent && (
        <Footer>
          <FooterContent locale={locale} setLocale={setLocale} />
        </Footer>
      )}
    </>
  );
};
