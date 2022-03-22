import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux'
import { postLoginUser } from '../../state/actions';
import './index.css';

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.user)
    
    useEffect(()=> {
        console.log("useEffect");
        if(user.name!== undefined){
            navigate(`/chat/${user.name}`)
        }
    },[user, navigate])

    const responseGoogle = async(response) => {
        await dispatch(postLoginUser(response));
      }

    return (
        <div className="home">
            <div className='home__avatar'>
                <img src="/assets/logo.jpeg" alt = "logo" className="home__avatar-logo" />
                <h1>Clear with Alice</h1>
            </div>
            <div className='home__login'>
                <p>Talk to Alice, your mirror representative, and get your thoughts cleared.</p>
                <div className='google'>
                <GoogleLogin
                clientId="1018758315213-slq5oai5qfraltv0nsi8qt7ovb1etfkm.apps.googleusercontent.com"
                buttonText="Join with with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}/>
                </div>
            </div>
        </div>
    )
}

export default Home