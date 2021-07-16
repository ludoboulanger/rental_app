import React from "react";
import { useTranslation } from "react-i18next";
export default function InitPage() {

  const {t} = useTranslation(["Pages"]);
  return (
    <div>
      <h1>{t("Pages:initPage")}</h1>
    </div>
  );
}
