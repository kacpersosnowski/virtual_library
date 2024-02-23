import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import commonMessages from "../../../messages/commonMessages";

export type Props = {
  date: string;
};

const FormattedDateParagraph: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const months = [
      t(commonMessages.januaryShort.key),
      t(commonMessages.februaryShort.key),
      t(commonMessages.marchShort.key),
      t(commonMessages.aprilShort.key),
      t(commonMessages.mayShort.key),
      t(commonMessages.juneShort.key),
      t(commonMessages.julyShort.key),
      t(commonMessages.augustShort.key),
      t(commonMessages.septemberShort.key),
      t(commonMessages.octoberShort.key),
      t(commonMessages.novemberShort.key),
      t(commonMessages.decemberShort.key),
    ];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = `${day} ${months[month]} ${year}`;

    return formattedDate;
  };

  return <Typography>{formatDate(props.date)}</Typography>;
};

export default FormattedDateParagraph;
