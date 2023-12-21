import { MyApp } from "@components/App";
import { Home as MyHome } from "@components/Home";
import { normalizeSlides } from "lib/api";
import { initializeApollo } from "lib/apolloClient";
import { PROPERTIES_SLIDER_SLIDES_QUERY } from "lib/GraphQL/queries";

export default function Home(props) {
  return (
    <MyApp>
      <MyHome {...props} />
    </MyApp>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data: slidesData } = await apolloClient.query({
    query: PROPERTIES_SLIDER_SLIDES_QUERY,
  });

  return {
    props: {
      slides: normalizeSlides(slidesData?.properties),
    },
    revalidate: 1,
  };
}
