import { BouncingBalls } from 'react-cssfx-loading'
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
                        <p className="h-4 text-red-500 text-xs italic">{props.error.emailError}</p>
                        <input style={{border: props.error.emailError ? "2px solid #FF0000" : "", borderRadius: "3px"}} autoFocus onChange={e => props.setEmail(e.target.value)} name="email" type="text" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold">
                        Password *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic">{props.error.passwordError}</p>
                        <input style={{border: props.error.passwordError ? "2px solid #FF0000" : "", borderRadius: "3px"}} onChange={e => props.setPassword(e.target.value)} name="password" type="password" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                </form>
                    <div className="flow-root">
                        <button className="float-left font-bold text-green-800 text-sm" onClick={() => props.navigation('/register')}>
                            New user?
                        </button>
                        {props.loading ? <div className="mx-5 my-1"><BouncingBalls color="#006400" className="float-right font-bold py-3 rounded"/></div> : <button className="float-right bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" 
                                disabled={props.loading}   
                                onClick={() => {props.logIn()}}>
                            Sign in</button>}
                         
                    </div>
            </div>
            <button className="p-2 text-sm font-bold text-gray-700" onClick={() => props.navigation('/about')}>
                About
            </button>
        </div>
    )
}
export default Login