import React from "react";
import { useTranslation } from "react-i18next";

export default function InitPage() {
  const {t} = useTranslation();
  const params = (new URL(document.location)).searchParams;
  const query = (params.get("query"));
  return (
    <div>
      <h1>{t("youSearched") + " " + query}</h1>
    </div>
  );
}
