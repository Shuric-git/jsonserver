import React, {useEffect, useState} from 'react';
import './App.css';
import {db} from "./db";
import NextBtn from "./NextBtn/NextBtn";
import PrevBtn from "./PrevBtn/PrevBtn";
import {IUser, ISort, IOrder} from "./interfaces";

function App() {

  const headers: string[] = ['name', 'username', 'city', 'email', 'company', 'phone', 'website']

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('')
  const [input, setInput] = useState('');
  const [sort, setSort] = useState<ISort>({option: 'name', order: {
      'name': 'asc',
      'username': 'asc',
      'city': 'asc',
      'email': 'asc',
      'company': 'asc',
      'phone': 'asc',
      'website': 'asc',
    }});
  const [maximumPage, setMaximumPage] = useState(0);

  useEffect(() => {
    loadUsers((page - 1) * 4, page * 4, sort, searchValue);
    db.getAllUsers()
      .then(data => setMaximumPage(Math.ceil(data.length / 4)))
  }, [page, sort, searchValue])

  function loadUsers(start: number, end: number, sort: ISort, searchValue: string) {
    db.getUsers(start, end, sort, searchValue)
    .then(data => setData(data));
  }

  function sorter(start: number, end: number, sort: {option: string, order: IOrder}, sortOption: keyof IOrder, searchValue: string) {
    loadUsers((page - 1) * 4, page * 4, sort, searchValue)
    let newOrder: IOrder = {...sort.order}
    newOrder[sortOption] = sort['order'][sortOption] === 'asc' ? sort['order'][sortOption] = 'desc' : sort['order'][sortOption] = 'asc'
    setSort((prev) => ({...prev, order: newOrder, option: sortOption}))
  }

  async function search(query: string) {
    setSearchValue(query);
    setInput('');
  }

  function pageRenderer() {
    if (data.length < 4 && page === 1) return null
    if (page === 1) {
      return (
        <>
          <PrevBtn disable={true} decPage={setPage} />
          <span>{page}</span>
          <NextBtn disable={false} incPage={setPage}/>

        </>)
    } else if (page === maximumPage) {
      return (
        <>
          <PrevBtn disable={false} decPage={setPage} />
          <span>{page}</span>
          <NextBtn disable={true} incPage={setPage}/>
        </>
      )
    } else {
      return (
        <>
          <PrevBtn disable={false} decPage={setPage} />
          <span>{page}</span>
          <NextBtn disable={false} incPage={setPage}/>
        </>
      )
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
        />
        <button className='searchBtn' onClick={() => search(input)}>Search</button>
        <button className='clearBtn' onClick={() => {
          setSearchValue('')
          setInput('');
        }}>Clear</button>
      </div>
      <table className='table'>
        <tbody>
          <tr>
            <>
              {
                headers.map((item: any) => {
                  return (
                    <th
                      key={item}
                      onClick={() => sorter((page - 1) * 4, page * 4, sort, item, searchValue)}
                    >{item}</th>
                  )
                })
              }
            </>
          </tr>
          {data.length ? data.map((item: IUser) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.city}</td>
                <td>{item.email}</td>
                <td>{item.company}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
              </tr>
            )
          })
          :
          <tr style={{height: '300px'}}><td>Loading users</td></tr>
          }
        </tbody>
      </table>
      <div className="button-wrapper">
        {pageRenderer()}
      </div>
    </div>
  );
}

export default App;
