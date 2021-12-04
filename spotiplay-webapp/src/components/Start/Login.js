const Login = (props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1/3 bg-white shadow-md px-8 pt-6 pb-16">
                <div className="mb-12 text-center font-bold text-2xl">
                    Spotiplay
                </div>
                <form onSubmit={(e) => {e.preventDefault(); props.logIn()}}>
                    <div className="mb-6">
                        <label className="font-bold">
                        Email *
                        </label>
                        <input autoFocus onChange={e => props.setEmail(e.target.value)} name="email" type="text" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold">
                        Password *
                        </label>
                        <input onChange={e => props.setPassword(e.target.value)} name="password" type="password" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                </form>
                    <div className="flow-root">
                        <button className="float-left font-bold text-green-800 text-sm" onClick={() => props.navigation('/register')}>
                            New user?
                        </button>
                        <button className="float-right bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" 
                                disabled={props.loading}   
                                onClick={() => {props.logIn()}}>
                            Sign in</button>
                    </div>
                    <div> hej {props.error.passwordError}</div>
            {/*<div>
                {props.error}
            </div>
            </div>
            <input placeholder="Email..." onChange={(e) => setLoginEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e) => setLoginPassword(e.target.value)}/>
                <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/about')}>About</button>*/}
            </div>
            <button className="p-2 text-sm font-bold text-gray-700" onClick={() => props.navigation('/about')}>
                About
            </button>
        </div>
    )
}
export default Login