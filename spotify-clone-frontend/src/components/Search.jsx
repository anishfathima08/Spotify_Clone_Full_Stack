// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SongItem from './SongItem';
// const Search = () => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);
//     const [search,setSearch]=useState([]);
//     const [def,setDef]=useState('')

    
//     useEffect(()=>{
//             const url = 'http://localhost:8080/api/song/search/'+def;
//             axios.get(url).then((res)=>(setSearch(res.data)))
//     },[def])
    

//     return (
//         <>
//          <div className="p-4 text-white bg-[#121212]">
//             <input
//                 type="text"
//                 onChange={(e)=>{setDef(e.target.value)}}
//                 value={def}
//                 placeholder="Search for songs or albums"
//                 className="w-full p-2 rounded bg-[#242424] text-white"
//             />
//         </div>
        
//                 <div className="mb-4">
//                 <h1 className="my-5 font-bold text-2xl">Matching Results</h1>
//                 <div className="flex overflow-auto">
//                 {(search.length>0)? search.map((item, index) => (
//                     <SongItem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
//                 )):<p>No results found</p>}
//                 </div>
//             </div>
//         </>
       
        
//     );
// };

// export default Search;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SongItem from './SongItem';

const Search = () => {
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]); 
    const inputRef = useRef(null); 

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]); 
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/song/search/${query}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]); 
            }
        };

        fetchResults();
    }, [query]);

    return (
        <>
            <div className="p-4 text-white bg-[#121212]">
                <input
                    type="text"
                    ref={inputRef} 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search songs here"
                    className="w-full p-2 rounded bg-[#242424] text-white"
                />
            </div>

            {results.length > 0 ? (
                <div className="mb-4">
                    <h1 className="my-5 font-bold text-2xl">Matching Results</h1>
                    <div className="flex overflow-auto">
                        {results.map((item, index) => (
                            <SongItem
                                key={index}
                                image={item.image}
                                name={item.name}
                                desc={item.desc}
                                id={item._id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                query.trim() && <p className="text-gray-400">No results found</p>
            )}
        </>
    );
};

export default Search;


