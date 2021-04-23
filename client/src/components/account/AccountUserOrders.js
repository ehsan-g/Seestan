/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrderList, cleanMyOrders } from '../../actions/index';
import Loader from '../Loader';
import Message from '../Message';
import { AccountUserOrdersCard } from './AccountUserOrdersCard';

export default function AccountUserOrders() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const myOrders = useSelector((state) => state.myOrders);
  const { theMyOrders, loading, error } = myOrders;

  useEffect(() => {
    if (!theMyOrders || !theMyOrders[0] || loading) {
      dispatch(fetchUserOrderList());
    }
    return () => {
      // dispatch(cleanMyOrders());
    };
  }, [dispatch, loading, theMyOrders]);

  const handleChange = (order) => (event, isExpanded) => {
    setExpanded(isExpanded ? `panel${order._id}` : false);
    // dispatch(fetchUserOrderList());
  };

  const renderElement = () => (
    <>
      {!theMyOrders || !theMyOrders.map ? (
        <Loader />
      ) : (
        <div>
          {theMyOrders.map((order) => (
            <div key={order._id}>
              <Accordion
                expanded={expanded === `panel${order._id}`}
                onChange={handleChange(order)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel-bh-content"
                  id="panel-bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {`تاریخ ثبت: ${order.createAt} `}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountUserOrdersCard order={order} />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </>
  );
  return (
    <>
      {!loading && (theMyOrders === undefined || !theMyOrders[0]) ? (
        <Message variant="outlined" severity="info">
          شما هنوز خریدی انچام ندادید
        </Message>
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : (
        renderElement()
      )}
    </>
  );
}
