import React, { useState } from "react";
import style from "./Dashboard.module.css";
import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Container, Col, Row, Pagination } from "react-bootstrap";

const Dashboard = () => {
  const { userDetailData } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userDetailData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userDetailData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className={style.maindiv}>
        <Container>
          <Row>
            <h3>All Employee List</h3>
            <Col className={style.cols}>
              {currentItems.map((user) => (
                <p className={style.para} key={user.id}>
                  {user.First_name} {user.Last_name}
                </p>
              ))}

              {userDetailData.length > itemsPerPage && (
                <Pagination className="mt-3">
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
