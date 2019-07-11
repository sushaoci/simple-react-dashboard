import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import axios from 'axios'

// this page allow you to change user's information 
// specificly the 'department' of a user

axios.defaults.baseURL = 'http://192.168.1.200:52674'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

function InfoTable() {
  
  // define the columns of the info table
  const [infos, setInfos] = useState({
    columns: [
      { title: 'User_id', field: 'user_id', editable: "never" },
      { title: 'Name', field: 'name', editable: "never" },
      { title: 'Department', field: 'school' },
    ],
    data: []
  });

  useEffect(() => {
    const params = new URLSearchParams();
    axios({
      method: 'post',
      url: '/api/show_user_profile_for_superAdmin',
      data:params
    }).then(res => {
      const od = res.data.users
      setInfos({ ...infos, data: od })
      console.log("get1")
      console.log(res.data.users)

    }).catch(err => {
      console.log(err)
    })

  }, [])

  return (
    <MaterialTable
      options={{
        pageSize: 10,
      }}
      title="Edit Information"
      columns={infos.columns}
      data={infos.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                resolve()

                const params = new URLSearchParams();
                params.append('user_id', newData.user_id);
                params.append('school', newData.school);
                axios({
                  method: 'post',
                  url: '/api/modify_profile_by_super',
                  data: params
                }).then(res=>{
                    return (res.status)
                }).then((status)=>{
                    if (status === 200) {
                        //debug
                        axios({
                            method: 'post',
                            url: '/api/show_user_profile_for_superAdmin',
                          }).then(res => {
                            const od = res.data.users
                            setInfos({ ...infos, data: od })
          
                          }).catch(err => {
                            console.log(err)
                          })
                    }
                })      
              }
            }, 600)
          }),
      }}
    />
  )
}

export default InfoTable
