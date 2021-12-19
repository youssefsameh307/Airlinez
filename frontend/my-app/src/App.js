import {BrowserRouter as Router , Route ,Routes,useParams } from 'react-router-dom';
import './App.css';
import Addflights from "./Admin/Addflight" ;
import Schedule from "./Admin/Schedule";
import AdminPage from "./Admin/AdminPage";
import MainPage from "./User/MainPage";
import MainPageLoggedIn from "./User/MainPageLoggedIn";
import Updateflight from "./Admin/Updateflight";
import Searchflight from './Admin/Searchflight';
import SearchflightUser from './User/SearchflightUser';
import Reservedflights from './User/Reservedflights';
import PlaneView from './User/PlaneView';
import ViewProfile from './User/ViewProfile';
import ViewFlightHandler from './User/viewFlightHandler';
import ViewReturnFlight from './User/ViewReturnFlight';
import Cancelflight from './Admin/Cancelflight';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './User/Logo.svg';
import {Link} from 'react-router-dom'

function App() {


  return (
    <Router>
                 <div>
            <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/user'><div style={{height:'70px',width: '100px' }}>
              <Logo />
             </div></Link>} rightLinks={<HeaderLinksLoggedIn/>} fixed/>
          </div>
      <Routes>
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/user' element={<MainPageLoggedIn/>} />
            <Route path='/user/profile/:id' element={<ViewProfile/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />
            <Route path='/searchflightuser' element={<SearchflightUser/>} />
            <Route path='/yourreservedflights/:id' element={<Reservedflights/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlightHandler />} /> */}
            <Route path='/PlaneView/:id' element={<PlaneView/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlight/>} /> */}
            <Route path='/viewreturnflight/:id' element={<ViewReturnFlight/>} />
            {/* <Route path='/searchreturnflight/:from/:to' element={<SearchReturnFlight/>} /> */}
            <Route path='/viewflight/:id/:cabinclass/:numofresseats' element={<ViewFlightHandler/>} />
            <Route path='/cancelflight' element={<Cancelflight/>} />
      </Routes>
    </Router>
  );
}

export default App;
