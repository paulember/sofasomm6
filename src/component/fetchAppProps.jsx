import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

function fetchAppProps(dataLibrary) {
  return useQuery({
    queryKey: ["appProp"],
    queryFn: async () => {
      const responseURL =
        "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
        dataLibrary +
        "/appProps.json";
      const res = await fetch(responseURL);
      return res.json();
    },
  });
}

export default fetchAppProps;
