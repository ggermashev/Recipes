import React from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import "./css/List.css"


interface Item {
    id: number | null,
    product: string,
    status: boolean,
    owner: string
}

function isUser() {
    const user = localStorage.getItem('key');
    if (user === null) {
        alert("Для использования списка покупок, зарегестрируйтесь")
        let reg = document.createElement('a');
        window.location.href = '/registration';
        reg.href = window.location.href;
        return '';
    } else {
    return user;
    }
}

////////////////////////////////// ВЫВОД СПИСКА ////////////////////////////////////
async function getList(user: string) {
    const request = await fetch(`/api/basket/${user}/`);
    return await request.json();
}

////////////////////////////////// УДАЛЕНИЕ ЭЛЕМЕНТА ////////////////////////////////////
async function DeleteRequest(el: Item) {
    const request = await fetch(`/api/basket/${el.owner}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({product: el.product})
    })
    return await request.json();
}

function ClickDelete(props: {el: Item, array: Item [], setArray:  React.Dispatch<React.SetStateAction<never[]>>} ) {
    DeleteRequest(props.el).then(
        value => {
            props.setArray(value);
        }
    )
}

////////////////////////////////// ИЗМЕНЕНИЕ СТАТУСА ////////////////////////////////////
async function StatusRequest(el: Item) {
    let state: string;
    el.status ? state = 'false' : state = 'true';
    const request = await fetch(`/api/basket/${el.owner}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({status: state, product: el.product})
    });
    return await request.json();
}

function StatusChange(props: {el: Item, array: Item [], setArray:  React.Dispatch<React.SetStateAction<never[]>>} ) {
    StatusRequest(props.el).then(
        value => {
            props.setArray(value);
        }
    )
}

////////////////////////// ДОБАВЛЕНИЕ ЭЛЕМЕНТА /////////////////////////
async function AddRequest(el: Item) {
    let request = await fetch(`/api/basket/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({product: el.product, status: el.status.toString(), owner: el.owner})
    });
    return await request.json();
}

function AddProduct(user: string, value: string, setInput: React.Dispatch<React.SetStateAction<string>>,
                    array: Item [], setArray:  React.Dispatch<React.SetStateAction<never[]>>) : void {

    if (value === '') {
        alert('Пожалуйста, укажите продукт')
        return;
    }
    const product = {
        id: null,
        product: value,
        status: true,
        owner: user
    }
    AddRequest(product).then(
        value => {
            setArray(value);
        }
    )
    setInput('');
}

/////////////////////////// КОМПОНЕНТ ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТА /////////////////////
export function Input(props: {user: string, array: Item [], setArray:  React.Dispatch<React.SetStateAction<never[]>>}) {
    let [input, setInput] = React.useState('')
    return (
        <form className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Добавить продукт"
                   aria-label="Recipient's username" aria-describedby="button-addon2"
                   onKeyPress={(k) => {
                       if (k.key === 'Enter') AddProduct(props.user, input, setInput, props.array, props.setArray)}
                   }
                   value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type="button" className="btn btn-outline-primary"
                    id="button-addon2"
                    onClick={() => AddProduct(props.user, input, setInput, props.array, props.setArray)}>добавить
            </button>
        </form>
    )
}

/////////////////////////// КОМПОНЕНТ ДЛЯ РЕНДЕРИНГА ЭЛЕМЕНТА /////////////////////
export function ShowElement(props: {el: Item, array: Item [], setArray:  React.Dispatch<React.SetStateAction<never[]>>}) {
    const [s, setStyle] = React.useState({
        textDecoration: 'none',
        backgroundColor: 'white'
    });
    React.useEffect(() =>
        props.el.status ? setStyle({textDecoration: 'none', backgroundColor: 'white'}) :
            setStyle({textDecoration: 'line-through', backgroundColor: '#CFCFCF'}), [props.array])
    return (
        <li className="list-group-item" onClick={() => StatusChange(props)} style={s}> {props.el.product}
            <button type="button" className="btn btn-outline-danger float-end"
                    onClick={() => ClickDelete(props)}>удалить
            </button>
            {' '}
        </li>
    )
}

////////////////////////////////// КОМПОНЕНТ КОНЧtНЫЙ ////////////////////////////////////
export function List() {
    let user = isUser();
    let [array, setArray] = React.useState([]);
    React.useEffect(() => {
        getList(user).then(
            value => {
                setArray(value);
            }
        )
    }, []);
    console.log(array);
    if (array === null || array === undefined || array.length === 0) {
        return (
            <div className="listproducts">
                <h1>Список покупок</h1>
                <Input user={user} array={array} setArray={setArray}/>
                <p className="text">В вашем списке пока нет продуктов</p>
            </div>
        )
    }
    return (
        <div className="listproducts">
            <h1>Список покупок</h1>
            <Input user={user} array={array} setArray={setArray}/>
            <ul className="list-group list-group-flush">
                {array.map(a => <ShowElement key={a['id']}
                                             el={{
                                                 id: a['id'],
                                                 product: a['product'],
                                                 status: a['status'],
                                                 owner: a['owner']
                                             }}
                                             setArray={setArray}
                                             array={array}/>)}
            </ul>
        </div>
    )
}