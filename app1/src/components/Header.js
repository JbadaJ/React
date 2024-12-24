// components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>설명</Link>
        <Link to="/list"  style={styles.link}>방문 정보</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#007bff",
    padding: "10px 20px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Header;
