import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'components/Button'

const Donate = (props) => {
    return (
        <div>
            <div className='page'>
                <div className='donate'>
                    
                    <p>Thank you for visiting my site! I hope you find the data presentation helpful. If you wish to show your appreciation, please consider donating via PayPal by clicking the link below. Stay safe!</p>
                    <div>
                        <form action="https://www.paypal.com/donate" method="post" target="_top">
                            <input type="hidden" name="business" value="NNJ52J9FQ8NKW" />
                            <input type="hidden" name="item_name" value="occovid.com" />
                            <input type="hidden" name="currency_code" value="USD" />
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donate;
