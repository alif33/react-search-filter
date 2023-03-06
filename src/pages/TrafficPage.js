import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Form from '../components/Form';
import Header from '../base/Header';
import Footer from '../base/Footer';
import fetchData from '../helper/Controller';
import { useDispatch, useSelector } from 'react-redux';
import { setInfos } from '../store/infos/actions';

export default function Home() {

  const { infos } = useSelector(state=>state);
  const dispatch = useDispatch();

  const [allModes, setAllModes] = useState({
    bus: false, 
    tram: false, 
    boat: false, 
    train: false
  })
  const [ searchFields, setSearchField ] = useState({
    designation: "",
    stopPointName: ""
  });

  useEffect(()=>{
    fetchData()
    .then(res=>{
      dispatch(setInfos(res))
    })
    
  }, [])

  return (
  <>
    <Header 
      allModes={allModes}
      searchFields={searchFields}
      setSearchField={setSearchField}
    />            
      <Hero
        allModes={allModes}
        setAllModes={setAllModes}
        searchFields={searchFields}
        setSearchField={setSearchField}
      />
      <Form/>
    <Footer/>
  </>
  )
}


