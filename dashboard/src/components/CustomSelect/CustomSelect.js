import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
// import Clear from "@material-ui/icons/Clear";
// import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    itemlist,
    onChange,
  } = props;

  const labelClasses = classNames({
    // [" " + classes.labelRootError]: error,
    // [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    // [classes.underlineError]: error,
    // [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        className={underlineClasses}
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          // underline: underlineClasses
        }}
        id={id}
        onChange={(e) => onChange({ target: { ...e.target, id } })}
        {...inputProps}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          itemlist != null &&
          itemlist.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              <em>{item.name}</em>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  itemlist: PropTypes.arrayOf(PropTypes.object)
};
