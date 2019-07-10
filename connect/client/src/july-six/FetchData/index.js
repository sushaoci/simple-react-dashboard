import React, { useState, useEffect } from 'react'
import axios from 'axios'

function FetchData() {

    // useEffect(() => {
    //     // let data = {
    //     //     url: "/api/actors",
    //     //     method: "get"
    //     // }

    //     axios.get('/api/cps')
    //     .then(res =>{
    //         setCps(res.data)
    //         console.log(res)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    const [cps, setCps] = useState([])
    const [infos, setInfos] = useState([])

    return (
        <div>
            helloworld
            {/* <p>{cps}</p> */}

            <form>
                <input value={cps}
                    onChange={(e) => setCps(e.target.value)}></input>

                <input value={infos}
                    onChange={(e) => setInfos(e.target.value)}></input>

                <button onClick={(e) => {
                    e.preventDefault()

                    axios.post('/api/cps', { name: cps, info:infos })
                        .then(res => console.log(res))
                }}>submit</button>
            </form>
        </div>
    )
}

export default FetchData
