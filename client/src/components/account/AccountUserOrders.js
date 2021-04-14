import React, { useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../actions/index';
import Loader from '../Loader';

export default function AccountUserOrders() {
  const orderId = 1;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderById, shippingAddress, loading } = orderDetails;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (order) => (event, isExpanded) => {
    setExpanded(isExpanded ? `panel${order.key}` : false);
    console.log('panel');

    dispatch(fetchOrderDetails(order.key));
  };

  const userOrders = [{ key: 9 }, { key: 2 }, { key: 3 }, { key: 4 }];
  return (
    <div>
      {userOrders.map((order) => (
        <div key={order.key}>
          <Accordion
            expanded={expanded === `panel${order.key}`}
            onChange={handleChange(order)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {`order${order.key}`}
              </Typography>
              <Typography>General</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!orderById ? (
                <Loader />
              ) : (
                <>
                  <Typography>{`${orderById._id}`}</Typography>
                  <Typography>{`${orderById.orderItems[0].name}`}</Typography>
                  <Typography>{`${orderById.paymentMethod}`}</Typography>
                  <Typography>{`${orderById.shippingAddress.address}`}</Typography>
                  <Typography>{`${orderById.shippingAddress.postalcode}`}</Typography>
                  <Typography>{`${orderById.shippingAddress.phone}`}</Typography>
                  <Typography>{`${orderById.shippingAddress.deliveryMethod}`}</Typography>
                  <img
                    src={`images/${orderById.orderItems[0].image}`}
                    alt={orderById.orderItems[0].name}
                    loading="lazy"
                    style={{ width: '20%' }}
                  />
                </>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
