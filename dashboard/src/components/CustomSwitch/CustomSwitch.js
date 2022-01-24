import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
// core components
import switchStyles from "assets/jss/material-dashboard-react/components/customSwitchStyle.js";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import Muted from 'components/Typography/Muted';

const useStyles = makeStyles(styles);
const useSwitchStyles = makeStyles(switchStyles);

export default function CustomSwitch(props) {
  const classes = useStyles();
  const switchClasses = useSwitchStyles();
  const {
    color,
    label,
    labelPlacement,
    checked,
    value,
    onChange,
  } = props;
  const switchBaseClasses = classNames({
    [switchClasses[`${color}SwitchBase`]]: color,
  });
  return (
    <FormControl
      className={classes.formControl}
    >
      <FormControlLabel
        value={value}
        control={<Switch checked={checked} onChange={onChange} classes={{ switchBase: switchBaseClasses }} />}
        label={<Muted style={{ color: "#AAAAAA" }}>{label}</Muted>}
        labelPlacement={labelPlacement}
      />
    </FormControl>
  );
}

CustomSwitch.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf([
    "start",
    "top",
    "bottom",
    "end"
  ]),
  checked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};