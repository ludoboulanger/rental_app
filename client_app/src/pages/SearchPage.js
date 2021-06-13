import React from "react";
import { useTranslation } from "react-i18next";
export default function InitPage() {

  const {t} = useTranslation();
  return (
    <div>
      <h1>{t("You searched")}</h1>
    </div>
  );
}
