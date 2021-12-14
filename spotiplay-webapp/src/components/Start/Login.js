import { BouncingBalls } from 'react-cssfx-loading'
import { BsMusicPlayer } from 'react-icons/bs'
const Login = (props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-black bg-gradient-to-t from-gray-900 to-black">
            <BsMusicPlayer style={{color:'white'}}size={40}/>
            <div className="bg-white shadow-md px-8 pt-6 pb-16 rounded-xl pt-8 pb-8 rounded-xl bg-gradient-to-t from-green-900 to-black-300 md:w-1/3">
                <div className="mb-1 text-center text-white font-bold text-2xl md:mb-12">
                    Spotiplay
                </div>
                <form onSubmit={(e) => {e.preventDefault(); props.logIn()}}>
                    <div className="mb-6">
                        <label className="font-bold text-white">
                        Email *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic">{props.error.emailError}</p>
                        <input style={{border: props.error.emailError ? "2px solid #FF0000" : "", borderRadius: "3px"}} autoFocus onChange={e => props.setEmail(e.target.value)} name="email" type="text" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold text-white">
                        Password *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic">{props.error.passwordError}</p>
                        <input style={{border: props.error.passwordError ? "2px solid #FF0000" : "", borderRadius: "3px"}} onChange={e => props.setPassword(e.target.value)} name="password" type="password" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                </form>
                    <div className="flow-root">
                        <button className="float-left bg-green-800 shadow rounded p-2 font-bold text-xs text-white hover:bg-green-900" onClick={() => props.navigation('/register')}>
                            New user?
                        </button>
                        {props.loading ? <div className="mx-5 my-1"><BouncingBalls color="#000000" className="float-right font-bold rounded"/></div> : <button className="float-right bg-green-800 hover:bov-green-900 text-white text-xs font-bold py-2 px-4 rounded" 
                                disabled={props.loading}   
                                onClick={() => {props.logIn()}}>
                            Sign in</button>}
                         
                    </div>
            </div>
            <button className="p-2 text-xs bg-green-700 mt-4 rounded font-bold text-white hover:text-black hover:bg-green-900" onClick={() => props.navigation('/about')}>
                About
            </button>
        </div>
    )
}
export default Login