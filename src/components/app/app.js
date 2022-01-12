import AppInfo from '../app-info/app-info';
import { Component } from 'react';

import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Timur A.', salary: 800, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, rise: true, id: 2},
                {name: 'Carl S.', salary: 15000, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxid = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    createEmployer = (name, salary) => {
        const employer = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxid++
        }
        this.setState(({data}) => {
            const newArr = [...data, employer];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // Первый способ

        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id == id);

        //     const oldElem = data[index];
        //     const newItem = {...oldElem, increase: !oldElem.increase}
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data: newArr
        //     }
        // })

        // Второй способ
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render() {
        const employees = this.state.data.length;
        const increased_employees = this.state.data.filter(item => item.increase).length;

        console.log(this.maxid);
        const {data, term, filter} = this.state

        // Объединение двух функций в одну строчку, в данном случае наши данные проходят две фильтрации
        const visibleData = this.filterPost(this.searchEmp(data, tenpxrm), filter);
        return (
            <div className="app">
                <AppInfo employees={employees} increased_employees={increased_employees}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp= {this.onToggleProp}/>
                <EmployersAddForm createEmployer={this.createEmployer}/>
            </div>
        );
    }
}

export default App;