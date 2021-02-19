import React, {useEffect} from 'react';
import Footer from 'components/Footer'
import Lastupdate from 'components/Lastupdate'

const Page = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const generateUpdateDate = (x) => {
        if (x !== 'Vaccinations' && x !== 'School Cases' && x !== 'City History') {
            return <Lastupdate />
        }
    }
    document.title = props.title;

    return (
        <div>
            <div className="page">
                <h1 className='pageTitle'>{ props.title }</h1>
                {generateUpdateDate(props.title)}
                { props.children }
                <Footer />

            </div>  
        </div>
    );
}

export default Page;
