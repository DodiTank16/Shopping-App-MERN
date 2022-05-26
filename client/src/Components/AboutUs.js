import React, { useEffect } from 'react'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'

const AboutUs = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("LoginToken");

    useEffect(() => {
        if (!token) navigate("/");
        document.title = "About Us";
    }, []);
    return (
        <>
            <Header />
            <Breadcrumb />
            <div className='flex'>
                <div className='mt-5 mr-2' style={{ width: "4in" }} >
                    {/* <img src={Avatar} alt={"Avtar"} style={{ height: "4in" }} /> */}
                    <Link to={'https://app.daily.dev/DodiTank'}>
                        <img src="https://api.daily.dev/devcards/975e902fea9b4584b1086b1db2fda485.png?r=7pl"
                            width="400"
                            style={{ height: "4in" }}
                            alt="Dodi Tank's Dev Card"
                        />
                    </Link>
                </div>
                <div className='mt-5 bg-white w-fit'>

                    <div className=" text-gray-900 font-bold text-xl mb-2 pt-5 pl-3">Dodi Tank <span className='text-gray-900 text-base mb-2'> (React Intern) </span></div>
                    <p className="text-gray-700  text-base mb-2 pt-3 pl-3 pr-5">“I am a passionate developer with a wide variety of skills.I have worked on different projects during my college life.Currently I am working on learning JavaScript and React Js Framework.Right now I'm looking forward to building web applications and to work on developing Web-apps in the future as a tech lead. If you're looking for an engineer with a good knowledge of algorithms, design and development, then I am the right person for you.”</p>
                    <button className="m-2 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/ContactUs")} >Contact Him</button>
                </div>


            </div>

        </>
    )
}

export default AboutUs