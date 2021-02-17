import React, { useState, useEffect } from 'react';
import Button from 'components/Button';

const CitySelector = (props) => {
    const [numSelected, updateNumSelected] = useState(0)
    const [update1, update2, update3] = props.updater

    let currentIndex = [];
    if (localStorage.getItem('comparecity1')) {
        currentIndex.push(localStorage.getItem('comparecity1'))
    }
    if (localStorage.getItem('comparecity2')) {
        currentIndex.push(localStorage.getItem('comparecity2'))
    }
    if (localStorage.getItem('comparecity3')) {
        currentIndex.push(localStorage.getItem('comparecity3'))
    }

    //console.log('loading the city selector, currentIndex is ', currentIndex.length)
        
        
    function checkWhatsClicked(e) {
        // console.log(e)
        let whatClicked = e.target.value
        //Check to see if its already in the array
        if (currentIndex.includes(whatClicked)) {
            let temp = currentIndex.filter(a => {
                if (a !== whatClicked) {
                    return a
                }
            })
            currentIndex = [...temp]

        }
        // If its not in, add it if theres less than 3
        else if (!currentIndex.includes(whatClicked) && currentIndex.length < 3) {
            currentIndex.push(whatClicked);
        }
        // If there is 3, do not add it and warn user
        else if (currentIndex.length === 3) {
            e.target.checked = false;
            alert('Please do not select more than 3 cities')
        }
    }

    function updateCities() {
        localStorage.removeItem('comparecity1')
        localStorage.removeItem('comparecity2')
        localStorage.removeItem('comparecity3')
        if (currentIndex[0]) {
            localStorage.setItem('comparecity1', currentIndex[0])
        }
        if (currentIndex[1]) {
            localStorage.setItem('comparecity2', currentIndex[1])
        }
        if (currentIndex[2]) {
            localStorage.setItem('comparecity3', currentIndex[2])
        }
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        window.location.reload(false)
    }

    useEffect(() => {
        let boxes = document.querySelectorAll('input');
        boxes.forEach(each => {
          
            if (each.value == localStorage.getItem('comparecity1') || each.value == localStorage.getItem('comparecity2') || each.value == localStorage.getItem('comparecity3')) {
                each.checked = true;
            }
        })
    },[])

    const [openedorclosed, updateopenclose] = useState('0px')
    function toggledOpenOrClosed(e) {

        let itemHeight = e.target.nextSibling.scrollHeight;
     

        switch (openedorclosed) {
            case '0px':
                return updateopenclose(itemHeight+'px')
                break;
            case itemHeight+'px':
                return updateopenclose('0px')
                break;
            default:
                return updateopenclose(itemHeight + 'px')
                break;
        }
    }

    return (
        <div>
            <div id="multiCitySelect">
                <div className="cityselecttitle" onClick={ toggledOpenOrClosed }>Select the Cities</div>
                <div className="citySelectorContainer" style={ { maxHeight: openedorclosed, } }>
                    <p style={{textAlign: 'center', marginBottom: '1rem'}}>Select up to 3 cities</p>
                    <form onChange={ (e) => checkWhatsClicked(e) }>
                        <ul>
                            <li><label><input type="checkbox" value="Aliso_Viejo" label="Aliso Viejo"></input >Aliso Viejo</label></li>
                            <li><label><input type="checkbox" value="Anaheim" label="Anaheim"></input>Anaheim</label></li>
                            <li><label><input type="checkbox" value="Brea" label="Brea"></input>Brea</label></li>
                            <li><label><input type="checkbox" value="Buena_Park" label="Buena Park"></input>Buena Park</label></li>
                            <li><label><input type="checkbox" value="Costa_Mesa" label="Costa Mesa"></input>Costa Mesa</label></li>
                            <li><label><input type="checkbox" value="Coto_De_Caza" label="Coto de Caza"></input>Coto de Caza</label></li>
                            <li><label><input type="checkbox" value="Cypress" label="Cypress"></input>Cypress</label></li>
                            <li><label><input type="checkbox" value="Dana_Point" label="Dana Point"></input>Dana Point</label></li>
                            <li><label><input type="checkbox" value="Fountain_Valley" label="Fountain Valley"></input>Fountain Valley</label></li>
                            <li><label><input type="checkbox" value="Fullerton" label="Fullerton"></input>Fullerton</label></li>
                            <li><label><input type="checkbox" value="Garden_Grove" label="Garden Grove"></input>Garden Grove</label></li>
                            <li><label><input type="checkbox" value="Huntington_Beach" label="Huntington Beach"></input>Huntington Beach</label></li>
                            <li><label><input type="checkbox" value="Irvine" label="Irvine"></input>Irvine</label></li>
                            <li><label><input type="checkbox" value="La_Habra" label="La Habra"></input>La Habra</label></li>
                            <li><label><input type="checkbox" value="La_Palma" label="La Palma"></input>La Palma</label></li>
                            <li><label><input type="checkbox" value="Ladera_Ranch" label="Ladera Ranch"></input>Ladera Ranch</label></li>
                            <li><label><input type="checkbox" value="Laguna_Beach" label="Laguna Beach"></input>Laguna Beach</label></li>
                            <li><label><input type="checkbox" value="Laguna_Hills" label="Laguna Hills"></input>Laguna Hills</label></li>
                            <li><label><input type="checkbox" value="Laguna_Niguel" label="Laguna Niguel"></input>Laguna Niguel</label></li>
                            <li><label><input type="checkbox" value="Laguna_Woods" label="Laguna Woods"></input>Laguna Woods</label></li>
                            <li><label><input type="checkbox" value="Lake_Forest" label="Lake Forest"></input>Lake Forest</label></li>
                            <li><label><input type="checkbox" value="Los_Alamitos" label="Los Alamitos"></input>Los Alamitos</label></li>
                            <li><label><input type="checkbox" value="Midway_City" label="Midway City"></input>Midway City</label></li>
                            <li><label><input type="checkbox" value="Mission_Viejo" label="Mission Viejo"></input>Mission Viejo</label></li>
                            <li><label><input type="checkbox" value="Newport_Beach" label="Newport Beach"></input>Newport Beach</label></li>
                            <li><label><input type="checkbox" value="Orange" label="Orange"></input>Orange</label></li>
                            <li><label><input type="checkbox" value="Placentia" label="Placentia"></input>Placentia</label></li>
                            <li><label><input type="checkbox" value="Rancho_Mission_Viejo" label="Rancho Mission Viejo"></input>Rancho Mission Viejo</label></li>
                            <li><label><input type="checkbox" value="Rancho_Santa_Margarita" label="Rancho Santa Margarita"></input>Rancho Santa Margarita</label></li>
                            <li><label><input type="checkbox" value="Rossmoor" label="Rossmoor"></input>Rossmoor</label></li>
                            <li><label><input type="checkbox" value="San_Clemente" label="San Clemente"></input>San Clemente</label></li>
                            <li><label><input type="checkbox" value="San_Juan_Capistrano" label="San Juan Capistrano"></input>San Juan Capistrano</label></li>
                            <li><label><input type="checkbox" value="Santa_Ana" label="Santa Ana"></input>Santa Ana</label></li>
                            <li><label><input type="checkbox" value="Seal_Beach" label="Seal Beach"></input>Seal Beach</label></li>
                            <li><label><input type="checkbox" value="Silverado" label="Silverado"></input>Silverado</label></li>
                            <li><label><input type="checkbox" value="Stanton" label="Stanton"></input>Stanton</label></li>
                            <li><label><input type="checkbox" value="Trabuco_Canyon" label="Trabuco Canyon"></input>Trabuco Canyon</label></li>
                            <li><label><input type="checkbox" value="Tustin" label="Tustin"></input>Tustin</label></li>
                            <li><label><input type="checkbox" value="Villa_Park" label="Villa Park"></input>Villa Park</label></li>
                            <li><label><input type="checkbox" value="Westminster" label="Westminster"></input>Westminster</label></li>
                            <li><label><input type="checkbox" value="Yorba_Linda" label="Yorba Linda"></input>Yorba Linda</label></li>
                        </ul>
                    </form>
                    <div className="loadDataButton" onClick={ updateCities } >Load Data</div>
                </div>
            </div>
        </div>
    );
}

export default CitySelector;
