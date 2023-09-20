import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navabar = ({ changeMode, mode, symbol, bg, text }) => {
  let locatin = useLocation();
  let nevigator = useNavigate();

  let handleLogout = () => {
    sessionStorage.removeItem("token");
    nevigator("/login");
  };
  useEffect(() => {
    console.log(locatin.pathname);
  }, [locatin]);

  return (
    <>
      <button
        className={`btn btn-${mode} `}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
        style={{
          display: "inline-block",
          marginLeft: "1px",
          borderRadius: "200px",
          marginTop: "8px",
        }}
      >
        <FiMenu></FiMenu>
      </button>

      <div
        className="offcanvas offcanvas-start "
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel  "
        style={{ backgroundColor: bg }}
      >
        <div className="offcanvas-header ">
          <h1
            className="offcanvas-title"
            id="offcanvasWithBothOptionsLabel"
            style={{ marginLeft: "5vw", color: text }}
          >
            <span style={{ color: "brown" }}>I</span>Notebook
          </h1>
          <button
            type="button"
            className={`btn-close btn-close-${text}`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body-my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="d-grid gap-2 col-12">
            <Link to="/" className="active">
              <button
                active
                type="button"
                className={`btn  w-100 my-2 ${
                  locatin.pathname === "/" ? "btn-primary" : `btn-${mode}`
                } `}
                data-bs-dismiss="offcanvas"
              >
                Home
              </button>
            </Link>
            <Link to="/about" className="nav-link active">
              <button
                type="button"
                className={`btn  w-100 my-2 ${
                  locatin.pathname === "/about" ? "btn-primary" : `btn-${mode}`
                } `}
                data-bs-dismiss="offcanvas"
              >
                About
              </button>
            </Link>
            {!sessionStorage.getItem("token") ? (
              <div>
                <Link to="/login" className="nav-link active">
                  <button
                    type="button"
                    className={`btn  w-100 my-2 ${
                      locatin.pathname === "/login" ? "btn-primary" : `btn-${mode}`
                    } `}
                    data-bs-dismiss="offcanvas"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signUp" className="nav-link active">
                  <button
                    type="button"
                    className={`btn  w-100 my-2 ${
                      locatin.pathname === "/signUp" ? "btn-primary" : `btn-${mode}`
                    } `}
                    data-bs-dismiss="offcanvas"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className={`btn btn-${mode} w-100 my-2  `}
                data-bs-dismiss="offcanvas"
              >
                Log Out
              </button>
            )}
          </div>

          <button
            type="button"
            className={`btn btn-${mode} my-2`}
            onClick={changeMode}
            data-bs-dismiss="offcanvas"
          >
            {symbol}
          </button>
        </div>
      </div>
      <div
        className="container-dark my-5"
        style={{ display: "inline", paddingTop: "8pc" }}
      >
        <Link to="/" className="text-decoration-none">
          <h5 style={{ display: "inline", marginLeft: "8px", color: text }}>
            <span style={{ color: "brown" }}>I</span>Notebook
          </h5>
        </Link>
      </div>
    </>
  );
};

export default Navabar;
