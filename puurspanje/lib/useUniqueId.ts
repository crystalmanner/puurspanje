import { useEffect, useState } from "react";
import uniqid from "uniqid";

export const useUniqueId = (id?: string, prefix?: string, suffix?: string) => {
  const [_id, setId] = useState(id);
  useEffect(() => {
    !id && setId(uniqid(prefix, suffix));
  }, [id]);
  return _id;
};
