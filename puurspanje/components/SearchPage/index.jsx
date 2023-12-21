import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchPage.module.scss";
import cn from "classnames";
import Cross from "@public/assets/cross.svg";
import { Button } from "@components/common";
import { CheckBoxField } from "@components/common/Checkbox";
import { Select } from "@components/common/Select";
import { useRouter } from "next/router";
import querystring from "query-string";
import { checkboxes } from "./constants";
import { gql, useQuery } from "@apollo/client";
import { PropertyItem } from "./PropertyItem";
import { PropertyItemSkeleton } from "./PropertyItemSkeleton";
import { formatPrice } from "lib/utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function makeQuery(inputs = []) {
  const query = {};
  inputs.forEach((el) => {
    const option = {
      type: el.type,
      name: el.name,
      value: el.value,
      checked: el.checked,
    };
    switch (option.type) {
      case "select-one": {
        query[option.name] = option.value || null;
        break;
      }
      case "checkbox": {
        if (!query[option.name]) {
          query[option.name] = [];
        }
        query[option.name] = [
          ...query[option.name],
          option.checked ? option.value : null,
        ];
        break;
      }
      case "radio": {
        query[option.name] = query[option.name]
          ? option.checked
            ? option.value
            : query[option.name]
          : option.checked
          ? option.value
          : null;
        break;
      }
    }
  });
  return querystring.stringify(query, {
    arrayFormat: "comma",
    skipNull: true,
  });
}

const PROPERTY_QUERY = gql`
  query($where: JSON!) {
    properties(where: $where) {
      slug
      name
      media(where: { category: "banner" }) {
        category
        images {
          url
          alternativeText
        }
      }
      town {
        location {
          name
        }
      }
      bathrooms
      bedrooms
      price
    }
  }
`;

export const SearchPage = (props) => {
  const [query, setQuery] = useState({});
  const [{ countLoading, count }, setCount] = useState({
    countLoading: true,
    count: 0,
  });
  const { loading, data: { properties } = {} } = useQuery(PROPERTY_QUERY, {
    variables: {
      where: query,
    },
  });
  const [showMap, setShowMap] = useState(false);
  const controls = useRef(new Map());
  const router = useRouter();

  useEffect(() => {
    const propertiesQuery = {};
    const countQuery = [];
    Object.keys(router.query).forEach((key) => {
      const control = controls.current.get(key);
      const values = router.query[key].split(",");
      values.forEach(control.select);

      switch (key) {
        case "regio": {
          propertiesQuery["town"] = {
            location: {
              province: {
                slug: router.query[key],
              },
            },
          };
          countQuery.push(
            `_where[${countQuery.length}][town.location.province.slug]=${router.query[key]}`
          );
          break;
        }
        case "prijs_van": {
          propertiesQuery["price_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][price_gte]=${router.query[key]}`
          );
          break;
        }
        case "prijs_tot": {
          propertiesQuery["price_lte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][price_lte]=${router.query[key]}`
          );
          break;
        }
        case "soort_aanbod": {
          propertiesQuery["type"] = {
            slug_in: router.query[key].split(","),
          };
          countQuery.push(
            router.query[key]
              .split(",")
              .map((val) => `_where[${countQuery.length}][type.slug_in]=${val}`)
              .join("&")
          );
          break;
        }
        case "gebruiksoopervlakte_wonen": {
          propertiesQuery["livingArea_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][livingArea_gte]=${router.query[key]}`
          );
          break;
        }
        case "perceeloppervlakte": {
          propertiesQuery["plotSize_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][plotSize_gte]=${router.query[key]}`
          );
          break;
        }
        case "perceeloppervlakte": {
          propertiesQuery["plotSize_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][plotSize_gte]=${router.query[key]}`
          );
          break;
        }
        case "aantal_slaapkamers": {
          propertiesQuery["bedrooms_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][bedrooms_gte]=${router.query[key]}`
          );
          break;
        }
        case "aantal_badkamers": {
          propertiesQuery["bathrooms_gte"] = router.query[key];
          countQuery.push(
            `_where[${countQuery.length}][bathrooms_gte]=${router.query[key]}`
          );
          break;
        }
      }
    });
    const url =
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      "/properties/count?" +
      countQuery.join("&");
    setCount({ countLoading: true, count: 0 });
    fetch(url)
      .then((res) => res.json())
      .then((val) => setCount({ countLoading: false, count: val }));
    setQuery(propertiesQuery);
  }, [router.query]);

  const reset = () => {
    controls.current.forEach((control) => {
      control.clear();
    });
    router.push("", undefined, { shallow: true });
  };

  const submit = (event) => {
    event.preventDefault();
    const inputArray = Array.from(
      event.target.querySelectorAll(
        "select, input[type=checkbox], input[type=radio]"
      )
    );
    const queryStr = makeQuery(inputArray);
    router.push("?" + queryStr, undefined, { shallow: true });
  };

  return (
    <section
      className={cn(
        {
          container: !showMap,
        },
        styles.grid
      )}
    >
      <form className={styles.filters} onSubmit={submit}>
        <div className={styles.reset}>
          <span>
            <b>{0 /*state.filtersCount*/}</b> Filters
          </span>
          <button type="button" onClick={reset}>
            <Cross />
            Verwijder filters
          </button>
        </div>
        <Button className={styles.searchButton}>Zoekprofiel</Button>
        {checkboxes.map((field) => (
          <React.Fragment key={field.title}>
            <hr />
            <div className={styles.group}>
              <h3>{field.title}</h3>
              {field.type === "selectGroup" ? (
                field.selects.map((field, i) => (
                  <Select
                    ref={(ref) => {
                      controls.current.set(field.name, ref);
                    }}
                    key={i}
                    prefix={field.prefix}
                    className={styles.select}
                    closeOnSelect
                    items={field.items}
                    name={field.name}
                    onChange={(item) => {}}
                  />
                ))
              ) : (
                <CheckBoxField
                  ref={(ref) => {
                    controls.current.set(field.name, ref);
                  }}
                  name={field.name}
                  type={field.type}
                  items={field.items}
                  name={field.name}
                  onChange={(item) => {}}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </form>
      <div>
        <div>
          <span className={styles.count}>
            {formatPrice(countLoading ? 0 : count)} koopwoningen
          </span>
        </div>
        <TransitionGroup>
          <CSSTransition key={loading} timeout={600}>
            <div>
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <React.Fragment key={i}>
                    <hr />
                    <PropertyItemSkeleton />
                  </React.Fragment>
                ))
              ) : properties && properties.length > 0 ? (
                properties.map((el) => (
                  <React.Fragment key={el.slug}>
                    <hr />
                    <PropertyItem {...el} />
                  </React.Fragment>
                ))
              ) : (
                <h2>No properties to show</h2>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </section>
  );
};
