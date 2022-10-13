import React, {useEffect, useState} from 'react';
import './App.css';
import {db} from "./db";

function App() {

  interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: any,
    phone: string,
    website: string,
    company: any,
  }

  const [data, setData] = useState([])
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [input, setInput] = useState('')

  useEffect(() => {
  let users = db.getUsers(page)
  users.then(data => setData(data))
  },[])


  async function sortBy(param: string, order: string, page: number) {
    let sortedArr = db.sortBy(param, order, page)
    sortedArr.then(data => setData(data))

    if (order === 'asc') setOrder('desc')
    else setOrder('asc')
  }

  async function search(query: string) {
    let searchArr = db.search(query)
    searchArr.then(data => setData(data))
  }


  return (
    <div className="App">
      <div className="search">
        <input type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => search(input)}>Search</button>
      </div>
      <table className='table'>
        <tbody>
          <tr>
            <th onClick={() => sortBy('name', order, page)}>Name</th>
            <th onClick={() => sortBy('username', order, page)}>Username</th>
            <th onClick={() => sortBy('address', order, page)}>address</th>
            <th onClick={() => sortBy('email', order, page)}>email</th>
            <th onClick={() => sortBy('company', order, page)}>company</th>
            <th onClick={() => sortBy('phone', order, page)}>phone</th>
            <th onClick={() => sortBy('website', order, page)}>website</th>
          </tr>
          {data && data.map((item: IUser) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.address.street}</td>
                <td>{item.email}</td>
                <td>{item.company.name}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="button-wrapper">
        <button onClick={() => setPage((prev) => {
          return prev - 1 < 1 ? 1 : prev - 1
        })}>Prev</button>
        <span>{page}</span>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
