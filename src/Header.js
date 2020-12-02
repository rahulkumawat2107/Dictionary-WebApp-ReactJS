import React from "react"
import {Link} from "react-router-dom"

function Header() {

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    return(
        <nav>
            <Link style={linkStyle} to = "/">
                <h2>Dictionary</h2>
            </Link>
            <ul className="nav-links">
                <Link style={linkStyle} to = "/about">
                    <li>About</li>
                </Link>
                <li>Donate</li>
                <Link style={linkStyle} to = "/login">
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Header