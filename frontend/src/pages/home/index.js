import React from 'react'
import { HeroSection } from '../../components/hero-section'
// import { useSelector } from "react-redux";

const HomePage = ({ history, location }) => {

    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;

    // const redirect = location.search ? location.search.split("=")[1] : "/dashboard";

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     if (userInfo) {
    //         history.push(redirect);
    //     }
    // }, [history, userInfo, redirect]);
    return (
        <>
            <HeroSection />
        </>
    )
}

export default HomePage