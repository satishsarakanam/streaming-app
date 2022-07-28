import React, { useEffect } from "react";
import "../styles/Error.css";

export default function Error() {
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
