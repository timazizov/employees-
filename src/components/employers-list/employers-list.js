import EmployersListItem from "../employers-list-item/employers-list-item";
import './employers-list.css';

const EmployersList = ({data}) => {

    const elements = data.map(item => {
        // Диструктуризация item когда мы делим его на две части: в одной id, в другой все оставшиеся
        const {id, ...itemPros} = item;
        return (
            <EmployersListItem key={id} {...itemPros}/>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;