import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Slider } from "@mui/material";
import { useControls } from "react-zoom-pan-pinch";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { RootState } from "../../../../store/redux";
import { zoomActions } from "../../../../store/redux/slices/zoom-slice";

const ZoomSlider = () => {
  const { scale } = useSelector((state: RootState) => state.zoom);
  const dispatch = useDispatch();
  const { instance } = useControls();

  const zoomChangeHandler = (event, value) => {
    dispatch(zoomActions.setScale(value));
    instance.getContext().centerView(value);
  };

  const addZoomHandler = () => {
    const newValue = Math.min(scale + 0.2, 2);
    dispatch(zoomActions.setScale(newValue));
    instance.getContext().centerView(newValue);
  };

  const removeZoomHandler = () => {
    const newValue = Math.max(scale - 0.2, 1);
    dispatch(zoomActions.setScale(newValue));
    instance.getContext().centerView(newValue);
  };

  return (
    <Box
      sx={{
        width: 240,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ color: "white", mr: "0.7rem" }}
        onClick={removeZoomHandler}
      >
        <RemoveIcon />
      </IconButton>
      <Slider
        defaultValue={1}
        step={0.1}
        min={1}
        max={2}
        valueLabelDisplay="off"
        color="secondary"
        value={scale}
        onChange={zoomChangeHandler}
      />
      <IconButton
        sx={{ color: "white", ml: "0.7rem" }}
        onClick={addZoomHandler}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default ZoomSlider;
