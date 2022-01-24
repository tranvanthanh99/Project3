import React, { useState, useEffect, useCallback } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

// import { getUserByID, login, updateUser, createUser } from "../../action/user"
import { getUserInfo, updateInfo, register } from "../../action/user"
// import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
// import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
// import CustomTagsInput from 'components/CustomTagsInput/CustomTagsInput';

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

// const genderList = [
//   {
//     name: "male",
//     value: "male",
//   },
//   {
//     name: "female",
//     value: "female",
//   },
// ]

const roleList = [
  {
    name: "user",
    value: "user",
  },
  {
    name: "staff",
    value: "staff",
  },
  {
    name: "admin",
    value: "admin",
  },
]


const useStyles = makeStyles(styles);

function User(props) {
  const { match } = props;
  const [userData, setUserData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false)
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)
  const [isDangerAlert, setIsDangerAlert] = useState(false)
  const [errorMassage, setErrorMassage] = useState("")
  const [invalidInput, setInvalidInput] = useState([])
  const classes = useStyles();
  // console.log(userData)

  const checkRoute = useCallback(() => {
    if (match.path === "/admin/user/:id") return true;
    return false;
  }, [match.path])

  useEffect(() => {
    if (checkRoute()) {
      async function fetchUser() {
        // const authRes = await login("123@123.com", "Anhemtritra123");
        // const res = await getUserByID(authRes.token, match.params.id);
        const res = await getUserInfo(match.params.id);
        if (res.success) setUserData({ ...res });
      }
      fetchUser();
    } else {
      setUserData({
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        address: "",
        role: "",
        password: "",
      })
    }
  }, [match.params.id, checkRoute])

  const onInputChange = (e) => {
    setIsUpdated(true);
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    })
  }

  const getInvalidInput = () => {
    const inValidInput = [];
    for (let key in userData) {
      if (userData[key] === "") inValidInput.push(key);
    }
    return inValidInput;
  }

  const onSubmitChange = async () => {
    // const { _id, ...updateOps } = userData;
    setIsUpdated(false);
    setInvalidInput(getInvalidInput());
    if (getInvalidInput().length === 0) {
      // const authRes = await login("123@123.com", "Anhemtritra123");
      // const res = await updateUser(authRes.token, _id, {
      //   ...updateOps,
      //   name: { firstname: userData.firstname, lastname: userData.lastname },
      // });
      const res = await updateInfo(userData)
      if (res.success) {
        setIsSuccessAlert(true);
        setTimeout(() => {
          setIsSuccessAlert(false);
        }, 2000)
      } else {
        setErrorMassage(res.error);
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
    if (getInvalidInput().length === 0) {
      // const authRes = await login("123@123.com", "Anhemtritra123");
      // const res = await createUser(authRes.token, {
      //   ...userData,
      //   name: { firstname: userData.firstname, lastname: userData.lastname },
      // });
      const res = await register(userData);
      if (res.success) {
        setUserData({
          email: "",
          phone: "",
          firstname: "",
          lastname: "",
          address: "",
          role: "",
          password: "",
        });
        setIsSuccessAlert(true);
        setTimeout(() => {
          setIsSuccessAlert(false);
        }, 3000);
      } else {
        setErrorMassage(res.error);
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
            <h4 className={classes.cardTitleWhite}>User</h4>
            <p className={classes.cardCategoryWhite}>
              Edit user info here
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {/* <GridItem xs={12} sm={3} md={3} style={{ textAlign: "center" }}>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={userData.imageurl} />
                </ButtonBase>
              </GridItem> */}
              <GridItem xs={12} sm={6} md={6}>
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: checkRoute() ? true : false,
                    value: userData.email != null ? userData.email : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              {
                !checkRoute() &&
                <GridItem xs={12} sm={3} md={3}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: userData.password != null ? userData.password : "",
                      type: "password",
                      onChange: onInputChange
                    }}
                  />
                </GridItem>
              }
              <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  labelText="Phone"
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: userData.phone != null ? userData.phone : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  labelText="First Name"
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: userData.firstname != null ? userData.firstname : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <CustomInput
                  labelText="Last Name"
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: userData.lastname != null ? userData.lastname : "",
                    type: "text",
                    onChange: onInputChange
                  }}
                />
              </GridItem>
              {/* <GridItem xs={12} sm={2} md={2}>
                <CustomSelect
                  labelText="Gender"
                  id="sex"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={onInputChange}
                  inputProps={{
                    value: userData.sex != null ? userData.sex : "",
                  }}
                  itemlist={genderList}
                />
              </GridItem> */}
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Address"
                  id="address"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: userData.address != null ? userData.address.split("<br>\n").join("") : "",
                    multiline: true,
                    rows: 1,
                    onChange: onInputChange
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={4} md={3}>
                <CustomSelect
                  labelText="Role"
                  id="role"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={onInputChange}
                  inputProps={{
                    value: userData.role != null ? userData.role : "",
                  }}
                  itemlist={roleList}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            {
              checkRoute()
                ?
                <Button disabled={!isUpdated} onClick={onSubmitChange} color="rose">Update User</Button>
                :
                <Button disabled={!isUpdated} onClick={onSubmitNewProduct} color="rose">Add User</Button>
            }
            <Snackbar
              place="tc"
              color="success"
              icon={AddAlert}
              message={checkRoute() ? "User updated successfully" : "User has been added to database"}
              open={isSuccessAlert}
              closeNotification={() => setIsSuccessAlert(false)}
              close
            />
            <Snackbar
              place="tc"
              color="danger"
              icon={AddAlert}
              message={checkRoute() ? `Can't update User${invalidInput.length > 0 && ", Invalid input: " + invalidInput.join(", ")}` : (invalidInput.length > 0 ? `Invalid input: ${invalidInput.join(", ")}` : errorMassage)}
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

export default User;
