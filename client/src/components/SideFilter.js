/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
// import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { useDispatch } from 'react-redux';

export default function SideFilter({ name }) {
  // const dispatch = useDispatch();
  // const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>filters</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
