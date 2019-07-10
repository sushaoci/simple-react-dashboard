import React, { Fragment, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.200:52674'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

function AdminTable() {
    const [admins, setAdmins] = useState({
        columns: [
            { title: 'Admin_Id', field: 'admin_id', },
            { title: 'User_Id', field: 'user_id', },
            // { title: 'Name', field: 'name' },
            { title: 'Section_Id', field: 'section_id', type: 'numeric' },
        ],
        data: []
    });

    useEffect(() => {
        // let data = {
        //     url: "/api/actors",
        //     method: "get"
        // }

        axios.post('/api/show_contentAdmin_list')
            .then(res => {
                const od = res.data.admins
                // console.log(od)
                setAdmins({ ...admins, data: od })
                // console.log(admins)

            }).catch(err => {
                console.log(err)
            })

    }, [])


    return (
        <Fragment>
            <MaterialTable
                options={{
                    pageSize: 5,
                }}
                title="Admin Table"
                columns={admins.columns}
                data={admins.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {

                                resolve();

                                const params = new URLSearchParams();
                                params.append('admin_id', newData.admin_id);
                                params.append('selected_id', newData.selected_id);
                                params.append('section_id', newData.section_id);
                                axios({
                                    method: 'post',
                                    url: '/api/appoint',
                                    data: params
                                }).then(res => {
                                    console.log(res.data)

                                    // 方法1
                                    // if (res.data.status) {
                                    //     const data = [...admins.data];
                                    //     data.push(newData);
                                    //     setAdmins({ ...admins, data });
                                    // }
                                });

                                // 方法2
                                axios.post('/api/show_contentAdmin_list')
                                    .then(res => {
                                        const od = res.data.admins
                                        // console.log(od)
                                        setAdmins({ ...admins, data: od })
                                        // console.log(admins)

                                    }).catch(err => {
                                        console.log(err)
                                    })

                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...admins.data];
                                data.splice(data.indexOf(oldData), 1);
                                setAdmins({ ...admins, data });

                                // axios.post('/api/admins', {
                                //     id: newData.id, 
                                //     name: newData.name, 
                                //     department: newData.department
                                // })
                                //     .then(res => {
                                //         // console.log(props.title)
                                //         // console.log(props.content)
                                //     }).catch(err => {
                                //         console.log(err)
                                //     }
                                const params = new URLSearchParams();
                                params.append('contentAdmin_id', oldData.admin_id);
                                axios({
                                    method: 'post',
                                    url: '/api/delete_contentAdmin',
                                    data: params
                                }).then(res => {
                                    console.log(res.data)
                                });

                            }, 600);
                        }),
                }}
            />
            {/* <button onClick={f()}>click</button> */}
        </Fragment>
    )
}

export default AdminTable
