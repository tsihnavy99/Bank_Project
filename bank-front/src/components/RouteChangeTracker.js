import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = () => {
    const location = useLocation();
    const [initialized, setinitialized] = useState(false);

    useEffect(() => {
        if(!window.location.href.includes("localhost")) {
            ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)
        }
        setinitialized(true);
    }, [])

    useEffect(()=> {
        ReactGA.pageview(location.pathname + location.search);
    }, [initialized, location])
}

export default RouteChangeTracker;