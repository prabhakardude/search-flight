import React,{useState,useEffect} from 'react'
import axios from 'axios';


const options = {
    method: 'GET',
    url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
    params: {query: 'Stockholm'},
    headers: {
      'x-rapidapi-key': '{x-rapidapi-key}',
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

const Navbar = () => {
    const [loading, setLoding] = useState(false);
    const [posts,setPosts] = useState([]);
    const [searchTitle,setSearchTitle] =useState("");
    
    useEffect(() => {
        const loadPosts =async () => {
        setLoding(true);
        const response =await axios.get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/'
        );
        setPosts(response.data);
        setLoding(false);
        }

        loadPosts();
    },[])
    return (
        <div>
             <div className='Rectangle-1'>
                <header className="headers">
                    <div className='form_div'>
                        <h3>Book Flight</h3>
                        
                        {loading ? (<h3 >From</h3>
                        ) :(
                            posts.filter((value) => {
                                if(searchTitle === "") {
                                    return value
                                } else if (value.title.toLowercase().includes(searchTitle.toLocaleLowerCase())) {
                                    return value
                                }                     }
                            )
                            .map((item) => <h5 key={item.id}>{item.title}</h5>)
                        )}
                        <input type='text' id='border' placeholder='starting place' 
                        onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <h3>To</h3>
                        <input type='text'  id='border' placeholder='ending place' 
                       
                        /><br /><br /> 
                        <button id='border' >search</button>
                   </div>
                </header>
            </div>
            
        </div>
    );
};

export default Navbar;
