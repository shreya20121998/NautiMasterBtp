using NAUTIMARINE_TRAFFIC_API_SRV from './external/NAUTIMARINE_TRAFFIC_API_SRV.cds';

service NAUTIMARINE_TRAFFIC_API_SRVSampleService {
   
    entity PortMasterSet as projection on NAUTIMARINE_TRAFFIC_API_SRV.PortMasterSet
    {        Country, Portc, key Portn, Reancho, Latitude, Longitude, Countryn, key Locid     }    
;

}