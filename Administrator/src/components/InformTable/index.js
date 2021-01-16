import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },

// ];

function InformTable(props) {

  return (
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
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
