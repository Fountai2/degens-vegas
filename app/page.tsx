'use client'
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import vegasData from './res/vegas.json';
import SwipeableViews from 'react-swipeable-views';

import { MapPinIcon, HomeIcon, BuildingStorefrontIcon, BeakerIcon, FilmIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

// This block defines each item in my json for typescript usage
interface Event {
  name: string;
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
            <Box key={eventIndex} sx={{mb: 2}}>
              <h3>{event.name}</h3>
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
              <p><strong>Cost:</strong> ${event.cost || `${event.cost_low} - ${event.cost_high}`}</p>
              
              <a href={event.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
              {event.menu && (
                <>
                  <br />
                  <a href={event.menu} target="_blank" rel="noopener noreferrer">View Menu</a>
                </>
              )}
            </Box>   
          ))}  
      </CustomTabPanel>
      ))}
        </SwipeableViews>
      </Box>
       );
};

    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
