import { useState } from "react";
import "./App.css";
import apiFetch from "./axios/config";
import { useEffect } from "react";

function App() {
  const [currentIdCity, setCurrentIdCity] = useState(1)//ID DA CIDADE

  const [temp, setTemp] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [currently, setCurrently] = useState();
  const [humidity, setHumidity] = useState();
  const [rain, setRain] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [moonphase, setMoonphase] = useState();
  const [createAt, setCreateAt] = useState();
  const [cityName, setCityName] = useState();

  const [weathers, setWeathers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [firstPage, setFirstPage] = useState();
  const [lastPage, setLastPage] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const atualizarWeather = async () => {
    try {
      const response = await apiFetch.get(`weather/${currentIdCity}/atualizado`);
      const data = response.data;

      setTemp(data.temp);
      setDate(data.date);
      setDescription(data.description);
      setCurrently(data.currently);
      setHumidity(data.humidity);
      setRain(data.rain);
      setSunrise(data.sunrise);
      setSunset(data.sunset);
      setMoonphase(data.moonPhase);
      setCreateAt(data.createAt);
      setCityName(data.city.name);
    } catch (error) {
      console.log(error);
    }
  };

  const weatherAnteriores = async (startDate, endDate, page) => {
    try {
      let url = `/weather/${currentIdCity}/anteriores?page=${page}`;

      if (startDate) {
        const date = new Date(startDate)
        const formattedDate = date.toISOString().replace("Z", "")
        url += `&startDate=${formattedDate}`;
      }

      if (endDate) {
        const date = new Date(endDate)
        const formattedDate = date.toISOString().replace("Z", "")
        url += `&endDate=${formattedDate}`;
      }
      const response = await apiFetch.get(url);
      const data = response.data;

      setWeathers(data.content);
      setTotalPages(data.totalPages);
      setPageNumber(data.pageable.pageNumber);
      setFirstPage(data.first);
      setLastPage(data.last);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(0)
    weatherAnteriores(startDate, endDate, 0)
}

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      weatherAnteriores(startDate, endDate, currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      weatherAnteriores(startDate, endDate, currentPage + 1);
    }
  };

  const goToPreviousCity = () => {
    if (currentIdCity === 1) {
      setCurrentIdCity(4);
    }else{
      setCurrentIdCity(currentIdCity-1)
    }
    atualizarWeather()
    weatherAnteriores(startDate, endDate, 0)
  };

  const goToNextCity = () => {
    if (currentIdCity === 4) {
      setCurrentIdCity(1);
    }else{
      setCurrentIdCity(currentIdCity+1)
    }
    atualizarWeather()
    weatherAnteriores(startDate, endDate, 0)
  };

  useEffect(() => {
    atualizarWeather();
    weatherAnteriores();

    const intervalo = setInterval(() => {
      atualizarWeather();
    }, 15000);

    return () => {
      clearInterval(intervalo);
    };
  }, [currentIdCity]);

  return (
    <div className="container">
      <div className="principal">
        <div className="cityant-div">
          <a onClick={goToPreviousCity}>&lt;</a>
        </div>

        <div className="weather-div">
          <h1>{cityName}</h1>
          <div className="data-div">
            <h3>Data: </h3>
            <h3>{date}</h3>
          </div>
          <div className="temp-div">
            <p>Temperatura: </p>
            <p>{temp}°C</p>
          </div>
          <div className="dianoite-div">
            <p>{currently}</p>
            <p> | </p>
            <p>{description}</p>
          </div>
          <div className="humidade-div">
            <p>Humidade: </p>
            <p>{humidity}%</p>
          </div>
          <div className="chuva-div">
            <p>Probab. Chuva: </p>
            <p>{rain * 100}%</p>
          </div>
          <div className="raiarpor-div">
            <p>Raiar do Sol: </p>
            <p>{sunrise}</p>
            <p> | </p>
            <p>Por do Sol: </p>
            <p>{sunset}</p>
          </div>
          <div className="faselua-div">
            <p>Fase da Lua:</p>
            <p>{moonphase}</p>
          </div>
          <div className="criacao-div">
            <p>Dia e Hora da ultima atualização: </p>
            <p>{createAt}</p>
          </div>
        </div>

        <div className="proxcity-div">
          <a onClick={goToNextCity}>&gt;</a>
        </div>
      </div>

      <div className="pesquisa-div">
        <form onSubmit={handleSubmit}>
          <div className="formblock-div">
            <label>*Data Inicial de Pesquisa</label>
            <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)}/>
          </div>
          <div className="formblock-div">
            <label>*Data Final de Pesquisa</label>
            <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)}/>
          </div>
          <div>
            <button type="submit">Pesquisar</button>
          </div>
        </form>
      </div>

      <div className="table-div">
        <table>
          <tr>
            <th>Data</th>
            <th>Temperatura</th>
            <th>Humidade</th>
            <th>Prob. Chuva</th>
            <th>Situação</th>
            <th>Raiar do Sol</th>
            <th>Por do Sol</th>
            <th>Fase da Lua</th>
          </tr>
          {weathers.length === 0 ? (
            <tr>
              <td>Sem dados anteriores</td>
            </tr>
          ) : (
            weathers.map((weather) => (
              <tr key={weather.id}>
                <td>{weather.date}</td>
                <td>{weather.temp}°C</td>
                <td>{weather.humidity}%</td>
                <td>{weather.rain * 100}%</td>
                <td>{weather.description}</td>
                <td>{weather.sunrise}</td>
                <td>{weather.sunset}</td>
                <td>{weather.moonPhase}</td>
              </tr>
            ))
          )}
        </table>
      </div>

      <div className="navtable-div">
        <nav>
          {totalPages === 0 ? null : (
            <ul>
              {firstPage === true ? (
                <li>
                  <a className="afalse">Previous</a>
                </li>
              ) : (
                <li>
                  <a onClick={goToPreviousPage}>Previous</a>
                </li>
              )}
              <li>
                <a href="#">{pageNumber + 1}</a>
              </li>
              {lastPage === true ? (
                <li>
                  <a className="afalse">Next</a>
                </li>
              ) : (
                <li>
                  <a onClick={goToNextPage}>Next</a>
                </li>
              )}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default App;
