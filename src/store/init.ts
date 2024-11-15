import { useCallback, useEffect, useState } from "react";
import useUniversalStore, { csvDataObjectType } from "./useUniversalStore";

export const DataInit = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { write, csvData } = useUniversalStore();

  const fetchData = useCallback(async () => {
    if (csvData.length > 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const file = "/news_auto.csv";
      const response = await fetch(file);
      const csvText = await response.text();
      const rows = csvText.split("\n").map((row) => {
        const fields = [];
        let field = "";
        let inQuotes = false;

        for (let i = 0; i < row.length; i++) {
          if (row[i] === '"') {
            inQuotes = !inQuotes;
          } else if (row[i] === "," && !inQuotes) {
            fields.push(field.trim());
            field = "";
          } else {
            field += row[i];
          }
        }
        fields.push(field.trim());
        return fields;
      });

      const data = rows.slice(1); // Skip header row
      const allData: csvDataObjectType[] = [];

      data.forEach((row) => {
        const headlineData = {
          portal: row[0],
          publishedDate: row[1],
          author: row[2],
          headline: row[3],
          urlLink: row[4],
          sentiment: row[5],
          value: row[6],
        };

        allData.push(headlineData);
      });

      write({ csvData: allData });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }, [write, csvData.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
  };
};
