import { gql } from "@apollo/client";
import { MyApp } from "@components/App";
import { Blog } from "@components/Blog";
import { normalizeBlogs } from "lib/api";
import { initializeApollo } from "lib/apolloClient";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_SLUGS_QUERY,
  RELATED_BLOG_POSTS_QUERY,
} from "lib/GraphQL/queries";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from "./Blog.module.scss";

export default function Home(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading ...</div>;
  }

  return (
    <MyApp headerWrapperClass={styles.headerWrapper}>
      <Blog {...props} />
    </MyApp>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: BLOG_POST_SLUGS_QUERY,
  });

  return {
    paths: data?.blogs?.map((blog) => `/blog/${blog?.slug || "404"}`) || [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug } = {},
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { blogCount },
  } = await apolloClient.query({
    query: gql`
      query($where: JSON) {
        blogCount(where: $where)
      }
    `,
    variables: {
      where: { slug },
    },
  });

  if (blogCount === 0) {
    return {
      notFound: true,
    };
  }

  const [{ data: blogData }, { data: relatedBlogsData }] = await Promise.all([
    apolloClient.query({
      query: BLOG_POSTS_QUERY,
      variables: {
        where: { slug },
      },
    }),
    apolloClient.query({
      query: RELATED_BLOG_POSTS_QUERY,
      variables: { slug },
    }),
  ]);

  return {
    props: {
      ...(await normalizeBlogs(blogData?.blogs?.[0])),
      relatedPosts: relatedBlogsData.blogs,
    },
    revalidate: 1,
  };
};
