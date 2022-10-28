import './App.css';
// import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {



  return (
    <div className="container">
      <Search />
      {/* <CurrentWeather /> */}
      {/* {currentWeather && <CurrentWeather data={currentWeather} />} */}

    </div>
  );
}

export default App;
