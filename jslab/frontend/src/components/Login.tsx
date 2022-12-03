import React, {useState} from "react";
import './css/Registartion.css';
import {enc, SHA256} from "crypto-js";


function hashCode(str: string) {
    const password = SHA256(str).toString(enc.Hex);
    return password
}

async function loginUser(login: string, password: string) {
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({login: login, password: hashCode(password)})
    })
    const json = await response.json()
    return json
}

export function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col col-12">
                    <h1>Вход на сайт</h1>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                loginUser(login, password).then(
                    value => {
                        localStorage.setItem('key', value.key)
                        console.log(localStorage.getItem('key'))
                        window.location.href = '/recipes'
                    },
                    error => {
                        alert('Неверные данные')
                    }
                )
            }} id="regform">

                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Введите логин</label>
                        <input type="text" value={login} onChange={e => {
                            setLogin(e.target.value)
                        }} className="form-control" id="log_in"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Введите пароль</label>
                        <input type="password" value={password} onChange={e => {
                            setPassword(e.target.value)
                        }} className="form-control" id="pass_word"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-3 col-md-2 col-lg-2 col-xl-2">
                        <input type="submit" className="form-control subbtn" id="regsubmit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}