using NAUTINAUTICALCV_SRV from './external/NAUTINAUTICALCV_SRV.cds';

service NAUTINAUTICALCV_SRVSampleService {
    @readonly
    entity BidTypeSet as projection on NAUTINAUTICALCV_SRV.BidTypeSet
    {        Ddtext, key DomvalueL     }    
;
    @readonly
    entity CarTypeSet as projection on NAUTINAUTICALCV_SRV.CarTypeSet
    {        key Carcd, Cardes     }    
;
    @readonly
    entity CargoUnitSet as projection on NAUTINAUTICALCV_SRV.CargoUnitSet
    {        key Uom, Uomdes     }    
;
    @readonly
    entity CurTypeSet as projection on NAUTINAUTICALCV_SRV.CurTypeSet
    {        key Navoycur, Navoygcurdes     }    
;
    @readonly
    entity GtPlanSet as projection on NAUTINAUTICALCV_SRV.GtPlanSet
    {        key Voyno, Vlegn, Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    @readonly
    entity GtTabSet as projection on NAUTINAUTICALCV_SRV.GtTabSet
    {        Voyno, Vlegn, key Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    @readonly
    entity VoyTypeSet as projection on NAUTINAUTICALCV_SRV.VoyTypeSet
    {        key Voycd, Voydes     }    
;
    @readonly
    entity ZCalculateSet as projection on NAUTINAUTICALCV_SRV.ZCalculateSet
    {        key GvSpeed     }    
;
}