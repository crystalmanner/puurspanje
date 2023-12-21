import styles from "./Search.module.scss";
import cn from "classnames";
// import { useReducer } from "react";
// import { Button } from "@components/common";

// import type { Action, FormState, Input, SearchInputProps } from "./types";

// const defaultInputsState: FormState = {
//   price: { value: "", filled: false },
//   bedrooms: { value: "", filled: false },
//   bathrooms: { value: "", filled: false },
// };

// function handleForm(state: FormState, action: Action): FormState {
//   switch (action.type) {
//     case "update": {
//       return {
//         ...state,
//         [action.payload.key]: {
//           value: action.payload.value,
//           filled: action.payload.value.length > 0,
//         },
//       };
//     }
//     case "submit": {
//       return state;
//     }
//   }
// }

// const inputs: Input[] = [
//   {
//     label: "Prijs",
//     name: "price",
//     placeholder: "$ 150.000 - 250.000",
//   },
//   {
//     label: "Slaapkamers",
//     name: "bedrooms",
//     placeholder: "1",
//     type: "number",
//   },
//   {
//     label: "Badkamers",
//     name: "bathrooms",
//     placeholder: "1",
//     type: "number",
//   },
// ];

// const SearchInput: React.VFC<SearchInputProps> = ({
//   name,
//   label,
//   filled,
//   ...rest
// }) => (
//   <div className={styles.inputWrapper}>
//     <label htmlFor={`search-input-${name}`}>{label}</label>
//     <input
//       className={cn({ [styles.filled]: filled })}
//       id={`search-input-${name}`}
//       name={name}
//       {...rest}
//     />
//     <span />
//   </div>
// );

export const Search: React.VFC<{ wrapperClass?: string }> = ({
  wrapperClass,
}) => {
  // const [state, dispatch] = useReducer(handleForm, defaultInputsState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch({ type: "submit" });
  };

  return (
    <form className={cn(styles.search, wrapperClass)} onSubmit={onSubmit}>
      {/* {inputs.map(({ name, ...props }) => (
        <SearchInput
          key={name}
          name={name}
          value={state[name].value}
          filled={state[name].filled}
          onChange={(e) =>
            dispatch({
              type: "update",
              payload: { key: name, value: e.target.value },
            })
          }
          {...props}
        />
      ))}
      <Button type="submit">
        Zoeken
        <img
          src="/assets/arrow-white.svg"
          width="13"
          height="9"
          alt="arrow right"
        />
      </Button> */}
    </form>
  );
};
