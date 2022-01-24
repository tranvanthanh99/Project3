import React from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

const useStyles = makeStyles(styles);

export default function CustomDatePicker(props) {
  const classes = useStyles();
  const {
    labelText,
    id,
    labelProps,
    dateProps,
  } = props;

  let {
    defaultValue,
    ...restDateProps
  } = dateProps;
  defaultValue = new Date(defaultValue).toLocaleDateString("en-CA");

  const underlineClasses = classNames({
    [classes.underline]: true
  });

  return (
    <TextField
      id={id}
      label={labelText}
      type="date"
      // defaultValue="2017-05-24"
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
        ...labelProps
      }}
      InputProps={{
        classes: {
          disabled: classes.disabled,
          underline: underlineClasses,
        }
      }}
      defaultValue={defaultValue}
      {...restDateProps}
    />
  );
}