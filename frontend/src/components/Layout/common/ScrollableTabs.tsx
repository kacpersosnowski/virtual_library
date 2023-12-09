import { Box, Tab, Tabs } from "@mui/material";
import { JSXElementConstructor, ReactElement, useState } from "react";

type Props = {
  tabs: {
    label: string;
    value?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: string | ReactElement<any, string | JSXElementConstructor<any>>;
    iconPosition?: "top" | "bottom" | "end" | "start";
  }[];
};

const ScrollableTabs: React.FC<Props> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
      >
        {props.tabs.map((tab, index) => {
          return <Tab {...tab} key={index} />;
        })}
      </Tabs>
    </Box>
  );
};

export default ScrollableTabs;
