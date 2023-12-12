import { Box, Tab, Tabs } from "@mui/material";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  activeTabValue: string;
  setActiveTabValue: Dispatch<SetStateAction<string>>;
  tabs: {
    label: string;
    value?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: string | ReactElement<any, string | JSXElementConstructor<any>>;
    iconPosition?: "top" | "bottom" | "end" | "start";
  }[];
};

const ScrollableTabs: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    props.setActiveTabValue(newValue);
    navigate(newValue);
  };

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={props.activeTabValue}
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
