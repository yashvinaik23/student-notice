import * as React from "react";

import Snackbar from "@mui/material/Snackbar";

function SnackbarUI(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div>{handleClick}</div>
      
    </div>
  );
}
export default SnackbarUI;
