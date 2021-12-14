import { BsMusicPlayer } from 'react-icons/bs'
import { BouncingBalls } from 'react-cssfx-loading/lib';

const Register = (props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-black bg-gradient-to-t from-gray-900 to-black">
            <BsMusicPlayer style={{color:'white'}}size={40}/>
            <div className="bg-white shadow-md px-8 md:pt-6 md:pb-6 pb-4 rounded-xl rounded-xl bg-gradient-to-t from-green-900 to-black-300 md:w-1/3">
                <div className="mb-8 mb:mb-12 text-center text-white font-bold text-2xl">
                    Register
                </div>
                <form onSubmit={(e) => {e.preventDefault(); props.createUser()}}>
                    <div className="mb-6">
                        <label className="text-white text-sm font-bold">
                        Email *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic">{props.error.emailError}</p>
                        <input style={{border: props.error.emailError ? "2px solid #FF0000" : "", borderRadius: "3px"}} autoFocus onChange={e => props.setEmail(e.target.value)} name="email" type="text" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold text-white text-sm">
                        Password *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic">{props.error.passwordError}</p>
                        <input style={{border: props.error.passwordError ? "2px solid #FF0000" : "", borderRadius: "3px"}} onChange={e => props.setPassword1(e.target.value)} name="password1" type="password" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold text-white text-sm">
                        Re-enter password *
                        </label>
                        <p className="h-4 text-red-500 text-xs italic"></p>
                        <input style={{border: props.error.passwordError ? "2px solid #FF0000" : "", borderRadius: "3px"}} onChange={e => props.setPassword2(e.target.value)} name="password2" type="password" className="p-2 w-full shadow text-grey-500" />
                        <input type="submit" hidden></input>
                    </div>
                </form>
                    <div className="flow-root">
                        <button className="float-left text-white font-bold hover:text-red-500 text-xs" onClick={() => props.navigation('/')}>
                            Already a member?
                        </button>
                        {props.loading ? <div className="mx-5 my-1"><BouncingBalls color="#006400" className="float-right font-bold py-3 rounded"/></div> : <button className="float-right bg-green-800 hover:bg-black text-white text-xs font-bold py-2 px-4 rounded" 
                                disabled={props.loading}   
                                onClick={() => {props.createUser()}}>
                            Sign up</button>}
                    </div>
            </div>
        </div>
        /*
        <div>
            <header>
                <b>REGISTER</b>
            </header>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
            <button disabled={props.loading} onClick={() => {
                props.createUser(email, password)}
                }>Create account</button>
            <div>
                <button onClick={() => navigate('/')}>Back to login</button>
            </div>
            <div>
                {props.error}
            </div>
        </div>
        */
    )
}

export default Register
