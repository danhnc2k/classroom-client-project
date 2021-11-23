import { Fragment, useState } from 'react'
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import { Tab, Tabs, Box, Typography } from '@mui/material'

import { Header, ClassroomDetail, MemberList } from "../components/components";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ClassroomPage = (props) => {
  const { classroomId } = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Detail" {...a11yProps(0)} />
            <Tab label="Members" {...a11yProps(1)} />
            <Tab label="Grade" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ClassroomDetail classroomId={classroomId}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MemberList classroomId={classroomId}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Grade Page
        </TabPanel>
      </Box>
    </Fragment>
    
  );
}

export default ClassroomPage;