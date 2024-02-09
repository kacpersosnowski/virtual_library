import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

import COLORS from "../../../palette/colors";

type Props = {
  icon: ReactNode;
  label: string;
  infos: string[] | string;
  avatar?: boolean;
};

const BookInfosTile: React.FC<Props> = (props) => {
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "0.3rem",
        }}
      >
        {props.icon}
        <Typography
          variant="subtitle1"
          sx={{ color: COLORS.gray300, marginLeft: "0.5rem" }}
        >
          {props.label}
        </Typography>
      </Box>
      {typeof props.infos === "string" && (
        <Typography
          variant="subtitle1"
          sx={{ color: COLORS.gray300, marginLeft: "0.5rem" }}
        >
          {props.infos}
        </Typography>
      )}
      {Array.isArray(props.infos) &&
        props.infos.map((info) => (
          <Chip
            key={info}
            label={info}
            avatar={props.avatar && <Avatar>{info[0]}</Avatar>}
            variant="outlined"
            sx={{ margin: "0.2rem", marginLeft: "0.5rem" }}
          />
        ))}
    </Grid>
  );
};

export default BookInfosTile;
