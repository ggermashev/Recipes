import React, {useState} from "react";
import './css/Menu.css';


export function Menu() {
    return (
        <nav className="navbar navbar-expand bg-light">
            <div className="container-fluid">
                <a className="navbar-brand logo" href="/recipes">Рецепты</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="menu">
                        {localStorage.getItem('key') != null && <li className="nav-item"><a className="nav-link menu" href="/profile">Личный кабинет</a></li>}
                        {localStorage.getItem('key') != null && <li className="nav-item"><a className="nav-link menu" href="/list">Мой список покупок</a></li>}
                        {localStorage.getItem('key') != null && <li className="nav-item"><a className="nav-link menu" href="/favorites">Избранные</a></li>}
                        {localStorage.getItem('key') != null && <li className="nav-item"><a className="nav-link menu" href="/add_recipe">Создать рецепт</a></li>}
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-2" id="right_menu">
                        {localStorage.getItem('key') == null && <li className="nav-item"><a className="nav-link menu" href="/registration">Регистрация</a></li>}
                        {localStorage.getItem('key') == null && <li className="nav-item"><a className="nav-link menu" href="/login">Вход</a></li>}
                        {localStorage.getItem('key') != null && <li className="nav-item"><a className="nav-link menu" href="/logout">Выход</a></li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}