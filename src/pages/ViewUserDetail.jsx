import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Form, Pagination } from "react-bootstrap";
import style from "./ViewUserDetail.module.css";
import TableContent from "../commonComponents/TableContent";

const ViewUserDetail = () => {
  const {
    URL,
    filterSVG,
    downloadSVG,
    filteredUsers,
    searchTerm,
    toast,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    usersPerPage,
    paginate,
    totalPages,
  } = useContext(UserContext);

  return (
    <>
      <div className={style.mainDiv}>
        {!toast ? (
          <div className={style.secondDiv}>
            <Form.Control
              type="search"
              placeholder="Search by name, email, phone..."
              className={style.searchFeild}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <a href="#" className={style.topBtn}>
              <svg
                className={style.styleSVG}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnslink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="122.879px"
                height="122.102px"
                viewBox="0 0 122.879 122.102"
                enableBackground="new 0 0 122.879 122.102"
                xmlSpace="preserve"
              >
                <g>
                  <path d={filterSVG} />
                </g>
              </svg>{" "}
              Filters
            </a>

            <a href="#" className={style.topBtn}>
              <svg
                className={style.styleSVG}
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 437.242"
              >
                <path fillRule="nonzero" d={downloadSVG} />
              </svg>{" "}
              Download
            </a>
          </div>
        ) : (
          <h3 className={style.toast}>USER {toast} DELETED</h3>
        )}

        <TableContent />
        {filteredUsers.length > usersPerPage && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {/* Show page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Pagination.Item>
                )
              )}

              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewUserDetail;
