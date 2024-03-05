using NAUTIMARINE_TRAFFIC_API_SRV from './external/NAUTIMARINE_TRAFFIC_API_SRV.cds';

service NAUTIMARINE_TRAFFIC_API_SRVSampleService {

    entity EsPathCollection as projection on NAUTIMARINE_TRAFFIC_API_SRV.EsPathCollection
    {        PathId, key Latitude, Longitude     }    
;
    
    entity PortMasterSet as projection on NAUTIMARINE_TRAFFIC_API_SRV.PortMasterSet
    {        Country, Portc, key Portn, Reancho, Latitude, Longitude, Countryn, key Locid     }    
;

    entity es_port_master as projection on NAUTIMARINE_TRAFFIC_API_SRV.es_port_master
    {        Country, key Portc, Portn, Reancho, Latitude, Longitude, Countryn, Locid, Ind     }    
;

    entity es_route_map as projection on NAUTIMARINE_TRAFFIC_API_SRV.es_route_map
    {        marineApiRoute, key IvFromPort, IvOptimized, key IvToPort     }    
;
}