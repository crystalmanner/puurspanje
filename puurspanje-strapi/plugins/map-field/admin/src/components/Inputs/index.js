import React, { useMemo } from "react";
import styled from "styled-components";
import { InputNumber, Label } from "@buffetjs/core";
// import Select from "react-select";
import Wrapper from "./Wrapper";

const InputsWrapper = styled.div`
  display: flex;
  gap: 10px;
  .input-class {
    width: 100%;
  }
`;

// function geocodeLatLng(mapRef, value) {
//   if (!mapRef.current.geocoder) return Promise.resolve([]);
//   const { geocoder } = mapRef.current;
//   const latlng = {
//     lat: value.lat,
//     lng: value.lng,
//   };

//   return new Promise((resolve, reject) => {
//     geocoder.geocode({ location: latlng }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           resolve(results);
//         }
//       } else reject();
//     });
//   });
// }

const Inputs = (props) => {//React.forwardRef((props, mapRef) => {
  const { state, dispatch, onChange, name, defaultLocation } = props;

  const inputChange = ({ target: { name, value } }) => {
    const lat = name === "latitude" ? value : state.lat;
    const lng = name === "longitude" ? value : state.lng;

    dispatch({
      type: "ON_CHANGE",
      payload: {
        center: [lat, lng],
        lat,
        lng,
      },
    });
    onChange({
      target: {
        name,
        value: { lat, lng/*, address: state.address*/ },
        type: "json",
      },
    });
  };

  // const onAddressChange = (val) => {
  //   dispatch({
  //     type: "ON_CHANGE",
  //     payload: {
  //       address: val,
  //     },
  //   });
  // };

  // const onMenuOpen = () => {
  //   dispatch({ type: "LOADING" });
  //   geocodeLatLng(mapRef, { lat: state.lat, lng: state.lng }).then(
  //     (results) => {
  //       const options = results
  //         .map((res) => ({
  //           label: res.formatted_address,
  //           value: res.formatted_address,
  //         }))
  //         .filter((res, i1, arr) => {
  //           return (
  //             arr.findIndex((val, i2) => val.label === res.label && i1 > i2) ===
  //             -1
  //           );
  //         });
  //       dispatch({ type: "LOADED", payload: { options } });
  //     }
  //   );
  // };

  const ids = useMemo(() => {
    return [name + "latitude", name + "longitude"/*, name + "address"*/];
  }, [name]);

  return (
    <>
      <InputsWrapper>
        <Wrapper className={"input-class"}>
          <Label htmlFor={ids[0]}>Latitude</Label>
          <InputNumber
            id={ids[0]}
            name="latitude"
            value={state.lat === defaultLocation.lat ? null : state.lat}
            step={0.0001}
            onChange={inputChange}
          />
        </Wrapper>
        <Wrapper className={"input-class"}>
          <Label htmlFor={ids[1]}>Longitude</Label>
          <InputNumber
            id={ids[1]}
            name="longitude"
            value={state.lng === defaultLocation.lng ? null : state.lng}
            step={0.0001}
            onChange={inputChange}
          />
        </Wrapper>
      </InputsWrapper>
      {/* <InputsWrapper>
        <Wrapper className="input-class">
          <Label htmlFor={ids[2]}>Address</Label>
          <Select
            inputId={ids[2]}
            value={state.address}
            options={state.options}
            isLoading={state.loading}
            onChange={onAddressChange}
            onMenuOpen={onMenuOpen}
          />
        </Wrapper>
      </InputsWrapper> */}
    </>
  );
}; //);

export default Inputs;
