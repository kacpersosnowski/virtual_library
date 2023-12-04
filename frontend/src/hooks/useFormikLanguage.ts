import { FormikConfig, FormikValues, useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useFormikLanguage = <T extends FormikValues>({
  ...formikConfig
}: FormikConfig<T>) => {
  const { i18n } = useTranslation();

  const formik = useFormik(formikConfig);

  useEffect(() => {
    formik.setErrors({});
  }, [i18n.language]);

  return formik;
};

export default useFormikLanguage;
