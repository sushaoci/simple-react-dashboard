import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.43.114:52674'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

function InfoTable() {
  const [infos, setInfos] = useState({
    columns: [
      { title: 'User_id', field: 'user_id', editable: "never" },
      { title: 'Name', field: 'name', editable: "never" },
      { title: 'Department', field: 'school' },
    ],
    data: []
  });

  useEffect(() => {
    // let data = {
    //     url: "/api/actors",
    //     method: "get"
    // }

    axios.get('/api/show_user_profile_for_superAdmin')
      .then(res => {
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
      title="修改用户信息"
      columns={infos.columns}
      data={infos.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                // console.log(oldData)
                // console.log(newData)
                const data = infos.data;
                const index = data.indexOf(oldData);
                data[index] = newData;
                setInfos({ ...infos, data }, () => resolve());
                resolve()


                const params = new URLSearchParams();
                params.append('user_id', data[index].user_id);
                params.append('school', data[index].school);
                axios({
                  method: 'post',
                  url: '/api/modify_profile_by_super',
                  data: params
                });


                axios.get('/api/show_user_profile_for_superAdmin')
                  .then(res => {
                    const od = res.data.users
                    setInfos({ ...infos, data: od })
                    console.log("get2")
                    console.log(res.data.users)

                  }).catch(err => {
                    console.log(err)
                  })
              }
            }, 1000)
          }),
      }}
    />
  )
}

export default InfoTable
