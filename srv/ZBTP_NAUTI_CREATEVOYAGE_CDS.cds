using ZBTP_NAUTI_CREATEVOYAGE_CDS from './external/ZBTP_NAUTI_CREATEVOYAGE_CDS.cds';

service ZBTP_NAUTI_CREATEVOYAGE_CDSSampleService {
    @readonly
    entity ZBTP_NAUTI_CreateVoyage as projection on ZBTP_NAUTI_CREATEVOYAGE_CDS.ZBTP_NAUTI_CreateVoyage
    {        key Vlegn, Portc, Portn, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Othco, Frcost, Totco     }    
;
}