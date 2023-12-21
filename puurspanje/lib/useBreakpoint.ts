import { useEffect, useState } from "react";

const breakpoints = [
  ["sm", "541px"],
  ["md", "993px"],
  ["lg", "1281px"],
];

export const useBreakpoint = () => {
  const [bp, setBp] = useState({
    sm: false,
    md: false,
    lg: false,
  });
  useEffect(() => {
    const unsubscribes = breakpoints.map(([name, bp]) => {
      const mediaQuery = window.matchMedia(`screen and (min-width: ${bp})`);
      setBp((state) => ({
        ...state,
        [name]: mediaQuery.matches,
      }));
      const onChange = ({ matches }) => {
        setBp((state) => ({
          ...state,
          [name]: matches,
        }));
      };
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    });
    return () => {
      unsubscribes.forEach((f) => f());
    };
  }, []);
  return bp;
};
