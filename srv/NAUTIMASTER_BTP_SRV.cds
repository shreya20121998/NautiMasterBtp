using NAUTIMASTER_BTP_SRV from './external/NAUTIMASTER_BTP_SRV.cds';

service NAUTIMASTER_BTP_SRVSampleService {
    
    entity RefrenceDocumentSet as projection on NAUTIMASTER_BTP_SRV.RefrenceDocumentSet
    {        key Docind, Docdesc     }    
;
    
    entity PortmasterSetSet as projection on NAUTIMASTER_BTP_SRV.PortmasterSetSet
    {        key Country, key Portc, Portn, Reancho, Latitude, Longitude, Countryn, Locid, Ind     }    
;
    
    entity xNAUTIxMASBID as projection on NAUTIMASTER_BTP_SRV.xNAUTIxMASBID
    {        key Bname, key Code, Value, Cvalue, Cunit, Datatype, Tablename, Multi_Choice     }    
;
}