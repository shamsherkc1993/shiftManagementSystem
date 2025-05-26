import React from 'react'
import { UserContext } from '../useContext/UserContext';
import { useContext } from 'react';

const AddUser = () => {

  const {userDetailData} = useContext(UserContext)
  console.log(userDetailData)

  return (
    <>
      <h1>add user</h1>
    </>
  )
}

export default AddUser
