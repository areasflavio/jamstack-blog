import { GetStaticProps } from 'next';
import { PageDocument, usePageQuery } from '../generated/graphql';
import { client, ssrCache } from '../lib/urql';

export default function Home() {
  const [{ data }] = usePageQuery({
    variables: {
      slug: 'about',
    },
  });

  return <h1>{data?.page.title}</h1>;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  await client
    .query(PageDocument, {
      slug: 'about',
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
