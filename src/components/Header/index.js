import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import './index.css';
import { logOut } from "../../state/actions";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.user)

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <section className="navigation">
            <div className="nav-container">
                <div className="brand">
                    <a href="/">
                        <img src="/assets/header.jpeg" alt = "logo" className="logo" />
                    </a>
                </div>
                <nav>
                    {
                        (user.name !== undefined) ? 
                        <ul >                     
                            <li>
                                <a className="btn loggedIn" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul> :
                        <ul >                     
                        <li>
                            <a className="btn">Welcome Guest!</a>
                        </li>
                    </ul>
                    }
                </nav>
            </div>
        </section>
    )
}

export default Header