import React, { useEffect, useState } from "react";
import "./Style/AdminPannel.scss";
import axios from "axios";
import { BiSolidShow } from "react-icons/bi";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
const Users = () => {
  const navigate = useNavigate();
  const [setApi, getApi] = useState(null);
  const [isLoadingData, setisLoadingData] = useState(false);
  //Here For Pagination setup
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = setApi?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = setApi ? Math.ceil(setApi.length / itemsPerPage) : 0;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in localStorage");
     navigate("/login");
    return;
  }

  setisLoadingData(true);

  axios
    .get("https://edu-master-delta.vercel.app/admin/all-user", {
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYW0zQGdtYWlsLmNvbSIsIl9pZCI6IjY4NWM2YTllODUxZjNlMDUwMjM5NDExOSIsImlhdCI6MTc1MTkwNTU0NywiZXhwIjoxNzUxOTkxOTQ3fQ.NG_4Ot6uSS4cBo6OYs3EdFDOKVYXwYRSWT-O_ETCiVA"
      }
    })
    .then((res) => {
      console.log("Success:", res.data);
      getApi(res.data.data);
    })
    .catch((err) => {
      console.error("Error:", err.response?.status, err.response?.data || err.message);
       navigate("/login");
    })
    .finally(() => {
      setisLoadingData(false);
    });
}, []);


  return (
    <div>
      <div className="parent-users">
        <div className="container-users">
          <div className="detalis">
            <div className="card">
              <h4>UserName</h4>
            </div>
            <div className="card">
              <h4>email</h4>
            </div>
            <div className="card">
              <h4>Phone</h4>
            </div>
            <div className="card">
              <h4>Date</h4>
            </div>
            <div className="card">
              <h4>ClassLevel</h4>
            </div>
            <div className="card">
              <h4>Details</h4>
            </div>
          </div>
          {isLoadingData ? (
            <div className="alarm">
              <div className="loader ">
               <h3 className="text-[15px]"> Loading...!</h3>
                <span></span>
              </div>
            </div>
          ) : (
            currentUsers.map((e, index) => (
              <div className="detalis" key={index}>
                <div className="card">
                  <p>{e.fullName.length > 10 ? e.fullName.slice(0, 12) + "..." : e.fullName}</p>
                </div>
                <div className="card">
                  <p>{e.email.length > 10 ? e.email.slice(0, 10) + "..." : e.email}</p>
                </div>
                <div className="card">
                  <p>{e.phoneNumber}</p>
                </div>
                <div className="card">
                  <p>{e.createdAt.length > 10 ? e.email.slice(0, 10) + "..." : e.createdAt}</p>
                </div>
                <div className="card">
                  <p>{e.classLevel}</p>
                </div>
                <div className="card">
                  <button onClick={() => alert(e._id, "welcome")}>
                    <BiSolidShow />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Here Realeted By Pagination*/}
          {setApi && setApi.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-6 mt-6 border-2 w-full h-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`text-3xl transition-all ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500 hover:scale-110 cursor-pointer"
                }`}
              >
                <FaArrowCircleLeft />
              </button>

              <span className="text-lg font-semibold text-gray-700 " >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`text-3xl transition-all ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed cursor-pointer"
                    : "text-blue-500 hover:scale-110 cursor-pointer"
                }`}
              >
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
