using ZBTP_NAUTI_MARINE_DM_CDS from './external/ZBTP_NAUTI_MARINE_DM_CDS.cds';

service ZBTP_NAUTI_MARINE_DM_CDSSampleService {
    @readonly
    entity ZBTP_NAUTI_Marine_DM as projection on ZBTP_NAUTI_MARINE_DM_CDS.ZBTP_NAUTI_Marine_DM
    {        key start_port, key end_port, key route_id, key location_id, latitude, longitude     }    
;
}