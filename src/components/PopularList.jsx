import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";

export default function PopularList(props) {
  const { name } = useParams();
  const { populars } = props;

  const [modal, setPopupModal] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [programDetails, setProgramDetails] = useState({});

  const showDetails = (title) => {
    setPopupModal(true);

    let programDetails = populars[name].filter(
      (item) => item.title === title
    )[0];

    fetch(`http://numbersapi.com/${programDetails.releaseYear}/year`)
      .then((response) => response.text())
      .then((data) => {
        programDetails.funcFact = data;
        setFetchCompleted(true);
        setProgramDetails(programDetails);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const closePopup = () => {
    setPopupModal(false);
    setFetchCompleted(false);
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
          {populars[name].map((item) => {
            return (
              <Card
                item={{ src: item.images["Poster Art"].url, title: item.title }}
                showDetails={showDetails}
              />
            );
          })}
        </div>
      ) : (
        <span className="no-results">No Results</span>
      )}
      {modal && fetchCompleted && Object.keys(programDetails).length > 0 && (
        <Modal closePopup={closePopup} programDetails={programDetails} />
      )}
    </React.Fragment>
  );
}
