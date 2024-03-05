using NAUTINAUTICALCV_SRV from './external/NAUTINAUTICALCV_SRV.cds';

service NAUTINAUTICALCV_SRVSampleService {
    
    entity BidTypeSet as projection on NAUTINAUTICALCV_SRV.BidTypeSet
    {        Ddtext, key DomvalueL     }    
;
    
    entity CarTypeSet as projection on NAUTINAUTICALCV_SRV.CarTypeSet
    {        key Carcd, Cardes     }    
;
    
    entity CargoUnitSet as projection on NAUTINAUTICALCV_SRV.CargoUnitSet
    {        key Uom, Uomdes     }    
;
    
    entity CurTypeSet as projection on NAUTINAUTICALCV_SRV.CurTypeSet
    {        key Navoycur, Navoygcurdes     }    
;
    
    entity GtPlanSet as projection on NAUTINAUTICALCV_SRV.GtPlanSet
    {        key Voyno, Vlegn, Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    
    entity GtTabSet as projection on NAUTINAUTICALCV_SRV.GtTabSet
    {        Voyno, Vlegn, key Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    
    entity VoyTypeSet as projection on NAUTINAUTICALCV_SRV.VoyTypeSet
    {        key Voycd, Voydes     }    
;
    
    entity ZCalculateSet as projection on NAUTINAUTICALCV_SRV.ZCalculateSet
    {        key GvSpeed     }    
;
}