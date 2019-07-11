import React from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';

// get data from its parent component and show the information

function InformTable(props) {

  return (
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
          <List.Item
            extra={item.time}
          >
            <List.Item.Meta
              title={item.title}
              description={item.content}
            />
          </List.Item>
        )}
      />
  )
}

export default InformTable
