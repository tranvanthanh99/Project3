import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { hostURLStatic } from '../../config';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingBottom: "0"
    },
    cover: {
        minWidth: 80,
        backgroundSize: "contain"
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginLeft: "auto",
        fontSize: "1.1rem",
        fontWeight: 700,
        textTransform: "uppercase",
    },
    addIcon: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        // marginLeft: "auto"
    },
}));

export default function ItemCard(props) {
    const { product, addItem } = props;
    const classes = useStyles();
    // const theme = useTheme();


    if (product.category === "pizza") return (<PizzaCard product={product} addItem={addItem} />)

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={`${hostURLStatic}/${product.image}`}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6" style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase" }}>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {product.product_type}
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.controls}>
                <Typography variant="inherit" color="error">
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.price)}
                </Typography>
            </div>
            <div className={classes.addIcon}>
                <IconButton
                    className="float-right"
                    size="medium"
                    color="primary"
                    onClick={
                        () => {
                            addItem({
                                ...product,
                                quantity: 1,
                            })
                        }
                    }
                >
                    <AddRoundedIcon fontSize="small" />
                </IconButton>
            </div>
        </Card>
    );
}

const usePizzaStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: "10px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const PizzaCard = (props) => {
    const { product, addItem } = props;
    const classes = useStyles();
    const classesAccord = usePizzaStyles();
    const [error, setError] = useState({
        size: "",
        crust: ""
    })
    const [item, setItem] = useState({
        product_id: product.id,
        category: product.category,
        name: product.name,
        size: "",
        option: [],
        price: product.price,
        extraPrice: 0,
        quantity: 1
    })

    const displaySize = product.size.map((value) => {
        if (value === "nh???") return `C??? ${value} - 7 inch`
        else if (value === "v???a") return `C??? ${value} - 9 inch`
        else return `C??? ${value} - 12 inch`
    })
    const displayCrust = ["????? m???ng", "????? v???a", "????? d??y"]
    const displayCheese = ["Th??m ph?? mai", "G???p ????i ph?? mai", "G???p ba ph?? mai"]

    const onItemChange = object => {
        setItem(item => Object.assign({ ...item }, object))
    }

    const onErrorChange = object => {
        setError(error => Object.assign({ ...error }, object))
    }

    const addPizza = () => {
        if (item.size === "") onErrorChange({ size: "B???n ch??a ch???n c??? b??nh" })
        if (!item.option.some((val) => displayCrust.includes(val))) onErrorChange({ crust: "B???n ch??a ch???n ????? b??nh" })
        if (item.size !== "" && item.option.some((val) => displayCrust.includes(val))) {
            addItem(item)
        }
    }


    return (
        <div className={classesAccord.root}>
            <Accordion
                TransitionProps={{ unmountOnExit: true }}
                onChange={() => onItemChange({
                    product_id: product.id,
                    category: product.category,
                    name: product.name,
                    size: "",
                    option: [],
                    price: product.price,
                    extraPrice: 0,
                    quantity: 1
                })}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <CardMedia
                        className={classes.cover}
                        image={`${hostURLStatic}/${product.image}`}
                        title="product"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content} style={{ paddingBottom: 0, paddingTop: 0 }}>
                            <Typography component="h6" variant="h6" style={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase" }}>
                                {product.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {product.product_type}
                            </Typography>
                        </CardContent>
                    </div>
                    <div className={classes.controls}>
                        <Typography variant="inherit" color="error">
                            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails style={{ paddingBottom: 0, display: 'block' }}>
                    <FormControl required className="d-block" error={error.size !== ""} component="fieldset">
                        <FormLabel component="legend">Ch???n c??? b??nh</FormLabel>
                        <FormHelperText>{error.size !== "" ? error.size : (item.size === "nh???" ? `${product.price-130000} ???` : (item.size === "v???a" ? `${product.price-60000} ???` : `${product.price} ???`))}</FormHelperText>
                        <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                            onChange={(e) => {
                                onItemChange({
                                    size: e.target.value,
                                    price: e.target.value === "l???n" ? product.price + item.extraPrice : product.price + item.extraPrice - (e.target.value === "v???a" ? 60000 : 130000)
                                })
                                onErrorChange({ size: "" })
                            }}
                        >
                            {
                                displaySize.map((value, index) => (
                                    <FormControlLabel key={value} value={product.size[index]} control={<Radio color="primary" />} label={value} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormControl required className="d-block" error={error.crust !== ""} component="fieldset">
                        <FormLabel component="legend">Ch???n ????? b??nh</FormLabel>
                        <FormHelperText>{error.crust}</FormHelperText>
                        <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                            onChange={e => {
                                onItemChange({ option: [e.target.value, ...item.option.filter((item) => !displayCrust.includes(item))] })
                                onErrorChange({ crust: "" })
                            }}
                        >
                            {
                                displayCrust.map((value) => (
                                    <FormControlLabel key={value} value={value} control={<Radio color="primary" />} label={value} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormControl className="d-block" component="fieldset">
                        <FormLabel component="legend">T??y ch???n th??m ph?? mai</FormLabel>
                        <FormHelperText className="m-0">
                            {item.option.includes("Th??m ph?? mai") ? "Th??m: 15.000 ???" : (item.option.includes("G???p ????i ph?? mai") ? "Th??m: 25.000 ???" : (item.option.includes("G???p ba ph?? mai") ? "Th??m: 35.000 ???" : "Th??m: 0 ???"))}
                        </FormHelperText>
                        {
                            displayCheese.map((value) => (
                                <FormControlLabel
                                    value={value}
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={item.option.includes(value)}
                                            onChange={e => {
                                                const newAmount = e.target.checked ? (e.target.value === "Th??m ph?? mai" ? 15000 : (e.target.value === "G???p ????i ph?? mai" ? 25000 : (e.target.value === "G???p ba ph?? mai" ? 35000 : 0))) : 0;
                                                onItemChange({
                                                    option: e.target.checked ? [...item.option.filter((item) => !displayCheese.includes(item)), e.target.value] : [...item.option.filter((item) => !displayCheese.includes(item))],
                                                    price: item.price + (newAmount - item.extraPrice) + (item.option.includes("Vi???n ph?? mai") ? 45000 : 0),
                                                    extraPrice: newAmount + (item.option.includes("Vi???n ph?? mai") ? 45000 : 0)
                                                })
                                            }}
                                        />
                                    }
                                    label={value}
                                    labelPlacement="end"
                                />
                            ))
                        }
                    </FormControl>
                    <FormControl className="d-block" component="fieldset">
                        <FormLabel component="legend">T??y ch???n vi???n</FormLabel>
                        <FormHelperText className="m-0">
                            {item.option.includes("Vi???n ph?? mai") ? "Th??m: 45.000 ???" : "Th??m: 0 ???"}
                        </FormHelperText>
                        <FormControlLabel
                            value="Vi???n ph?? mai"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={item.option.includes("Vi???n ph?? mai")}
                                    onChange={e => {
                                        const newAmount = e.target.checked ? 45000 : -45000
                                        onItemChange({
                                            option: e.target.checked ? [...item.option.filter((item) => item !== "Vi???n ph?? mai"), e.target.value] : [...item.option.filter((item) => item !== "Vi???n ph?? mai")],
                                            price: item.price + newAmount,
                                            extraPrice: newAmount + item.extraPrice
                                        })
                                    }}
                                />
                            }
                            label="Vi???n ph?? mai"
                            labelPlacement="end"
                        />
                    </FormControl>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => addPizza()}
                    >
                        Th??m
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}