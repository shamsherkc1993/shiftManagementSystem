import React from 'react'
import { useContext } from 'react';
import { Button, Table, Form, Pagination} from 'react-bootstrap';
import style from './Shift.module.css'
import { UserContext } from '../useContext/UserContext';


const Shift = () => {
    // const {userDetailData} = useContext(UserContext)
  
  return (
    <>
      <div className={style.maindiv}>
        <h3>hi</h3>
        <div className={style.secondMainDiv}>
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Year</th>
                <th>Month</th>
                <th>Date</th>
                <th>Employee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2025</td>
                <td>05</td>
                <td>25</td>
                <td>Ram</td>
                <td>edit</td>

              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      
    </>
  )
}

export default Shift
