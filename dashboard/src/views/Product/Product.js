import React, { useState, useEffect, useCallback } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from "components/Card/CardFooter.js";
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from 'components/CustomSelect/CustomSelect';
import Button from "components/CustomButtons/Button.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import { getProductData, updateProductData, createProduct } from "../../action/product"
import { getProductInfo, getProductTypes } from "../../action/product"
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import CustomTagsInput from 'components/CustomTagsInput/CustomTagsInput';

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
  },
  image: {
    width: "100%",
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

const brandList = [
  {
    name: "adidas",
    value: "adidas",
  },
  {
    name: "jordan",
    value: "Jordan",
  },
  {
    name: "nike",
    value: "Nike",
  },
]

const genderList = [
  {
    name: "men",
    value: "men",
  },
  {
    name: "women",
    value: "women",
  },
  {
    name: "child",
    value: "child",
  },
  {
    name: "preschool",
    value: "preschool",
  },
  {
    name: "infant",
    value: "infant",
  },
  {
    name: "toddler",
    value: "toddler",
  },
]

const catagoryList = [
  {
    name: "pizza",
    value: "pizza"
  },
  {
    name: "sidedish",
    value: "sidedish"
  },
  {
    name: "drink",
    value: "drink"
  },
  {
    name: "dessert",
    value: "dessert"
  },
]

const imgURL = "https://stockx-assets.imgix.net/media/Product-Placeholder-Default-20210415.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=0";

const useStyles = makeStyles(styles);

function Product(props) {
  const { match } = props;
  const [productData, setProductData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false)
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)
  const [isDangerAlert, setIsDangerAlert] = useState(false)
  const [errorMassage, setErrorMassage] = useState("")
  const [invalidInput, setInvalidInput] = useState([])
  const [types, setTypes] = useState([]);
  const classes = useStyles();
  // console.log(productData)

  const checkRoute = useCallback(() => {
    if (match.path === "/admin/product/:id") return true;
    return false;
  }, [match.path])

  useEffect(() => {
    if (checkRoute()) {
      async function fetchProduct() {
        // const res = await getProductData(match.params.id);
        const res = await getProductInfo(match.params.id);
        if (res.success) setProductData(res.product);
        const res1 = await getProductTypes(res.product.category)
        const typeList = res1.types.reduce((pre, cur) => [...pre, { name: cur, value: cur }], [])
        if (res1.success) setTypes(typeList)
      }
      fetchProduct();
    } else {
      setProductData({
        available: true,
        name: "",
        image: imgURL,
        imageSrc: "",
        category: "",
        product_type: "",
        price: "",
        description: ["", ""],
        size: [],
        sizeDetails: [],
      })
    }
  }, [match.params.id, checkRoute])

  // const handleDeleteTag = (i) => {
  //   setIsUpdated(true);
  //   setProductData({
  //     ...productData,
  //     tags: productData.tags.filter((tag, index) => index !== i)
  //   })
  // }

  // const handleAddTag = (tag) => {
  //   setIsUpdated(true);
  //   setProductData({
  //     ...productData,
  //     tags: [...productData.tags, tag]
  //   })
  // }

  const handleDeleteSize = (i) => {
    setIsUpdated(true);
    setProductData({
      ...productData,
      sizeDetails: productData.sizeDetails.filter((size, index) => index !== i)
    })
  }

  const handleAddSize = (size) => {
    setIsUpdated(true);
    const isExisted = productData.sizeDetails.some((e) => e.size === size)
    const newSize = isExisted ? productData.sizeDetails : [...productData.sizeDetails, { size: size, price: "" }]
    setProductData({
      ...productData,
      sizeDetails: newSize.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    })
  }

  const handleEditSize = (e, i) => {
    setIsUpdated(true);
    setProductData({
      ...productData,
      sizeDetails: productData.sizeDetails.map((size, index) => index === i ? { ...size, price: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value) } : size)
    })
  }

  const handleChangeAvailable = (e) => {
    setIsUpdated(true);
    setProductData({
      ...productData,
      available: e.target.checked
    })
  }

  const onInputChange = (e) => {
    setIsUpdated(true);
    setProductData({
      ...productData,
      [e.target.id]: e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    })
  }

  const getInvalidInput = () => {
    const inValidInput = [];
    // for (let key in productData) {
    //   if (key === 'tags') {
    //     if (productData[key].length === 0) inValidInput.push(key);
    //   } else if (key === 'sizeDetails') {
    //     if (productData[key].length === 0 || productData[key].some(e => e.price === "")) inValidInput.push(key);
    //   } else {
    //     if (productData[key] === "") inValidInput.push(key);
    //   }
    // }
    return inValidInput;
  }

  const onSubmitChange = async () => {
    const { _id, detail, ...updateOps } = productData;
    setIsUpdated(false);
    setInvalidInput(getInvalidInput());
    detail.map(e => {
      if (e.name === "Retail Price") e.value = productData.price;
      if (e.name === "Release Date") e.value = productData.releaseDate;
      return e;
    });
    if (getInvalidInput().length === 0) {
      const res = await updateProductData(_id, { detail, ...updateOps });
      if (res.success) {
        setIsSuccessAlert(true);
        setTimeout(() => {
          setIsSuccessAlert(false);
        }, 2000)
      } else {
        setErrorMassage(res.error.response.data.err);
        setIsDangerAlert(true);
        setTimeout(() => {
          setIsDangerAlert(false);
        }, 5000)
      }
    } else {
      setIsDangerAlert(true);
      setTimeout(() => {
        setIsDangerAlert(false);
      }, 5000);
    }
  }

  const onSubmitNewProduct = async () => {
    setIsUpdated(false);
    setInvalidInput(getInvalidInput());
    const detail = {
      "Retail Price": productData.price,
      "Release Date": productData.releaseDate,
    }
    const urlKey = productData.name.split(" ").join("-")
    if (getInvalidInput().length === 0) {
      const res = await createProduct({ ...productData, detail, urlKey });
      if (res.success) {
        setProductData({
          available: true,
          name: "",
          image: imgURL,
          imageSrc: "",
          category: "",
          product_type: "",
          price: "",
          description: ["", ""],
          size: [],
          sizeDetails: [],
        })
        setIsSuccessAlert(true);
        setTimeout(() => {
          setIsSuccessAlert(false);
        }, 3000)
      } else {
        setErrorMassage(res.error.response.data.err);
        setIsDangerAlert(true);
        setTimeout(() => {
          setIsDangerAlert(false);
        }, 5000);
      }
    } else {
      setIsDangerAlert(true);
      setTimeout(() => {
        setIsDangerAlert(false);
      }, 5000);
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>Product</h4>
            <p className={classes.cardCategoryWhite}>
              Edit your product here
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={3} md={3} style={{ textAlign: "center" }}>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={productData.image} />
                </ButtonBase>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <CustomInput
                  labelText="Product Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: productData.name != null ? productData.name : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              {/* <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  labelText="Ticker Symbol"
                  id="tickerSymbol"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: productData.tickerSymbol != null ? productData.tickerSymbol : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem> */}
            </GridContainer>
            <GridContainer>
              {/* <GridItem xs={12} sm={3} md={3}>
                <CustomSelect
                  labelText="Brand"
                  id="brand"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={onInputChange}
                  inputProps={{
                    value: productData.brand != null ? productData.brand : "",
                  }}
                  itemlist={brandList}
                />
              </GridItem> */}
              <GridItem xs={12} sm={3} md={3}>
                <CustomSelect
                  labelText="Category"
                  id="category"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={onInputChange}
                  inputProps={{
                    value: productData.category != null ? productData.category : "",
                  }}
                  itemlist={catagoryList}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <CustomSelect
                  labelText="Subcategory"
                  id="product_type"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={onInputChange}
                  inputProps={{
                    value: productData.product_type != null ? productData.product_type : "",
                  }}
                  itemlist={types}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={2}>
                <CustomInput
                  labelText="Price"
                  id="price"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: productData.price != null ? productData.price : "",
                    type: "number",
                    endAdornment: (<InputAdornment position="end" > ₫</InputAdornment>),
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              {/* {
                checkRoute() &&
                <GridItem xs={12} sm={2} md={2}>
                  <CustomInput
                    labelText="Number Sold"
                    id="numberSold"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: productData.numberSold != null ? productData.numberSold : "",
                      type: "text",
                      disabled: true,
                    }}
                  />
                </GridItem>
              } */}
            </GridContainer>
            {/* <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomTagsInput
                  labelHeading="Tags"
                  tags={productData.tags != null ? productData.tags : []}
                  formControlProps={{}}
                  handleDelete={handleDeleteTag}
                  handleAddition={handleAddTag}
                  inputProps={{
                    placeholder: "press enter to add tag"
                  }}
                />
              </GridItem>
            </GridContainer> */}
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomTagsInput
                  labelHeading="Sizes"
                  isInputList
                  tags={productData.sizeDetails != null ? productData.sizeDetails : []}
                  formControlProps={{}}
                  handleDelete={handleDeleteSize}
                  handleAddition={handleAddSize}
                  handleEdit={handleEditSize}
                  inputProps={{
                    placeholder: "press enter to add size",
                    // type: "number"
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Short Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: productData.description != null ? productData.description[0].split("<br>\n").join("") : "",
                    multiline: true,
                    rows: 2,
                    onChange: onInputChange
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText=" Long Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: productData.description != null ? productData.description[1].split("<br>\n").join("") : "",
                    multiline: true,
                    rows: 3,
                    onChange: onInputChange
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              {/* <GridItem xs={12} sm={4} md={3}>
                <CustomDatePicker
                  key={productData.releaseDate != null ? "releaseDate" : "releaseDate-null"}
                  labelText="Release Date"
                  id="releaseDate"
                  dateProps={{
                    defaultValue: productData.releaseDate != null ? productData.releaseDate : "",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              {
                checkRoute() &&
                <GridItem xs={12} sm={4} md={3}>
                  <CustomDatePicker
                    key={productData.dateUpdated != null ? "dateUpdated" : "dateUpdated-null"}
                    labelText="Updated Date"
                    id="dateUpdated"
                    dateProps={{
                      defaultValue: productData.dateUpdated != null ? productData.dateUpdated : "",
                      disabled: true,
                    }}
                  />
                </GridItem>
              } */}
              <GridItem xs={12} sm={4} md={3}>
                <CustomSwitch
                  label="available"
                  labelPlacement="start"
                  color="success"
                  checked={productData.available != null ? productData.available : false}
                  onChange={handleChangeAvailable}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            {
              checkRoute()
                ?
                <Button disabled={!isUpdated} onClick={onSubmitChange} color="rose">Update Product</Button>
                :
                <Button disabled={!isUpdated} onClick={onSubmitNewProduct} color="rose">Add Product</Button>
            }
            <Snackbar
              place="tc"
              color="success"
              icon={AddAlert}
              message={checkRoute() ? "Product updated successfully" : "Product has been added to database"}
              open={isSuccessAlert}
              closeNotification={() => setIsSuccessAlert(false)}
              close
            />
            <Snackbar
              place="tc"
              color="danger"
              icon={AddAlert}
              message={checkRoute() ? `Can't update Product${invalidInput.length > 0 && ", Invalid input: " + invalidInput.join(", ")}` : (invalidInput.length > 0 ? `Invalid input: ${invalidInput.join(", ")}` : errorMassage)}
              open={isDangerAlert}
              closeNotification={() => setIsDangerAlert(false)}
              close
            />
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default Product
