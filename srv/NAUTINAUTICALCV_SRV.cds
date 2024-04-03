using NAUTINAUTICALCV_SRV from './external/NAUTINAUTICALCV_SRV.cds';

service NAUTINAUTICALCV_SRVSampleService {
    @readonly
    entity VoyTypeSet as projection on NAUTINAUTICALCV_SRV.VoyTypeSet
    {        key Voycd, Voydes     }    
;
}