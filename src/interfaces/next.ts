import { AppProps as BaseAppProps } from 'next/app';
import {
  NextComponentType as BaseNextComponentType,
  NextPage as BaseNextPage,
  NextPageContext as BaseNextPageContext,
} from 'next';

export type NextPageProps = {
  layout?: (page: React.ReactElement) => JSX.Element;
};

export type NextComponentType = NextPageProps &
  BaseNextComponentType<BaseNextPageContext, unknown, Record<string, unknown>>;

export type NextAppProps = BaseAppProps & {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
};

export type NextPage<P = Record<string, unknown>, IP = P> = NextPageProps & BaseNextPage<P, IP>;
