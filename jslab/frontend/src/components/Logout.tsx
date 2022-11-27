import React, {useState} from "react";

export function Logout() {
    localStorage.removeItem('key')
    window.location.href = '/recipes'
    return (
        <div>
        </div>
    )
}