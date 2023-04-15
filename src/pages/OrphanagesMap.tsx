import React,{useEffect,useState} from 'react';
import{Link}from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import '../styles/pages/orphanages-map.css';
import logo from '../images/Local.svg';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';

import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';


interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

function OrphanagesMap() {
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() =>{
       api.get('orphanages').then(response=>{
        setOrphanages(response.data);
       });
   },[]);

    return(
      <div id="page-map">
          <aside>
              <header>
                  <img src={logo} alt="logo da campanha"/>
                  <h2>Escolha um orfanato no mapa</h2>
                  <p>Muitas criancas estao esperando a sua visita :)</p>
              </header>
              <footer>
                  <strong>Sao vicente-<span>SP</span></strong>
              </footer>
          </aside>

          <Map
          center={[-23.955354,-46.4104784]}
          zoom={15}
          style={{width:'100%',height:'100%',}}
          >
           <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         
          {/*<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />*/}
          
           {  orphanages.map(orphanage=>{
                   return(
                    <Marker 
                    icon={happyMapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}  
                    key={orphanage.id}
                   >
                        <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                           {orphanage.name}
                           <Link to={`/orphanages/${orphanage.id}`}>
                               <FiArrowRight size={20} color="#fff"/>
                           </Link>
                        </Popup>
                      </Marker>
                   )
               })
           }
          </Map>
          <Link to="/orphanages/create" className="create-orphanage">
           <FiPlus size={32} color="#fff" />
         </Link>
      </div>
    );
}
export default OrphanagesMap;