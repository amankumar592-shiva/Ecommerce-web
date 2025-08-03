import React from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/layout'


const Users = () => {
  return (
    <Layout>
        <div className="container-fluid p-0">
        <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75'>
                    <h1>Users:</h1>
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users;