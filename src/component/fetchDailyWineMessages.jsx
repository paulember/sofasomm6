import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

function fetchDailyWineMessages(dataLibrary) {
  return useQuery({
    queryKey: ["dailyWineMessages"],
    queryFn: async () => {
      const responseURL =
        "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
        dataLibrary +
        "/dailyWineMessages.json";
      const res = await fetch(responseURL);
      return res.json();
    },
  });
}

export default fetchDailyWineMessages;
