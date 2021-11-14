import react, { useState,useEffect } from 'react'
import FetchVaccineTier from 'Datafetch/FetchVaccineTier'

const FindAVaccine = () => {
  
    const [radius,updateRadius] = useState(5)
    const [zip,updateZip] = useState("")
    const [query, updateQuery] = useState(`https://vaccinefinder.org/results/?zipcode=${zip}&medications=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b,784db609-dc1f-45a5-bad6-8db02e79d44f&radius=${radius}`)
    const [vaccinePhase, updateVaccinePhases] = useState([]);
    

    const handleZip = (e) => {
        const newZip = e.target.value;
        updateZip(newZip)
    }
    const handleRadius = (e) => {
        const newRadius = e.target.value
        updateRadius(newRadius)
    }
    useEffect(()=> {
        updateQuery(`https://vaccinefinder.org/results/?zipcode=${zip}&medications=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b,784db609-dc1f-45a5-bad6-8db02e79d44f&radius=${radius}`)
    },[radius,zip])

    const searchVax = (e) => {
        e.preventDefault();
        window.open(query)
    }


 
    return (
      <div className="findVaccine">
        <FetchVaccineTier function={updateVaccinePhases} />
        <form onSubmit={searchVax}>
          <h2 style={{ textAlign: "center" }}>
            <span className="vax">Vaccine</span>{" "}
            <span className="finder">Finder</span>
          </h2>

          <p>Within</p>
          <select value={radius} onChange={handleRadius}>
            <option value="1">1 Mile</option>
            <option value="5">5 Miles</option>
            <option value="10">10 Miles</option>
            <option value="25">25 Miles</option>
            <option value="50">50 Miles</option>
          </select>
          <p>of</p>
          <input
            required
            type="text"
            pattern="[0-9]{5}"
            placeholder="Zip Code"
            onChange={handleZip}></input>
          <button type="submit" className="globButton">
            Find
          </button>
        </form>
        <p>
          <b>Active Phase</b>:{" "}
          <span style={{ fontWeight: 300 }}>{vaccinePhase}</span>
        </p>
      </div>
    );
}
export default FindAVaccine;