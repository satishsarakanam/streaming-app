/***************************************************************
Error Component when user routes to a page which doesn't exist

Author:	Satish Sarakanam
***************************************************************/

import React, { useEffect } from "react";
import "../styles/Error.css";

export default function Error() {
  // Adding route class to body to maniplate the UI with CSS
  useEffect(() => {
    document.body.classList.add("route");
    return () => {
      document.body.classList.remove("route");
    };
  }, []);

  return (
    <section className="error-page">
      <span>:( Error: 404 Not Found</span>
    </section>
  );
}
