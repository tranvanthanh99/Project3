import React, { Component, useState, useEffect } from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import {
    Paper,
    Typography,
    TextField,
    Button,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { updateInfo, updatePassword, getUser } from '../../action/user'
import OrderHistory from '../OrderHistory'

export class Profile extends Component {

    state = {
        tabs: "info",
        user: {
            user_id: "",
            email: "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            firstname: "",
            lastname: "",
            phone: "",
            address: "",
        }
    }

    onChangeState = object => {
        this.setState(Object.assign(this.state, object));
    };

    onChangeUser = object => {
        this.setState(Object.assign(this.state.user, object))
    }

    updateInfo = async () => {
        const res = await updateInfo(
            this.state.user.user_id,
            this.state.user.firstname,
            this.state.user.lastname,
            this.state.user.phone,
            this.state.user.address
        )
        const newRes = await getUser(this.state.user.user_id)
        if (newRes.success) window.localStorage.setItem("user", JSON.stringify(newRes))

        return res
    }

    updatePassword = async () => {
        const res = await updatePassword(
            this.state.user.user_id,
            this.state.user.password,
            this.state.user.newPassword
        )
        return res
    }

    componentDidMount() {
        const user = JSON.parse(window.localStorage.getItem("user"))
        if (user != null) this.onChangeUser(user)
    }

    render() {
        return (
            <div className="container">
                <Row className="mt-5">
                    <Col className="mb-3" xs={12} lg={3}>
                        <Paper
                            className="mb-3"
                            style={{ width: "100%", height: "auto", padding: "1rem" }}
                        >
                            <div className="w-100 d-flex justify-content-center">
                                <AccountCircleIcon
                                    style={{ transform: "translateY(-80%)", fontSize: "3.1875rem", textAlign: "center" }}
                                />
                            </div>
                            <div className="text-center">
                                <Typography variant="caption" display="block">
                                    Xin Ch??o
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {`${this.state.user.lastname} ${this.state.user.firstname}`}
                                </Typography>
                            </div>

                        </Paper>
                        <Button
                            className="mb-3"
                            fullWidth
                            variant="contained"
                            onClick={() => this.onChangeState({ tabs: "info" })}
                        >
                            Th??ng tin t??i kho???n
                        </Button>
                        <Button
                            className="mb-3"
                            fullWidth
                            variant="contained"
                            onClick={() => this.onChangeState({ tabs: "changePassword" })}
                        >
                            ?????i m???t kh???u
                        </Button>
                        <Button
                            className="mb-3"
                            fullWidth
                            variant="contained"
                            onClick={() => this.onChangeState({ tabs: "orderHistory" })}
                        >
                            L???ch s??? ????n h??ng
                        </Button>
                    </Col>
                    <Col className="mb-3" xs={12} lg={9}>
                        {
                            this.state.tabs === "info" &&
                            <Info {...this.state.user} onChangeUser={this.onChangeUser} updateInfo={this.updateInfo} />
                        }
                        {
                            this.state.tabs === "changePassword" &&
                            <ChangePassword {...this.state.user} onChangeUser={this.onChangeUser} updatePassword={this.updatePassword} />
                        }
                        {
                            this.state.tabs === "orderHistory" &&
                            <OrderHistory {...this.state.user} onChangeUser={this.onChangeUser} updatePassword={this.updatePassword} />
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Profile

function Info(props) {
    const { email, phone, firstname, lastname, address, onChangeUser, updateInfo } = props
    const [isUpdated, setIsUpdated] = useState(false)
    const onUpdate = async () => {
        const res = await updateInfo()
        setIsUpdated(res.success)
        setTimeout(() => window.location.pathname = '/Profile', 1500)
    }
    return (
        <Paper
            style={{ width: "100%", height: "auto", textAlign: "center", padding: "1.5rem" }}
        >
            {
                (isUpdated === true) && <Alert color="success">C???p nh???t th??nh c??ng</Alert>
            }
            <Typography className="mb-3" variant="h6" gutterBottom>
                Th??ng tin t??i kho???n
            </Typography>
            <div style={{ width: "80%", margin: "auto" }}>
                <TextField
                    className="mb-3"
                    fullWidth
                    error={false}
                    id="Email"
                    label="Email"
                    helperText={""}
                    variant="outlined"
                    value={email}
                    disabled
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={false}
                    id="Phone"
                    label="??i???n tho???i"
                    helperText=""
                    variant="outlined"
                    type="number"
                    value={phone}
                    onChange={e => onChangeUser({ phone: e.target.value })}
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={false}
                    id="First-name"
                    label="T??n"
                    helperText=""
                    variant="outlined"
                    value={firstname}
                    onChange={e => onChangeUser({ firstname: e.target.value })}
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={false}
                    id="Last-name"
                    label="H???"
                    helperText=""
                    variant="outlined"
                    value={lastname}
                    onChange={e => onChangeUser({ lastname: e.target.value })}
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={false}
                    id="Address"
                    label="?????a ch??? giao h??ng"
                    helperText=""
                    variant="outlined"
                    value={address}
                    onChange={e => onChangeUser({ address: e.target.value })}
                />
                <Button variant="contained" onClick={onUpdate}>C???p nh???t</Button>
            </div>

        </Paper>
    )
}

function ChangePassword(props) {
    const { password, newPassword, confirmNewPassword, onChangeUser, updatePassword } = props
    const [isUpdated, setIsUpdated] = useState("null")
    const [errors, setError] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const onUpdate = async () => {
        let res
        setError({
            password: password.trim() === "" ? "vui l??ng nh???p m???t kh???u" : "",
            newPassword: newPassword.trim() === "" ? "vui l??ng nh???p m???t kh???u m???i" : "",
            confirmNewPassword: confirmNewPassword === newPassword ? "" : "m???t kh???u kh??ng h???p l???"
        })
        if (newPassword === confirmNewPassword && newPassword.trim() !== "") {
            res = await updatePassword()
            setIsUpdated(res.success)
        }
    }
    useEffect(() => {
        if (isUpdated === true) setTimeout(() => window.location.pathname = '/Profile', 1500)
    })

    return (
        <Paper
            style={{ width: "100%", height: "auto", textAlign: "center", padding: "1.5rem" }}
        >
            {
                (isUpdated === true) && <Alert color="success">C???p nh???t th??nh c??ng</Alert>

            }
            <Typography className="mb-3" variant="h6" gutterBottom>
                ?????i m???t kh???u
            </Typography>
            <div style={{ width: "80%", margin: "auto" }}>
                <TextField
                    className="mb-3"
                    fullWidth
                    error={isUpdated === false || errors.password !== ""}
                    id="password"
                    label="M???t kh???u c??"
                    helperText={(isUpdated === false || errors.password !== "") && "M???t kh???u kh??ng h???p l???"}
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        onChangeUser({ password: e.target.value })
                        setError({
                            ...errors,
                            password: ""
                        })
                        setIsUpdated("null")
                    }}
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={errors.newPassword !== ""}
                    id="new-password"
                    label="M???t kh???u m???i"
                    helperText={errors.newPassword !== "" && errors.newPassword}
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={e => {
                        onChangeUser({ newPassword: e.target.value })
                        setError({
                            ...errors,
                            newPassword: ""
                        })
                    }}
                />
                <TextField
                    className="mb-3"
                    fullWidth
                    error={errors.confirmNewPassword !== ""}
                    id="confirm-new-password"
                    label="X??c nh???n m???t kh???u m???i"
                    helperText={errors.confirmNewPassword !== "" && "M???t kh???u kh??ng h???p l???"}
                    variant="outlined"
                    type="password"
                    value={confirmNewPassword}
                    onChange={e => {
                        onChangeUser({ confirmNewPassword: e.target.value })
                        setError({
                            ...errors,
                            confirmNewPassword: ""
                        })
                    }}
                />
                <Button variant="contained" onClick={onUpdate}>?????i m???t kh???u</Button>
            </div>

        </Paper>
    )
}