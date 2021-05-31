import React from 'react';
import { useTranslation } from 'react-i18next';
export default function InitPage() {

    const {t} = useTranslation();
  return (
    <div>
      <h1>{t("init_page")}</h1>
    </div>
  );
}
