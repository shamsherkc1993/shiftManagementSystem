import SideBar from "./commonComponents/SideBar";
import MainContentTheme from "./commonComponents/MainContentTheme";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UserContext } from "./useContext/UserContext";
import {
  URL,
  headingSVG,
  filterSVG,
  downloadSVG,
} from "./customHooks/AllHooks";
import { useNavigate } from "react-router";
function App() {
  const [userDetailData, setUserDetailData] = useState([]);
  async function getUserDetailData() {
    let response = await fetch(URL);
    let data = await response.json();
    setUserDetailData(data);
  }
  useEffect(() => {
    getUserDetailData();
  }, []);

  //CommonViewData page content
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  //filter part
  const filteredUsers = userDetailData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.First_name} ${user.Last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // delete function
  const handleDelete = async (id) => {
    let response = await fetch(`${URL}/${id}`, {
      method: "delete",
    });
    await response.json();
    setToast(id);
    getUserDetailData();
  };

  //Edit user detail
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate("/edituser/" + id);
  };

  return (
    <>
      <UserContext.Provider
        value={{
          userDetailData,
          setUserDetailData,
          URL,
          getUserDetailData,
          filterSVG,
          downloadSVG,
          filteredUsers,
          searchTerm,
          setSearchTerm,
          toast,
          setToast,
          currentPage,
          setCurrentPage,
          usersPerPage,
          indexOfLastUser,
          indexOfFirstUser,
          handleDelete,
          paginate,
          totalPages,
          currentUsers,
          navigate,
          handleEdit,
        }}
      >
        <Container fluid>
          <div
            style={{
              width: "100%",
              backgroundColor: "#8d99ae",
              borderRadius: "5px",
            }}
          >
            <h3 style={{ color: "#fff", textAlign: "center", padding: "15px" }}>
              <span></span>
              <svg
                style={{
                  height: "40px",
                  width: "40px",
                  padding: "5px",
                  color: "#10d5cf",
                }}
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 119.92 122.88"
              >
                <title>schedule-calendar</title>
                <path d={headingSVG} />
              </svg>
              Shift Management <span style={{ color: "#10d5cf" }}>System</span>
            </h3>
          </div>
          <Row>
            <Col xs={2}>
              <SideBar />
            </Col>
            <Col xs={10}>
              <MainContentTheme />
            </Col>
          </Row>
        </Container>
      </UserContext.Provider>
    </>
  );
}

export default App;
