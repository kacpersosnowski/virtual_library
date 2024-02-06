import { useMemo } from "react";
import { Slider } from "@mui/material";

const buildMarks = (totalPages: number) => {
  const marks = [{ value: 0 }];
  let currentPage = 1;
  while (currentPage <= totalPages - 1) {
    marks.push({ value: currentPage });
    currentPage += 2;
  }
  return marks;
};

const valueLabelFormat = (totalPages: number, value: number) => {
  let result = "";

  if (value === 0) {
    result = value + 1 + "";
  } else if (value === totalPages - 1) {
    result = totalPages + "";
  } else {
    result = `${value + 1} - ${value + 2}`;
  }
  return result;
};

type Props = {
  currentPage: number;
  totalPages: number;
  onTurnPage: (newPage: number) => void;
};

const PageSlider: React.FC<Props> = (props) => {
  const { currentPage, totalPages, onTurnPage } = props;

  const marks = useMemo(() => buildMarks(totalPages), [totalPages]);

  const turnToPageHandler = (event: Event, newValue: number) => {
    onTurnPage(newValue);
  };

  return (
    <Slider
      aria-label="Change page slider"
      color="secondary"
      defaultValue={marks[0].value}
      min={marks[0].value}
      max={marks[marks.length - 1].value}
      step={null}
      valueLabelDisplay="auto"
      valueLabelFormat={valueLabelFormat.bind(null, totalPages)}
      marks={marks}
      size="small"
      value={currentPage}
      onChange={turnToPageHandler}
    />
  );
};

export default PageSlider;
