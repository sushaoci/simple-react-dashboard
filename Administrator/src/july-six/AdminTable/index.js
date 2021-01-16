import React, { Fragment, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

// this page allow you to appoint a administor and turn a administor to a common user

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

        axios.post('/api/show_contentAdmin_list')
            .then(res => {
                const od = res.data.admins
                // console.log(od)
                setAdmins({ ...admins, data: od })
                // console.log(admins.data)
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
                                params.append('selected_id', newData.user_id);
                                params.append('section_id', newData.section_id);
                                axios({
                                    method: 'post',
                                    url: '/api/appoint',
                                    data: params
                                }).then(res => {
                                    return (res.status)
                                }).then((status) => {
                                    // console.log('>>>')
                                    // console.log(status)

                                    if (status === 200) {
                                        //debug
                                        axios({
                                            method: 'post',
                                            url: '/api/show_contentAdmin_list',
                                        }).then(res => {
                                            const od = res.data.admins
                                            setAdmins({ ...admins, data: od })
                                            console.log('res')
                                            console.log(res.data)
                                            console.log('admins')
                                            console.log(admins.data)
                                        })
                                    }
                                }
                                );

                            }, 600);
                        }),

                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();

                                const params = new URLSearchParams();
                                params.append('contentAdmin_id', oldData.admin_id);
                                axios({
                                    method: 'post',
                                    url: '/api/delete_contentAdmin',
                                    data: params
                                }).then(res => {
                                    return res.status;
                                }).then((status)=>{
                                    if (status === 200) {
                                        //debug
                                        axios({
                                            method: 'post',
                                            url: '/api/show_contentAdmin_list',
                                        }).then(res => {
                                            const od = res.data.admins
                                            setAdmins({ ...admins, data: od })
                                        })
                                    }
                                })

                            }, 600);
                        }),
                }}
            />
        </Fragment>
    )
}

export default AdminTable
