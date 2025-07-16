import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

function fetchDailyWineMessages() {
  return useQuery({
    queryKey: ["dailyWineMessages"],
    queryFn: async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/sofasomm/dailyWineMessages.json"
      );
      return res.json();
    },
  });
}

export default fetchDailyWineMessages;
