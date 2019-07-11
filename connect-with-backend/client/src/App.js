import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//master
// import InformPage from './components/InformPage'
// import AdminTable from './components/AdminTable'
// import EditInfo from './components/EditInfo'

//debug
// import InformPage from './july-six/InformPage'
// import AdminTable from './july-six/TableIssue'
// import EditInfo from './july-six/EditInfo'

// compose
import Page1 from './compose/Page1'
import Page2 from './compose/Page2'
import Page3 from './compose/Page3'

function App() {
  return (
    <Router>
      <div>
        {/* top & side */}
        {/* <Route exact path='/' component={EmpPage} /> */}

        {/* master */}
        {/* <Route exact path='/' component={InformPage} />
        <Route exact path='/ad' component={AdminTable} />
        <Route exact path='/info' component={EditInfo} /> */}

        {/* debug */}
        <Route exact path='/' component={Page1} />
        <Route exact path='/admin' component={Page2} />
        <Route exact path='/info' component={Page3} />

        {/* server */}
        {/* <Route exact path='/fetch' component={FetchData} /> */}

        {/* layout */}
        {/* <Route exact path='/layout' component={MyLayout} /> */}
      </div>
    </Router>
  );
}

export default App;