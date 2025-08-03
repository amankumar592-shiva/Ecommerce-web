import React from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/layout'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
  
  return (
    <Layout>
        <div className="container-fluid p-0">
        <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75'>
                    <h1>Admin Name: {auth.user.name}</h1>
                    <h1>Admin Email: {auth.user.email}</h1>
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard;