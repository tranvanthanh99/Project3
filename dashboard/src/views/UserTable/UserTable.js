import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from '@material-ui/icons/Edit';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import Button from "components/CustomButtons/Button.js";
// import { getUser, login } from "action/user";
import { getAllUser } from "action/user";
import taskStyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const useTaskStyles = makeStyles(taskStyles);

export default function UserTable() {
  const classes = useStyles();
  const taskclasses = useTaskStyles();
  const [userState, setUserState] = useState({ offset: 0, limit: 10 });
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      // const authRes = await login("123@123.com", "Anhemtritra123");
      const res = await getAllUser(userState.offset, userState.limit);
      // if (data != null && res.success) {
      if (res.success) {
        setData(res);
      }
    }
    fetchUser()
  }, [userState])
  const formatProductData = () => {
    if (data.length === 0) return []
    return data.users.reduce((pre, cur) =>
      [...pre, [
        `${cur.lastname} ${cur.firstname}`,
        cur.phone,
        cur.email,
        cur.address,
        cur.role,
        (<>
          <Tooltip
            id="tooltip-top"
            title="Edit User"
            placement="top"
            classes={{ tooltip: taskclasses.tooltip }}
          >
            <Link to={`/admin/user/${cur.id}`}>
              <IconButton
                aria-label="Edit"
                className={taskclasses.tableActionButton}
              >
                <Edit
                  className={
                    taskclasses.tableActionButtonIcon + " " + taskclasses.edit
                  }
                />
              </IconButton>
            </Link>
          </Tooltip>
        </>)
      ]],
      []
    )
  }

  const handleChangePage = (event, newPage) => {
    setUserState({
      ...userState,
      offset: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setUserState({
      ...userState,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };
  // console.log(data);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Phone", "Email", "Address", "Role", "Action"]}
              tableData={formatProductData()}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={userState.limit}
              page={userState.offset}
              count={data.total_record}
              pagination
              cellProps={[
                {
                  index: 6,
                  props: {
                    align: "center",
                  }
                }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
