import React, { useState } from 'react'
import { UserContext } from '../useContext/UserContext';
import { useContext } from 'react';
import { Button, Table, Form, Pagination} from 'react-bootstrap';
import style from './ViewUserDetail.module.css'
import editImg from '../assets/edit.png';
import deleteImg from '../assets/delete.png';

const ViewUserDetail = () => {

  const {userDetailData} = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 

  //filter part
  const filteredUsers = userDetailData.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.First_name} ${user.Last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination part
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page part
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const filterSVG = "M9.96,0h102.96c2.744,0,5.232,1.117,7.035,2.919c1.801,1.803,2.924,4.288,2.924,7.032v102.201 c0,2.74-1.123,5.229-2.924,7.031c-1.803,1.805-4.291,2.918-7.035,2.918H9.96c-2.745,0-5.233-1.113-7.035-2.918 C1.123,117.381,0,114.893,0,112.152V9.951c0-2.745,1.123-5.229,2.925-7.032C4.727,1.117,7.215,0,9.96,0L9.96,0z M80.629,41.732 h7.365V17.8c0-1.031,0.416-1.96,1.088-2.634c0.678-0.674,1.605-1.088,2.633-1.088c1.029,0,1.961,0.414,2.631,1.088 c0.674,0.674,1.092,1.603,1.092,2.634v23.932h7.359c2.205,0,4.01,1.804,4.01,4.009l0,0c0,2.206-1.805,4.009-4.01,4.009h-7.359 v36.488c0,1.027-0.418,1.959-1.092,2.629c-0.67,0.672-1.602,1.092-2.631,1.092c-1.027,0-1.955-0.42-2.633-1.092 c-0.672-0.67-1.088-1.602-1.088-2.629V49.75h-7.365c-2.205,0-4.008-1.804-4.008-4.009l0,0 C76.621,43.536,78.424,41.732,80.629,41.732L80.629,41.732z M50.165,58.956h7.362V17.8c0-1.031,0.417-1.96,1.091-2.634 c0.671-0.674,1.603-1.088,2.633-1.088c1.022,0,1.956,0.414,2.628,1.088c0.674,0.674,1.088,1.603,1.088,2.634v41.155h7.365 c2.205,0,4.01,1.804,4.01,4.009l0,0c0,2.205-1.805,4.01-4.01,4.01h-7.365v19.264c0,1.027-0.414,1.959-1.088,2.629 c-0.672,0.672-1.605,1.092-2.628,1.092c-1.031,0-1.962-0.42-2.633-1.092c-0.674-0.67-1.091-1.602-1.091-2.629V66.975h-7.362 c-2.205,0-4.009-1.805-4.009-4.01l0,0C46.155,60.759,47.959,58.956,50.165,58.956L50.165,58.956z M19.971,41.35h7.194V17.8 c0-1.031,0.419-1.96,1.094-2.634c0.671-0.674,1.603-1.088,2.63-1.088c1.026,0,1.957,0.414,2.631,1.088 c0.674,0.674,1.088,1.603,1.088,2.634V41.35h7.53c2.205,0,4.009,1.804,4.009,4.009l0,0c0,2.205-1.804,4.009-4.009,4.009h-7.53 v36.871c0,1.027-0.415,1.959-1.088,2.629c-0.674,0.672-1.605,1.092-2.631,1.092c-1.028,0-1.959-0.42-2.63-1.092 c-0.674-0.67-1.094-1.602-1.094-2.629V49.368h-7.194c-2.205,0-4.009-1.804-4.009-4.009l0,0 C15.962,43.153,17.766,41.35,19.971,41.35L19.971,41.35z M91.715,95.18c2.205,0,4.203,0.895,5.658,2.346l0.006-0.004 c1.449,1.451,2.346,3.453,2.346,5.668c0,2.199-0.896,4.201-2.346,5.652l-0.012,0.018c-1.455,1.445-3.457,2.338-5.652,2.338 c-2.209,0-4.213-0.896-5.662-2.344l-0.123-0.139c-1.377-1.439-2.227-3.387-2.227-5.525c0-2.215,0.9-4.217,2.35-5.668 C87.502,96.074,89.506,95.18,91.715,95.18L91.715,95.18z M94.449,100.447c-0.691-0.693-1.66-1.123-2.734-1.123 c-1.064,0-2.033,0.432-2.732,1.131c-0.697,0.697-1.135,1.662-1.135,2.734c0,1.025,0.4,1.955,1.043,2.646l0.092,0.084 c0.699,0.699,1.668,1.131,2.732,1.131c1.074,0,2.043-0.426,2.734-1.123l0.008-0.008c0.691-0.695,1.127-1.662,1.127-2.73 c0-1.072-0.436-2.037-1.135-2.734l0.006-0.002L94.449,100.447L94.449,100.447z M61.249,95.18c2.205,0,4.207,0.895,5.658,2.346 l0.004-0.004c1.451,1.451,2.35,3.453,2.35,5.668c0,2.205-0.898,4.203-2.354,5.658l0.004,0.006 c-1.445,1.447-3.451,2.344-5.662,2.344c-2.202,0-4.199-0.896-5.655-2.344l-0.014-0.018c-1.448-1.451-2.339-3.447-2.339-5.646 c0-2.215,0.897-4.217,2.348-5.668l0.132-0.123C57.159,96.025,59.109,95.18,61.249,95.18L61.249,95.18z M63.982,100.447 c-0.697-0.693-1.662-1.123-2.734-1.123c-1.028,0-1.959,0.391-2.648,1.037l-0.083,0.094c-0.7,0.697-1.134,1.662-1.134,2.734 c0,1.068,0.428,2.035,1.125,2.73l0.009,0.008c0.691,0.697,1.659,1.123,2.73,1.123c1.068,0,2.031-0.432,2.734-1.131l0.006,0.002 l0.002-0.002c0.695-0.695,1.123-1.662,1.123-2.73c0-1.072-0.432-2.037-1.131-2.734l0.006-0.002L63.982,100.447L63.982,100.447z M30.89,95.18c2.211,0,4.216,0.895,5.661,2.342c1.451,1.451,2.351,3.453,2.351,5.668c0,2.205-0.9,4.203-2.354,5.658l0.003,0.006 c-1.445,1.447-3.45,2.344-5.661,2.344c-2.202,0-4.201-0.896-5.658-2.344l-0.012-0.018c-1.448-1.451-2.342-3.447-2.342-5.646 c0-2.215,0.896-4.217,2.348-5.668l0.131-0.123C26.797,96.025,28.748,95.18,30.89,95.18L30.89,95.18z M33.621,100.455 c-0.697-0.699-1.665-1.131-2.731-1.131c-1.028,0-1.959,0.391-2.647,1.037l-0.085,0.094c-0.7,0.697-1.131,1.662-1.131,2.734 c0,1.068,0.429,2.035,1.123,2.73l0.009,0.008c0.691,0.697,1.662,1.123,2.733,1.123c1.066,0,2.034-0.432,2.731-1.131l0.006,0.002 l0.003-0.002c0.696-0.695,1.125-1.662,1.125-2.73C34.754,102.117,34.323,101.152,33.621,100.455L33.621,100.455z M112.92,4.981 H9.96c-1.369,0-2.611,0.56-3.51,1.463c-0.903,0.9-1.463,2.145-1.463,3.507v102.201c0,1.361,0.56,2.607,1.463,3.506 c0.899,0.906,2.142,1.461,3.51,1.461h102.96c1.369,0,2.611-0.555,3.51-1.461c0.902-0.898,1.463-2.145,1.463-3.506V9.951 c0-1.363-0.561-2.607-1.463-3.507C115.531,5.541,114.289,4.981,112.92,4.981L112.92,4.981z";

  const downloadSVG = "M.723 313.756c-2.482-10.26 1.698-18.299 8.38-23.044a23.417 23.417 0 018.018-3.632c2.877-.7 5.88-.865 8.764-.452 8.127 1.166 15.534 6.417 18.013 16.677a632.525 632.525 0 014.317 19.091c1.566 7.418 2.52 12.234 3.418 16.772 4.445 22.443 7.732 36.512 16.021 43.526 8.775 7.423 25.366 9.985 57.167 9.985h268.042c29.359 0 44.674-2.807 52.736-10.093 7.768-7.023 10.805-20.735 14.735-41.777l.007-.043a1038.93 1038.93 0 013.426-17.758c1.298-6.427 2.722-13.029 4.34-19.703 2.484-10.256 9.886-15.503 18.008-16.677 2.861-.41 5.846-.242 8.722.449 2.905.699 5.679 1.935 8.068 3.633 6.672 4.741 10.843 12.762 8.38 22.997l-.011.044a494.136 494.136 0 00-3.958 17.974c-1.011 5.023-2.169 11.215-3.281 17.178l-.008.043c-5.792 31.052-10.544 52.357-26.462 67.319-15.681 14.741-40.245 20.977-84.699 20.977H124.823c-46.477 0-72.016-5.596-88.445-20.144-16.834-14.909-21.937-36.555-28.444-69.403-1.316-6.654-2.582-13.005-3.444-17.126-1.213-5.781-2.461-11.434-3.767-16.813zm165.549-143.439l65.092 68.466.204-160.91h47.595l-.204 160.791 66.774-70.174 34.53 32.848-125.184 131.556-123.336-129.729 34.529-32.848zm65.325-115.413l.028-22.041h47.594l-.028 22.041h-47.594zm.046-36.254L231.666 0h47.595l-.024 18.65h-47.594z";
  
  return (
    <>
    <div  className={style.mainDiv}>
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
        <a href='#' className={style.topBtn}>
          <svg className={style.styleSVG} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnslink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.879px" height="122.102px" viewBox="0 0 122.879 122.102" enableBackground="new 0 0 122.879 122.102" xmlSpace="preserve"><g><path d={filterSVG}/></g>
          </svg> Filters
        </a>

        <a href='#' className={style.topBtn}>
          <svg className={style.styleSVG} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 437.242"><path fillRule="nonzero" d={downloadSVG}/>
          </svg> Download
        </a>
      </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country</th>
          <th>Level</th>
          <th>Address</th>
          <th>Shift</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {currentUsers.length > 0 ? (
                  currentUsers.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.image} className={style.userImg} alt="User"/></td>
                      <td>{item.Last_name} {item.First_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.country}</td>
                      <td>{item.userLevel}</td>
                      <td>
                        {item.address.map((addr, addrIndex) => (
                          <div key={addrIndex}>
                            <p>{addr.ZipCode}, {addr.country}, {addr.city}, {addr.street}</p>
                          </div>
                        ))}
                      </td>
                      <td>
                        {item.shiftDetails.map((shift, shiftIndex) => (
                          <div key={shiftIndex} className="shift-details">
                            <p>{shift.startTime} - {shift.endTime}</p>
                          </div>
                        ))}
                      </td>
                      <td>
                        <Button variant='none' className={style.EditDeleteBtn}>
                          <img src={editImg} alt="edit" />  
                        </Button>
                        <Button variant='none' className={style.EditDeleteBtn}>
                          <img src={deleteImg} alt="delete" className='img-fluid'/>  
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No users found matching "{searchTerm}"</td>
                  </tr>
                )}    
      </tbody>
    </Table>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
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
          </div>
        )}

    </div>
    </>
  )
}

export default ViewUserDetail
