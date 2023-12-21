import { gql } from "@apollo/client";

export const PROPERTY_SLUGS_QUERY = gql`
  query {
    properties {
      slug
    }
  }
`;

export const PROPERTY_BY_SLUG_QUERY = gql`
  query($where: JSON) {
    properties(where: $where) {
      name
      description
      price
      bedrooms
      bathrooms
      livingArea
      plotSize
      terrace
      location
      type {
        name
      }
      aspects {
        id
        name
      }
      town {
        name
        content
        media {
          category
          images {
            url
          }
        }
        location {
          name
          province {
            name
          }
        }
      }
      seo {
        title
      }
    }
  }
`;

export const PROPERTIES_SLIDER_SLIDES_QUERY = gql`
  query {
    properties(limit: 10, sort: "published_at:desc") {
      price
      name
      slug
      media(where: { category: "banner" }) {
        images {
          url
          alternativeText
        }
      }
    }
  }
`;

export const PROPERTY_MEDIA_QUERY = gql`
  query($where: JSON) {
    mediaFiles(where: $where) {
      category
      images {
        url
        width
        height
      }
    }
  }
`;

export const BLOG_POSTS_QUERY = gql`
  query($where: JSON) {
    blogs(where: $where) {
      title
      author
      published_at
      backgroundImage {
        url
        width
        height
      }
      content {
        __typename
        ... on ComponentBlogContentText {
          text
        }
        ... on ComponentBlogContentMedia {
          media {
            url
            width
            height
          }
        }
        ... on ComponentBlogBanner {
          title
          body
          url
        }
      }
    }
  }
`;

export const RELATED_BLOG_POSTS_QUERY = gql`
  query($limit: Int = 2, $sort: String = "published_at:desc", $slug: String) {
    blogs(limit: $limit, sort: $sort, where: { slug_ne: $slug }) {
      slug
      title
      summary
      backgroundImage {
        url
      }
    }
  }
`;

export const BLOG_POST_SLUGS_QUERY = gql`
  query {
    blogs {
      slug
    }
  }
`;
