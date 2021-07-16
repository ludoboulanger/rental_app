import React from "react";
import { useTranslation } from "react-i18next";

export default function InitPage() {
  const {t} = useTranslation(["SearchPage"]);
  const params = (new URL(document.location)).searchParams;
  const query = (params.get("query"));
  return (
    <div>
      <h1>{t("SearchPage:youSearched") + " " + query}</h1>
    </div>
  );
}
