import { formatDate, getMediaUrl, markdownToHtml } from "./utils";

export const normalizeProperty = async ({ __typename, ...data }: any = {}) => {
  const townImage = data.town?.media?.filter(
    (media) => media?.category === "banner"
  )?.[0]?.images?.[0]?.url;

  return {
    ...data,
    latitude: data.location?.lat || null,
    longitude: data.location?.lng || null,
    description:
      (data.description && (await markdownToHtml(data.description))) || null,
    type: data.type?.name || null,
    town: {
      name: data.town?.name || null,
      content:
        (data.town?.content && (await markdownToHtml(data.town?.content))) ||
        null,
      imgUrl: townImage ? getMediaUrl(townImage) : null,
    },
    location: {
      name: data.town?.location?.name || null,
    },
    province: {
      name: data.town?.location?.province?.name || null,
    },
  };
};

export const normalizeSlides = (data) => {
  return (
    data?.map((property) => {
      const imgUrl = property.media?.[0]?.images?.[0]?.url;
      const imgAlt = property.media?.[0]?.images?.[0]?.alternativeText;
      return {
        slug: property.slug || null,
        title: property.name || null,
        price: property.price || null,
        imgUrl: imgUrl ? getMediaUrl(imgUrl) : null,
        imgAlt: imgAlt || "",
      };
    }) || []
  );
};

export const normalizeMedia = (data) => {
  return (
    data?.map?.((media) => ({
      category: media?.category || null,
      images:
        media?.images?.map((image) => ({
          url: image?.url ? getMediaUrl(image.url) : null,
          width: image?.width || null,
          height: image?.height || null,
        })) || [],
    })) || []
  );
};

export const normalizeBlogs = async (data: any = {}) => {
  const promises = (data?.content || []).map(async (item) => {
    if (item.__typename === "ComponentBlogContentText") {
      return {
        ...item,
        text: await markdownToHtml(item.text),
      };
    } else if (item.__typename === "ComponentBlogContentMedia") {
      return {
        ...item,
        media: item.media.map((media) => ({
          ...media,
          url: getMediaUrl(media.url),
        })),
      };
    }
    return item;
  });

  return {
    ...data,
    backgroundImage: {
      ...(data?.backgroundImage || {}),
      url: data?.backgroundImage?.url
        ? getMediaUrl(data?.backgroundImage?.url)
        : null,
    },
    publishedAt: (data?.published_at && formatDate(data?.published_at)) || null,
    content: await Promise.all(promises),
  };
};
