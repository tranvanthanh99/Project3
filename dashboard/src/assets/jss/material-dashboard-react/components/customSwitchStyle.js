import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
} from "assets/jss/material-dashboard-react.js";

const switchStyle = {
  roseSwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgb(233, 30, 99, 0.06)"
    },
    "&.Mui-checked": {
      color: roseColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: roseColor[0]
    }
  },
  primarySwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgb(156, 39, 176, 0.06)"
    },
    "&.Mui-checked": {
      color: primaryColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: primaryColor[0]
    }
  },
  infoSwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgb(0, 172, 193, 0.06)"
    },
    "&.Mui-checked": {
      color: infoColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: infoColor[0]
    }
  },
  successSwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.06)"
    },
    "&.Mui-checked": {
      color: successColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: successColor[0]
    }
  },
  warningSwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgb(255, 152, 0, 0.06)"
    },
    "&.Mui-checked": {
      color: warningColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: warningColor[0]
    }
  },
  dangerSwitchBase: {
    "&.Mui-checked:hover": {
      backgroundColor: "rgb(244, 67, 54, 0.06)"
    },
    "&.Mui-checked": {
      color: dangerColor[0],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: dangerColor[0]
    }
  },
};

export default switchStyle;
