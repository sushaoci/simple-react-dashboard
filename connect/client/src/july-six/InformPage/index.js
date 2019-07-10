import React, { useState, useEffect, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import axios from 'axios'

import EditInform from '../EditInform'
import InformTable from '../InformTable'

axios.defaults.baseURL = 'http://192.168.1.200:52674'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}

function InformPage() {

    const [informs, setInforms] = useState([])

    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')

    const handleTitle = (props) => {
        setNewTitle(props)
    }
    const handleContent = (props) => {
        setNewContent(props)
    }
    const clearTitle = (props) => {
        setNewTitle('')
    }
    const clearContent = (props) => {
        setNewContent('')
    }

    useEffect(() => {
        // let data = {
        //     url: "/api/actors",
        //     method: "get"
        // }

        const params = new URLSearchParams();
        params.append('id', '00');
        params.append('section_id', '1');
        // params.append('select','01');
        params.append('content', '');
        axios({
            method: 'post',
            url: '/api/search_post',
            data: params
        }).then(res => {
            console.log(res.data)
            setInforms(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <Fragment>
            <Tabs defaultActiveKey="1" onChange={callback} size="large">
                <TabPane tab="Inform Table" key="1">
                    <InformTable
                        data={informs}
                    />
                </TabPane>
                <TabPane tab="Edit Inform" key="2" >
                    <EditInform
                        newTitle={newTitle}
                        newContent={newContent}
                        handleTitle={handleTitle}
                        handleContent={handleContent}
                        clearTitle={clearTitle}
                        clearContent={clearContent}
                    />
                </TabPane>
            </Tabs>
        </Fragment>
    )
}


export default InformPage
