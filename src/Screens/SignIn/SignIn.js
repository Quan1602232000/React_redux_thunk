import React, { useState, useEffect } from 'react'
import './SignIn.css'
import { SignInApp } from '../../actions/UserActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo } = userSignIn
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo) {
            history.push('/Todolist')
        }
    }, [userInfo])
    const handelSubmitSignin = () => {
        if (username == 'admin' || password == 'admin') {
            dispatch(SignInApp(username, password))
        } else {
            alert('username hoặc mật khẩu không đúng')
        }
    }
    return (
        <div className="signin_Page">
            <div className="signin_Page__Title">
                <p>
                    Organize <br></br>
                    it all <br></br>
                    with Todo
                </p>
            </div>
            <div className="signin_Page__Form">
                <p className="signin_Page__Form--Title">SIGN IN NOW</p>
                <form onSubmit={handelSubmitSignin} className="signin_Page__Form--Detail">
                    <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="signin_Page__Form--Detail--input" type="text"></input>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="signin_Page__Form--Detail--input" type="password"></input>
                    <button type="submit" className="signin_Page__Form--Detail--button">Sign In</button>
                </form>
            </div>
        </div>
    )
}
