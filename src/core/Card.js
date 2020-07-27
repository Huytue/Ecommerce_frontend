import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
// const BootstrapButton = withStyles({
//   root: {
//     boxShadow: 'none',
//     textTransform: 'none',
//     fontSize: 16,
//     padding: '6px 12px',
//     border: '1px solid',
//     lineHeight: 1.5,
//     backgroundColor: '#0063cc',
//     borderColor: '#0063cc',
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       backgroundColor: '#0069d9',
//       borderColor: '#0062cc',
//       boxShadow: 'none',
//     },
//     '&:active': {
//       boxShadow: 'none',
//       backgroundColor: '#0062cc',
//       borderColor: '#005cbf',
//     },
//     '&:focus': {
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//     },
//   },
// })(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const Card = ({

  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const classes = useStyles();
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <ColorButton size="small" variant="contained" color="primary" className={classes.margin}>
           Detail...
      </ColorButton>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <ThemeProvider theme={theme}>
          <Button size="small" onClick={addToCart} variant="contained" color="primary" className={classes.margin}>
            Add to cart
        </Button>
        </ThemeProvider>

      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
        <span className="badge badge-primary badge-pill">Out of Stock </span>
      );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={count} 
          variant="outlined"
          onChange={handleChange(product._id)} 
        />
            
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <Button size="small" onClick={() => {
          removeItem(product._id);
          setRun(!run); // run useEffect in parent Cart
        }} variant="contained" color="secondary">
          Remove Product
        </Button>

      )
    );
  };
  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        
        {showStock(product.quantity)}
        <br />
        
        <div>
        {showCartUpdateOptions(cartUpdate)}
        </div>
        

        <div className="button-view">
        {showViewButton(showViewProductButton)}
  

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}
</div>
      
      </div>
    </div>
  );



};

export default Card;