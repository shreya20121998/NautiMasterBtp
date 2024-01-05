using ZBTP_NAUTI_VOY_DOC_UPD_CDS from './external/ZBTP_NAUTI_VOY_DOC_UPD_CDS.cds';

service ZBTP_NAUTI_VOY_DOC_UPD_CDSSampleService {
    @readonly
    entity ZBTP_Nauti_Voy_DOC_UPD as projection on ZBTP_NAUTI_VOY_DOC_UPD_CDS.ZBTP_Nauti_Voy_DOC_UPD
    {        key sl_no, key voyno, key filename, file_content     }    
;
}