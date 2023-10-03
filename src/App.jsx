import './App.css'

function App() {
  return (
    <div className='container'>

      <div className='principal'>
        <div className='cityant-div'>
          <a href="">&lt;</a>
        </div>

        <div className='weather-div'>
          <h1>Canoinhas - SC</h1>
          <div className='data-div'>
            <h3>Data: </h3>
            <h3>02/10/2023</h3>
          </div>
          <div className='temp-div'>
            <p>Temperatura: </p>
            <p>17graus</p>
          </div>
          <div className='dianoite-div'>
            <p>Noite</p>
            <p> | </p>
            <p>Chuvas esparsas</p>
          </div>
          <div className='humidade-div'>
            <p>Humidade: </p>
            <p>100%</p>
          </div>
          <div className='chuva-div'>
            <p>Probab. Chuva: </p>
            <p>85%</p>
          </div>
          <div className='raiarpor-div'>
            <p>Raiar do Sol: </p>
            <p>06:02 am</p>
            <p> | </p>
            <p>Por do Sol: </p>
            <p>06:02 pm</p>
          </div>
          <div className='faselua-div'>
            <p>Fase da Lua:</p>
            <p>Full</p>
          </div>
          <div className='criacao-div'>
            <p>Dia e Hora de atualização: </p>
            <p>2023-10-01T20:37:52</p>
          </div>
        </div>

        <div className="proxcity-div">
          <a href="">&gt;</a>
        </div>
      </div>
      

      <div className='pesquisa-div'>
        <form>
          <div className='formblock-div'>
            <label>*Data de Pesquisa</label>
            <input type='date'/>
          </div>
          <div className='formblock-div'> 
            <label>Hora Inicial</label>
            <input type='time'/>
          </div>
          <div className="formblock-div"> 
            <label>Hora Final</label>
            <input type='time'/>
          </div>
          <div>
            <button>Pesquisar</button>
          </div>
        </form>
      </div>

      <div className='table-div'>
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
          <tr>
            <td>02/10/2023</td>
            <td>17graus</td>
            <td>100%</td>
            <td>23%</td>
            <td>Chuva</td>
            <td>06:03 am</td>
            <td>06:04 pm</td>
            <td>Cheia</td>
          </tr>
          <tr>
            <td>02/10/2023</td>
            <td>17graus</td>
            <td>100%</td>
            <td>23%</td>
            <td>Chuva</td>
            <td>06:03 am</td>
            <td>06:04 pm</td>
            <td>Cheia</td>
          </tr>
          <tr>
            <td>02/10/2023</td>
            <td>17graus</td>
            <td>100%</td>
            <td>23%</td>
            <td>Chuva</td>
            <td>06:03 am</td>
            <td>06:04 pm</td>
            <td>Cheia</td>
          </tr>
          <tr>
            <td>02/10/2023</td>
            <td>17graus</td>
            <td>100%</td>
            <td>23%</td>
            <td>Chuva</td>
            <td>06:03 am</td>
            <td>06:04 pm</td>
            <td>Cheia</td>
          </tr>
        </table>
      </div>

      <div className='navtable-div'>
        <nav>
          <ul>
            <li>Anterior</li>
            <li>1</li>
            <li>Proxima</li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default App
