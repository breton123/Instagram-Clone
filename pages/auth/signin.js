import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import { LoginIcon } from "@heroicons/react/solid";
import { useState } from "react";

function signIn({ providers }) {
    const [signUp, setsignUp] = useState(false);
    const togglesignUp = () => setsignUp(value => !value);

    return(
        <>
        <Header className="scrollbar-hide no-scrollbar" />
        <div className="flex flex-cols-2 justify-center bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <div className="mt-[70px] ">
                <img className="h-[600px]" src="https://www.kindpng.com/picc/m/477-4771075_black-iphone-6-portrait-instagram-social-media-post.png" />
            </div>
            <div>
            <div className="card w-96 bg-base-100 shadow-sm mt-[90px] ">
                <div className="card-body border-2">
                <figure><img className="w-25 h-20" src="https://links.papareact.com/ocw" /></figure>
                {signUp ? ( 
                    <div className="mt-4">
                        <input type="text" placeholder="Mobile Number or Email Address" className="input input-bordered input-border-black w-full max-w-xs" />
                        <input type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs mt-2" />
                        <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs mt-2" />
                        <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs mt-2" />
                            <div className="card-actions justify-center">
                                <button className="bg-blue-400 rounded-md px-4 py-[5px] font-bold text-white text-sm opacity-50 w-full mt-4">Log In</button>
                            </div>
                    </div>
                ) : (
                    
                    <div className="mt-4">
                        <input type="text" placeholder="Phone, Username or Email Address" className="input input-bordered input-border-black w-full max-w-xs" />
                        <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            <div className="card-actions justify-center">
                                <button className="bg-blue-400 rounded-md px-4 py-[5px] font-bold text-white text-sm opacity-50 w-full mt-4">Log In</button>
                            </div>
                    </div>
                )}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400 opacity-50"></div>
                        <span className="flex-shrink mx-4 text-gray-400 font-semibold text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-400 opacity-50"></div>
                    </div>
                    <div className="flex justify-center">
                        <LoginIcon className="w-5 h-5 mt-[3.2px] mr-1 opacity-70" />
                {Object.values(providers).map((provider) => 
                    (
                    <div key={provider.name}>
                        <button className="text-blue-900 text-sm font-semibold" onClick={() => SignIntoProvider(provider.id, { callbackUrl:"/" })}> Log in with {provider.name} </button>
                    </div>
                    
                    ))}
                    
                    </div>
                    <button className="text-xs text-blue-900 mt-3">Forgotton your password?</button>
                </div>
            </div>
            <div className="card w-96 h-20 bg-base-100 shadow-sm mt-3">
            {signUp ? (
                <div className="card-body border-2">
                    <div className="flex justify-center">
                        <h1 className="text-sm">Have an account?</h1>
                        <button onClick={togglesignUp} className="text-blue-500 font-semibold ml-3 text-sm">Log in</button>
                    </div>
                </div>
            ) : (
                <div className="card-body border-2">
                    <div className="flex justify-center">
                        <h1 className="text-sm">Don't have an account?</h1>
                        <button onClick={togglesignUp} className="text-blue-500 font-semibold ml-3 text-sm">Sign up</button>
                    </div>
                </div>
            )}
            </div>
            </div>

        </div>
        </>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn;
