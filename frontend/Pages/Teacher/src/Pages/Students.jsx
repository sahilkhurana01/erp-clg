import React from 'react'
import Layout from '../layout'
import Header from '../components/Header'
import ManageStudentsPage from '../components/manageStudentPage'

const Students = () => {
  return (
    <Layout>
      <Header />
      <ManageStudentsPage />
    </Layout>
  )
}

export default Students