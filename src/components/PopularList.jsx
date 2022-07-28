import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";

let DEFAULT_TIMER = 0;

export default function PopularList(props) {
  const { name } = useParams();
  const { populars } = props;

  const [modal, setPopupModal] = useState(false);
  // const [fetchCompleted, setFetchCompleted] = useState(false);
  const [programDetails, setProgramDetails] = useState({});

  const showDetails = (title) => {
    setPopupModal(true);

    let programDetails = populars[name].filter(
      (item) => item.title === title
    )[0];
    programDetails.funcFact = "Loading...";
    setProgramDetails(programDetails);

    let numbersapiUrl = `http://numbersapi.com/${programDetails.releaseYear}/year`;
    if (programDetails.title === "U2: Live in Paris") {
      DEFAULT_TIMER = 3000;
    } else if (programDetails.title === "Under The Gun") {
      numbersapiUrl = `http://numbrsapi.com/${programDetails.releaseYear}/year`;
    }

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

  const closePopup = () => {
    setPopupModal(false);
    // setFetchCompleted(false);
    setProgramDetails({});
  };

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
