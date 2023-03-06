import { useState} from "react";
import { Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import Search from "../components/Search";

export default function Header({ 
        allModes,
        searchFields, 
        setSearchField
    }) {

    const [collapse, setCollapse] = useState(false);

    const handleToggle = ()=>{
        if(!collapse){
            document.getElementById("mobile-menu").classList.add("block");
            document.getElementById("hero").classList.add("shift-below");
            setCollapse(true)
        }else{
            document.getElementById("mobile-menu").classList.remove("block")
            document.getElementById("hero").classList.remove("shift-below");
            setCollapse(false)
        }
    }


    return (
        <div className="header">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-6">
                   <a href="/"><img
                        className="logo"
                        src="/img/vt-logo.svg"
                        height="50px"
                        width="145px"
                    alt=""/></a>
                </div>
                <div className="col-md-4 col-sm-1 col-1">
                    <div className="search-box">
                        <Search
                            allModes={allModes}
                            searchFields={searchFields}
                            setSearchField={setSearchField}
                        />
                    </div>
                </div>
                <div className="col-md-4 col-sm-5 col-5">
                    <div onClick={handleToggle} className="hamberger-icon">
                        <span onClick={handleToggle} className="pointer">
                            {
                                !collapse?(
                                    <BiMenu
                                        size={28}
                                        color="#ffffff"
                                    />
                                ):(
                                    <BiX
                                        size={28}
                                        color="#ffffff"
                                    />
                                )
                            }
                            
                        </span>
                    </div>
                    <ul className="nav">
                        <li><Link to="/">Traffic Information</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

