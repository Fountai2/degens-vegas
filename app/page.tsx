'use client'
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import vegasData from './res/vegas.json';
import SwipeableViews from 'react-swipeable-views';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { MapPinIcon, HomeIcon, BuildingStorefrontIcon, BeakerIcon, FilmIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
 
interface ExpandMoreProps extends IconButtonProps{
  expand: boolean;
}

// This block defines each item in my json for typescript usage
interface Event {
  title: string;
  location?: string;
  map_link?: string;
  hours?: Array<{ [day: string]: string }>; // Array of objects with day names as keys
  cost?: number;
  cost_low?: number;
  cost_high?: number;
  website?: string;
  menu?: string;
}

interface EventCategories {
  Information: string;
  [key: string]: string | Event[]; // This allows for new, dynamic categories
}

const tabIcons: { [key: string]: JSX.Element } = {
  "Information": <InformationCircleIcon className="h-5 w-5" />,
  "Entertainment": <HomeIcon className="h-5 w-5" />,
  "Dining": <BuildingStorefrontIcon className="h-5 w-5" />,
  "Drinking": <BeakerIcon className="h-5 w-5" />,
  "Shows": <FilmIcon className="h-5 w-5" />,
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>

  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [expanded, setExpanded] = React.useState<{ [key: number]: boolean}>({});
  const handleExpandClick = (index: number) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle expansion for the specific card
    }));
  };
  const [value, setValue] = React.useState(0);
  const eventCategories: Record<string, any> = vegasData; 
  const categories = Object.keys(eventCategories);
  const x = Object(eventCategories);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleChangeIndex = (index: React.SetStateAction<number>) => {
    setValue(index);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Event Tabs"
          centered
          variant="scrollable"
        >

          {categories.map((category, index) => (
            <Tab key={index} icon={tabIcons[category]} label={category} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
              <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>


      {/* Insert data from json into tabs */}
      {categories.map((category, index)=> (
        <CustomTabPanel key={index} value={value} index={index}> 
          <h1>{category}</h1>
          {Array.isArray(eventCategories[category]) && eventCategories[category].map((event, eventIndex) => (
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
              
            <Box key={eventIndex} sx={{mb: 2}}>
              
              <h3>{event.title}</h3>
              {event.location && event.map_link && (
              <p><strong>Location: </strong> 
              <a href={event.map_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-blue-400 text-white font-bold py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
              >
                <MapPinIcon className="size-5 text-white-800" />
                {event.location}
              </a>
              </p>)}
              <CardActions>
              <ExpandMore
                        expand={expanded[eventIndex] || false}
                        onClick={() => handleExpandClick(eventIndex)}
                        aria-expanded={expanded[eventIndex] || false}
                        aria-label="show more"
                      >
                <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[eventIndex] || false} timeout="auto" unmountOnExit>
              <CardContent>
              {event.hours && event.hours.length > 0 && (
                <p><strong>Hours: </strong> 
                {Object.entries(event.hours[0]).map(([day, hours], i) => (
                    <span key={i}>
                      {day}: {String(hours)}
                      <br />
                      </span>
                  ))}
                </p>
              )}
              {event.cost && (
              <p><strong>Cost:</strong> ${event.cost || `${event.cost_low} - ${event.cost_high}`}</p>
              )}
              
              <a href={event.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
              {event.menu && (
                <>
                  <br />
                  <a href={event.menu} target="_blank" rel="noopener noreferrer">View Menu</a>
                </>
               
              )}
              </CardContent>
              </Collapse>
            </Box>
            </CardContent></Card>   
          ))}  
      </CustomTabPanel>
      ))}
        </SwipeableViews>
      </Box>
       );
};