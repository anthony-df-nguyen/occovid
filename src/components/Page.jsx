import React from 'react';
import Footer from 'components/Footer'

const Page = (props) => {
    return (
        <div>
            <div className="page">
                <h1 className='pageTitle'>{ props.title }</h1>
                { props.children }
                <Footer />

            </div>
       

          
             
        </div>
    );
}

export default Page;
