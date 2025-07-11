import { useEffect, useState } from "react";

export function apiCall(length = 20) {
    
    const [data, setData]  = useState([]);

    useEffect(() => {
        async function fetchData(){
            try{
                let promises = []
                for(let i = 0; i < length; i++){
                    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`).then(res => res.json()))
                }
                const response = await Promise.all(promises);
                const img = response.map(element => element.sprites.front_shiny);
                setData(img);
            }catch(error){
                console.log("Error fetching data: ", error);
            }
        }
        fetchData();
    }, [length])

    return data;
}

