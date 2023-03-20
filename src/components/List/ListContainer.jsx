import React, { useEffect, useState } from 'react';
import List from './List';

const ListContainer = () => {
    const [listDB, setListDB] = useState([]);
    const [filteredList, setFilteredList] = useState([])
    const [sortedList, setSortedList] = useState([]);
    const [filterNameInput, setfilterNameInput] = useState("")
    const [filterEmailInput, setfilterEmailInput] = useState("")
    const [filterUsernameInput, setfilterUsernameInput] = useState("")
    const [isListLoaded, setIsListLoaded] = useState(false);

    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setListDB(data))
            .then(() => setIsListLoaded(true))
            .catch(err => console.log(err))
    }

    const filterDB = () => {    
        const filter = listDB.filter( user => (
                user.name.toLowerCase().includes(filterNameInput.toLowerCase()) &
                user.username.toLowerCase().includes(filterUsernameInput.toLowerCase()) &
                user.email.toLowerCase().includes(filterEmailInput.toLowerCase())
            ))
        setFilteredList([...filter])
    }

    const sortDB = ( sortType = 0, sortField = undefined) => {
        const sort = sortField ? 
            sortField === 'name' ? sortByName(sortType) :
            sortField === 'username' ? sortByUsername(sortType) :
            sortField === 'email' ? sortByEmail(sortType) :
            filteredList : filteredList
        
        setSortedList([...sort])
    }

    const sortByName = ( sortType = 0 ) => {
        const sort = sortType === 1 ? filteredList.sort((a,b) => {
                if (a.name > b.name) {
                    return 1;
                  }
                  if (a.name < b.name) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : sortType === 2 ? filteredList.sort((a,b) => {
                if (a.name < b.name) {
                    return 1;
                  }
                  if (a.name > b.name) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : filteredList.sort((a,b) => {
                if (a.id > b.id) {
                    return 1;
                  }
                  if (a.id < b.id) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });

        return sort;
    }
    const sortByUsername = ( sortType = 0 ) => {
        const sort = sortType === 1 ? filteredList.sort((a,b) => {
                if (a.username > b.username) {
                    return 1;
                  }
                  if (a.username < b.username) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : sortType === 2 ? filteredList.sort((a,b) => {
                if (a.username < b.username) {
                    return 1;
                  }
                  if (a.username > b.username) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : filteredList.sort((a,b) => {
                if (a.id > b.id) {
                    return 1;
                  }
                  if (a.id < b.id) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });

        return sort;
    }
    const sortByEmail = ( sortType = 0 ) => {
        const sort = sortType === 1 ? filteredList.sort((a,b) => {
                if (a.email > b.email) {
                    return 1;
                  }
                  if (a.email < b.email) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : sortType === 2 ? filteredList.sort((a,b) => {
                if (a.email < b.email) {
                    return 1;
                  }
                  if (a.email > b.email) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            }) : filteredList.sort((a,b) => {
                if (a.id > b.id) {
                    return 1;
                  }
                  if (a.id < b.id) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });

        return sort;
    }
    
    const handleButton = (button, sortField) => {
        button.value++
        if (button.value > 2) {
            button.value = 0
        }
        sortDB(parseInt(button.value), sortField)
        button.innerHTML = button.value == 0 ? '=' : button.value == 1 ? '&darr;' : button.value == 2 && '&uarr;';
    }

    useEffect(
        () => {
            setListDB([]);
            setFilteredList([])
            setSortedList([])
            setfilterNameInput("")
            setfilterEmailInput("")
            setfilterUsernameInput("")
            setIsListLoaded(false);
            getData()
        },[]
    )

    useEffect(
        () => {
            filterDB()
        },[listDB, filterEmailInput, filterNameInput, filterUsernameInput, ]
    )

    useEffect(
        () => {
            sortDB()
        }, [filteredList,]
    )

    return (<>
        <div className='search'>
            <input type="text" placeholder='Filter by Name' onChange={e => setfilterNameInput(e.target.value)} />
            <input type="text" placeholder='Filter by Username' onChange={e => setfilterUsernameInput(e.target.value)} />
            <input type="text" placeholder='Filter by Email' onChange={e => setfilterEmailInput(e.target.value)} />
        </div>
        <table className='list'>
            <thead className='list-header'>
                <tr className='list-row'>
                    <td>Name <button value={0} onClick={e => handleButton(e.target, 'name')}>=</button></td>
                    <td>Username <button value={0} onClick={e => handleButton(e.target, 'username')}>=</button></td>
                    <td>Email <button value={0} onClick={e => handleButton(e.target, 'email')}>=</button></td>
                    <td>Address</td>
                    <td>Phone</td>
                    <td>Website</td>
                    <td>Company</td>
                </tr>
            </thead>
            <tbody>
                {isListLoaded ? sortedList.map( (user, i) => (
                    <List {...user} key={i} />
                )) : <tr><td>List Loading...</td></tr>}
            </tbody>
      </table>
    </>);
}
 
export default ListContainer;