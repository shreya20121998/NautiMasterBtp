using NAUTIMASTER_BTP_SRV from './external/NAUTIMASTER_BTP_SRV.cds';

service NAUTIMASTER_BTP_SRVSampleService {
    @readonly
    entity BidMasterSet as projection on NAUTIMASTER_BTP_SRV.BidMasterSet
    {        Bname, key Code, Value, Cvalue, Cunit, Datatype, Tablename, MultiChoice     }    
;
    @readonly
    entity BusinessPartnerSet as projection on NAUTIMASTER_BTP_SRV.BusinessPartnerSet
    {        key Lifnr, PartnerRole, Anred, Name1, Name2, Name3, Sort1, StrSuppl1, StrSuppl2, HouseNum1, Stras, Pstlz, Ort01, Land1, Regio, TimeZone, Spras, Telf1, Telf2, Telfx, SmtpAddr, Erdat, DateTo     }    
;
    @readonly
    entity ClassMasterSet as projection on NAUTIMASTER_BTP_SRV.ClassMasterSet
    {        key ZfValue, ZfDesc     }    
;
    @readonly
    entity CostMasterSet as projection on NAUTIMASTER_BTP_SRV.CostMasterSet
    {        key Costcode, Cstcodes     }    
;
    @readonly
    entity CountryMasterSet as projection on NAUTIMASTER_BTP_SRV.CountryMasterSet
    {        key ZfValue, ZfDesc     }    
;
    @readonly
    entity EventMasterSet as projection on NAUTIMASTER_BTP_SRV.EventMasterSet
    {        key Evtty, Text     }    
;
    @readonly
    entity MaintainGroupSet as projection on NAUTIMASTER_BTP_SRV.MaintainGroupSet
    {        Zuser, key Zgroup     }    
;
    @readonly
    entity VoyageReleaseSet as projection on NAUTIMASTER_BTP_SRV.VoyageReleaseSet
    {        Rels, Voyty, Vesty, key Zgroup, key App1     }    
;
    @readonly
    entity ReleaseStrategySet as projection on NAUTIMASTER_BTP_SRV.ReleaseStrategySet
    {        Rels, Voyty, Vesty, key Zgroup, key App1     }    
;
}