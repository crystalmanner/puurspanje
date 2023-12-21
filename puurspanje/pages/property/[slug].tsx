import { MyApp } from "@components/App";
import { Property } from "@components/Property";
import { GetStaticPaths, GetStaticProps } from "next";
import { normalizeMedia, normalizeProperty, normalizeSlides } from "lib/api";
import { useRouter } from "next/router";
import { initializeApollo } from "lib/apolloClient";
import {
  PROPERTIES_SLIDER_SLIDES_QUERY,
  PROPERTY_BY_SLUG_QUERY,
  PROPERTY_SLUGS_QUERY,
  PROPERTY_MEDIA_QUERY,
} from "lib/GraphQL/queries";
import { gql } from "@apollo/client";

export default function Home(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading ...</div>;
  }

  return (
    <MyApp>
      <Property {...props} />
    </MyApp>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PROPERTY_SLUGS_QUERY,
  });

  return {
    paths:
      data?.properties?.map(
        (property) => `/property/${property?.slug || "404"}`
      ) || [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({
  params: { slug } = {},
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { propertyCount },
  } = await apolloClient.query({
    query: gql`
      query($where: JSON) {
        propertyCount(where: $where)
      }
    `,
    variables: {
      where: { slug },
    },
  });

  if (propertyCount === 0) {
    return {
      notFound: true,
    };
  }

  const [
    { data: propertyData },
    { data: slidesData },
    { data: propertyMediaData },
  ] = await Promise.all([
    apolloClient.query({
      query: PROPERTY_BY_SLUG_QUERY,
      variables: { where: { slug } },
    }),
    apolloClient.query({
      query: PROPERTIES_SLIDER_SLIDES_QUERY,
    }),
    apolloClient.query({
      query: PROPERTY_MEDIA_QUERY,
      variables: { where: { property: { slug } } },
    }),
  ]);

  return {
    props: {
      ...(await normalizeProperty(propertyData?.properties?.[0])),
      media: normalizeMedia(propertyMediaData?.mediaFiles),
      slides: normalizeSlides(slidesData?.properties),
    },
    revalidate: 1,
  };
};
