import React, {useState, useEffect} from 'react';
import axios from 'axios';


function RegionList (props) {
    const [regionData, setRegionData] = useState('Kanto');
    const { match, history } = props;
    const { params } = match;
    const { regionId } = params;
  
    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/generation/${regionId}`)
          .then(function (response) {
            console.log('response', response)
            const { data } = response;
            const { results } = data
            console.log('results', results)
            const newRegionData = {};
            results.forEach((data, index) => {
              newRegionData[index] = {
                id: index,
                name: data.name,
              };
            });
            setRegionData(newRegionData);
          });
      }, [regionId]);

      const getRegion = (regionId) => {
        const { id, main_region, pokemon_species } = regionData[regionId];
    
        // return (
        //     <>
        //         {}
        //     </>
        // )
      };
    
    
      return (
          <>

          </>
      )
};

export default RegionList;