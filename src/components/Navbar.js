import React,{useState} from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

function Navbar(props) {
const [searchValue, setSearchValue] = useState("Search");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">News-Monk</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-5">
                        <li className="nav-item "><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Top">Top</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/World">World</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Politics">Politics</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Entertainment">Entertainment</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Technology">Technology</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Food">Food</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Environment">Environment</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Health">Health</Link></li>



                    </ul>
                    <form onSubmit={(e) => {e.preventDefault();props.searchQuery(searchValue)}} className="form-inline my-2 my-lg-0">
                        <input onClick={()=>{document.getElementById("searchBar").select()}} value = {searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" className="form-control mr-sm-2" id="searchBar" type="search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><span class="material-symbols-outlined">
search
</span></button>
                    </form>
                </div>
            </div>
        </nav>
    )
}


export default Navbar
