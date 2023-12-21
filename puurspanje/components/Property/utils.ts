export const getInfoList = ({
  type,
  terrace,
  livingArea,
  plotSize,
  bedrooms,
  bathrooms,
}) => {
  const infoList = [
    {
      id: 1,
      iconSrc: "/assets/info-house.svg",
      value: type,
      name: "",
    },
    {
      id: 2,
      iconSrc: "/assets/info-size.svg",
      value: livingArea + " mÂ²",
      name: "Wonen",
    },
    {
      id: 3,
      iconSrc: "/assets/info-bed.svg",
      value: bedrooms,
      name: "Slaapkamers",
    },
    {
      id: 4,
      iconSrc: "/assets/info-terras.svg",
      value: terrace + " mÂ²",
      name: "Terras",
    },
    {
      id: 5,
      iconSrc: "/assets/info-area.svg",
      value: plotSize + " mÂ²",
      name: "Perceel",
    },
    {
      id: 6,
      iconSrc: "/assets/info-bath.svg",
      value: bathrooms,
      name: "Badkamers",
    },
  ];

  return infoList;
};

export const getMediaByCategory = (media, category: string) => {
  if (!media) return null;

  return media.filter((mediaItem) => mediaItem.category === category)?.[0]
    ?.images;
};
