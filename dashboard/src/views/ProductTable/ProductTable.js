import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from '@material-ui/icons/Edit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import { getProduct } from "action/product";
import { getAllProduct } from "action/product";
// import Button from "components/CustomButtons/Button.js";
import {
  successColor,
  dangerColor,
} from "assets/jss/material-dashboard-react.js";

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

export default function ProductTable() {
  const classes = useStyles();
  const taskclasses = useTaskStyles();
  const [productState, setProductState] = useState({ offset: 0, limit: 10 });
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      // const res = await getProduct(productState.offset, productState.limit);
      const res = await getAllProduct(productState.offset, productState.limit);
      console.log(res)
      // if (data != null && res.success) {
      if (res.success) {
        setData(res);
      }
    }
    fetchProduct()
  }, [productState])
  const formatProductData = () => {
    if (data.length === 0) return []
    return data.products.reduce((pre, cur) =>
      [...pre, [
        cur.name,
        cur.category,
        cur.product_type,
        `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(cur.price)}`,
        (
          // <div style={{ width: "100%", textAlign: "center" }}>
          <FiberManualRecordIcon
            style={{ color: cur.available ? successColor[0] : dangerColor[0] }}
            fontSize="small"
          />
          // </div>
        ),
        (<>
          <Tooltip
            id="tooltip-top"
            title="Edit Product"
            placement="top"
            classes={{ tooltip: taskclasses.tooltip }}
          >
            <Link to={`/admin/product/${cur.id}`}>
              <IconButton
                aria-label="Edit"
                className={taskclasses.tableActionButton}
              // href={`/admin/product/${cur._id}`}
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
    setProductState({
      ...productState,
      offset: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setProductState({
      ...productState,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };

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
              tableHead={["Product Name", "Category", "Subcategory", "Price", "Available", "Action"]}
              tableData={formatProductData()}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={productState.limit}
              page={productState.offset}
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
