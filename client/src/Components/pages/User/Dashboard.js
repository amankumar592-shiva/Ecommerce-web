import React from 'react'
import UserMenu from '../../Layout/UserMenu'
import Layout from '../../Layout/layout'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
      const[auth,setAuth] = useAuth();

  return (
    <Layout>
        <div className="container-fluid">
        <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75'>
                    <h1>User Name: {auth.user.name}</h1>
                    <h1>user Email: {auth.user.email}</h1>
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard;