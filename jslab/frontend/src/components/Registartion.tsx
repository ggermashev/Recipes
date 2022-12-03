import React, {useState} from "react";
import './css/Registartion.css';
import { SHA256, enc } from 'crypto-js';


function hashCode(str: string) {
    const password = SHA256(str).toString(enc.Hex);
    return password
}


async function addUser(name: string, surname: string, login: string, password: string, nickname: string) {
    const response = await fetch("/api/users/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            login: login,
            password: hashCode(password),
            nickname: nickname
        })
    })
    const json = await response.json()
    return json
}


export function Registartion() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col col-12">
                    <h1>Форма регистарции пользователя</h1>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                addUser(name, surname, login, password, nickname).then(
                    value => {
                        window.location.href = '/login'
                    }
                )
            }} id="regform">
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Введите имя</label>
                        <input type="text" value={name} onChange={e => {
                            setName(e.target.value)
                        }} className="form-control" id="name"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Введите фамилию</label>
                        <input type="text" value={surname} onChange={e => {
                            setSurname(e.target.value)
                        }} className="form-control" id="surname"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Введите nickname</label>
                        <input type="text" value={nickname} onChange={e => {
                            setNickname(e.target.value)
                        }} className="form-control" id="nickname"/>
                    </div>
                </div>
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