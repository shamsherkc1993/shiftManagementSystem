import React from "react";
import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Button, Table, Form, Pagination, Toast } from "react-bootstrap";
import style from "../pages/ViewUserDetail.module.css";
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";

const TableContent = () => {
  const { URL, searchTerm, handleDelete, currentUsers, handleEdit } =
    useContext(UserContext);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
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
                <td>
                  <img src={item.image} className={style.userImg} alt="User" />
                </td>
                <td>
                  {item.Last_name} {item.First_name}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.userLevel}</td>
                <td>
                  {item.address.map((addr, addrIndex) => (
                    <div key={addrIndex}>
                      <p>
                        {addr.ZipCode}, {addr.country},
                      </p>
                      <p>
                        {addr.city}, {addr.street}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {item.shiftDetails.map((shift, shiftIndex) => (
                    <div key={shiftIndex} className="shift-details">
                      <p>
                        {shift.startTime} - {shift.endTime}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    variant="none"
                    className={style.EditDeleteBtn}
                    onClick={() => handleEdit(item.id)}
                  >
                    <img src={editImg} alt="edit" />
                  </Button>
                  <Button
                    variant="none"
                    className={style.EditDeleteBtn}
                    onClick={() => handleDelete(item.id)}
                  >
                    <img src={deleteImg} alt="delete" className="img-fluid" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No users found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableContent;
