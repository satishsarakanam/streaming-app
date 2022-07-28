/***************************************************************
PopularList Component which shows the popular items of that category

This component handles the modal window

Author:	Satish Sarakanam
***************************************************************/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";

export default function PopularList(props) {
  // Get the url location name which is /popular/<name>
  const { name } = useParams();
  //Get the populars
  const { populars } = props;

  // State for modal window and program details of each item
  const [modal, setPopupModal] = useState(false);
  const [programDetails, setProgramDetails] = useState({});

  // Handler for modal window with item
  const showDetails = (title) => {
    // Set the modal flag
    setPopupModal(true);

    // Filter the program details based of title
    let programDetails = populars[name].filter(
      (item) => item.title === title
    )[0];

    // Initialize the fun fact with a loading text and update when the api is success
    programDetails.funcFact = "Loading...";
    setProgramDetails(programDetails);

    // This if/else conditions added just for the demo purpose and works only on cards with
    // titles U2: Live in Paris & Under The Gun
    // Updates to Nothing Found when fetch errors out and response text when fetch is success
    let DEFAULT_TIMER = 0;
    let numbersapiUrl = `http://numbersapi.com/${programDetails.releaseYear}/year`;
    if (programDetails.title === "U2: Live in Paris") {
      DEFAULT_TIMER = 3000;
    } else if (programDetails.title === "Under The Gun") {
      numbersapiUrl = `http://numbrsapi.com/${programDetails.releaseYear}/year`;
    }

    // Added time specifically for
    setTimeout(() => {
      fetch(numbersapiUrl)
        .then((response) => response.text())
        .then((data) => {
          setProgramDetails({ ...programDetails, funcFact: data });
        })
        .catch((e) => {
          setProgramDetails({
            ...programDetails,
            funcFact: "Oh no! Nothing Found",
          });
        });
    }, DEFAULT_TIMER);
  };

  // Handler for close button in Modal window
  const closePopup = () => {
    setPopupModal(false);
    setProgramDetails({});
  };

  // Adding route to body for class based ui manipulation
  useEffect(() => {
    document.body.classList.add("route");
    return () => {
      document.body.classList.remove("route");
    };
  }, []);

  return (
    <React.Fragment>
      <div className="title-header">
        <span>Popular {name[0].toUpperCase() + name.slice(1)}</span>
      </div>
      {/* Display all the items if preset else show No Results */}
      {populars[name] ? (
        <div className="items-list">
          {populars[name].map((item, key) => {
            return (
              <Card
                key={key}
                item={{ src: item.images["Poster Art"].url, title: item.title }}
                showDetails={showDetails}
              />
            );
          })}
        </div>
      ) : (
        <span className="no-results">No Results</span>
      )}
      {modal && Object.keys(programDetails).length > 0 && (
        <Modal closePopup={closePopup} programDetails={programDetails} />
      )}
    </React.Fragment>
  );
}
