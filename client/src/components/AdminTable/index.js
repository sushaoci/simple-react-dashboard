import React, { Fragment, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

function AdminTable() {
    const [admins, setAdmins] = useState({
        columns: [
            { title: 'ID', field: 'id', type: 'numeric' },
            { title: 'Name', field: 'name' },
            { title: 'Department', field: 'department' },
        ],
        data: []
    });

    useEffect(() => {
        // let data = {
        //     url: "/api/actors",
        //     method: "get"
        // }

        axios.get('/api/admins')
            .then(res => {
                const od = res.data
                setAdmins({...admins, data:od})

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
                                const data = [...admins.data];
                                data.push(newData);
                                setAdmins({ ...admins, data });

                                axios.post('/api/admins', {
                                    id: newData.id, 
                                    name: newData.name, 
                                    department: newData.department
                                })
                                    .then(res => {
                                        // console.log(props.title)
                                        // console.log(props.content)
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
                                //     })

                            }, 600);
                        }),
                }}
            />
            {/* <button onClick={f()}>click</button> */}
        </Fragment>
    )
}

export default AdminTable
