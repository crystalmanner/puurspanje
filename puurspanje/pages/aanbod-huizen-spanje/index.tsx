import { MyApp } from "@components/App";
import { SearchPage } from "@components/SearchPage";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";

export default function MySearchPage(props) {
  const apolloClient = useApollo(props);
  return (
    <ApolloProvider client={apolloClient}>
      <MyApp>
        <SearchPage {...props} />
      </MyApp>
    </ApolloProvider>
  );
}
