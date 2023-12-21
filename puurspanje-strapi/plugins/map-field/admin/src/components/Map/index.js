import React, { useReducer, useEffect, useMemo } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Inputs from "../Inputs";

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const MarkerWrapper = styled.div`
  transform: translate(-15px, -40px);
  svg {
    width: 30px !important;
    height: 40px !important;
  }
`;

const Clear = styled.button`
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 13px;
  color: #292b2c;
  line-height: 30px;
  font-family: Lato;
  font-weight: 400;
  padding: 0 10px;
  background-color: rgb(250, 250, 251);
  border: 1px dashed #e3e4e4;
  border-radius: 0.25rem;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_CHANGE":
      console.log('change', state);
      return {
        ...state,
        ...action.payload,
      };
    case "INIT":
      console.log('init', state);
      return {
        ...state,
        ...action.payload,
        initialized: true,
      };
    case "CLEAR":
      console.log('clear', state);
      action.onChange({
        target: {
          name: action.name,
          value: null,
          type: "json",
        },
      });
      return {
        ...state,
        initialized: false,
        zoom: 10,
        draggable: true,
        center: [defaultLocation.lat, defaultLocation.lng],
        lat: defaultLocation.lat,
        lng: defaultLocation.lng,
      };
  }
};

const defaultLocation = {
  lat: 37.9922, lng: -1.1307,
}

const Map = ({ onChange, name, value: oldValue }) => {
  const value = useMemo(() => {
    if (!oldValue) return defaultLocation;
    return oldValue;
  }, [oldValue]);

  const [state, dispatch] = useReducer(reducer, {
    zoom: 10,
    draggable: true,
    center: [defaultLocation.lat, defaultLocation.lng],
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  });

  useEffect(() => {
    if (state.initialized) return;
    if (value === defaultLocation) return;

    const init = {
      center: [value.lat, value.lng],
      lat: value.lat,
      lng: value.lng,
    }

    dispatch({
      type: "INIT",
      payload: init,
    });
  }, [value]);

  useEffect(() => {
    if (!state.draggable) return;
    const timeoutId = setTimeout(() => {
      if (
        state.lat === defaultLocation.lat &&
        state.lng === defaultLocation.lng ||
        value.lat === state.lat &&
        value.lng === state.lng
      ) {
        return;
      }
      onChange({
        target: {
          name,
          value: {
            lat: state.lat,
            lng: state.lng,
          },
          type: "json",
        },
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [state.lat, state.lng, state.draggable]);

  const onMarkerMove = (childKey, childProps, mouse) => {
    dispatch({
      type: "ON_CHANGE",
      payload: {
        lat: mouse.lat,
        lng: mouse.lng,
        draggable: false,
      },
    });
  };

  const onMarkerUp = () => {
    dispatch({
      type: "ON_CHANGE",
      payload: {
        draggable: true,
        center: [state.lat, state.lng],
      },
    });
  };

  const onClearClick = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR", onChange, name });
  }

  return (
    <>
      <Clear onClick={onClearClick}>
        Clear
      </Clear>
      <Inputs
        state={state}
        dispatch={dispatch}
        onChange={onChange}
        name={name}
        defaultLocation={defaultLocation}
      />
      <MapWrapper>
        <GoogleMapReact
          draggable={state.draggable}
          center={state.center}
          zoom={state.zoom}
          onChildMouseMove={onMarkerMove}
          onChildMouseUp={onMarkerUp}
          bootstrapURLKeys={{ key: ENV.GOOGLE_MAPS_TOKEN }}
        >
          <MarkerWrapper lat={state.lat} lng={state.lng} text="My Marker">
            <FontAwesomeIcon icon="map-marker-alt" />
          </MarkerWrapper>
        </GoogleMapReact>
      </MapWrapper>
    </>
  );
};

export default Map;
