import React, { useState, useEffect, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import axios from 'axios'

import EditInform from '../PostInform'
import InformTable from '../InformTable'

// this page allow you to 1.post an inform and 2.view informs that have been posted
// this page use two components 1.'EditInform' and 2.'InformTable'
// use two tabs to seperate these two components

axios.defaults.baseURL = 'http://192.168.1.200:52674'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}

function InformPage() {


    // define the variables and functions that can be passed to its child component

    const [informs, setInforms] = useState([])

    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')

    const handleTitle = (props) => {
        setNewTitle(props)
    }
    const handleContent = (props) => {
        setNewContent(props)
    }
    const clearTitle = () => {
        setNewTitle('')
    }
    const clearContent = () => {
        setNewContent('')
    }

    //debug
    const handleInforms = (props) => {
        setInforms(props)
    }


    useEffect(() => {

        // get data from backend

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
            console.log('total')
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
                        // debug
                        handleInforms={handleInforms}
                    />
                </TabPane>
            </Tabs>
        </Fragment>
    )
}


export default InformPage
