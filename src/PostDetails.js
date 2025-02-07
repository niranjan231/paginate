import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostDetails from "./PostDetails";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filtered data based on search term
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current page items
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <Routes>
        {/* Home Page (Post List) */}
        <Route
          path="/"
          element={
            <div className="App">
              {/* Search Input */}
              <div style={{ margin: "20px", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "50%",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>

              {/* Card Display */}
              <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="card"
                      style={{ width: "15rem", margin: "10px", height: "25rem" }}
                    >
                      {/* Random Image for Each Card */}
                      <img
                        src={`https://picsum.photos/200/300?random=${item.id}`}
                        className="card-img-top"
                        alt="Random"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.body}</p>
                        <Link to={`/post/${item.id}`} className="btn btn-primary">
                          Go somewhere
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 style={{ textAlign: "center", width: "100%" }}>No results found</h4>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="container-2" style={{ margin: "20px", textAlign: "center" }}>
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>

                  {/* Dynamic Page Buttons */}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        margin: "0 5px",
                        backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              )}
            </div>
          }
        />

        {/* Post Details Page */}
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
