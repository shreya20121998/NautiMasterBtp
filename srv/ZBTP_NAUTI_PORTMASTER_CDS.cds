using ZBTP_NAUTI_PORTMASTER_CDS from './external/ZBTP_NAUTI_PORTMASTER_CDS.cds';

service ZBTP_NAUTI_PORTMASTER_CDSSampleService {
    @readonly
    entity ZBTP_NAUTI_PORTMASTER as projection on ZBTP_NAUTI_PORTMASTER_CDS.ZBTP_NAUTI_PORTMASTER
    {        key country, key portc, portn, reancho, latitude, longitude, countryn, locid, ind     }    
;
}