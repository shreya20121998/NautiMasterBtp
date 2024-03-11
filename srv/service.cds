

using ZBTP_NAUTI_CREATEVOYAGE_CDS from './external/ZBTP_NAUTI_CREATEVOYAGE_CDS.cds';
using ZBTP_NAUTI_MARINE_DM_CDS from './external/ZBTP_NAUTI_MARINE_DM_CDS.cds';
using ZBTP_NAUTI_VOY_DOC_UPD_CDS from './external/ZBTP_NAUTI_VOY_DOC_UPD_CDS.cds';
using ZBTP_NAUTICAL_MARIDISTANCE_CDS from './external/ZBTP_NAUTICAL_MARIDISTANCE_CDS.cds';
using NAUTINAUTICALCV_SRV  from './external/NAUTINAUTICALCV_SRV.cds';
using NAUTIMASTER_BTP_SRV    from './external/NAUTIMASTER_BTP_SRV';
using NAUTIMARINE_TRAFFIC_API_SRV from './external/NAUTIMARINE_TRAFFIC_API_SRV.cds';



service Nautical{


   entity BidTypeSet as projection on NAUTINAUTICALCV_SRV.BidTypeSet;
   entity CargoUnitSet as projection on NAUTINAUTICALCV_SRV.CargoUnitSet;
   entity CarTypeSet as projection on NAUTINAUTICALCV_SRV.CarTypeSet;
   entity CurTypeSet as projection on NAUTINAUTICALCV_SRV.CurTypeSet;
   entity GtPlanSet as projection on NAUTINAUTICALCV_SRV.GtPlanSet;
   entity GtTabSet as projection on NAUTINAUTICALCV_SRV.GtTabSet;
   entity VoyTypeSet as projection on NAUTINAUTICALCV_SRV.VoyTypeSet;
   entity ZCalculateSet as projection on NAUTINAUTICALCV_SRV.ZCalculateSet;
   entity ZCreatePlanSet as projection on NAUTINAUTICALCV_SRV.ZCreatePlanSet;
   
   entity BidMasterSet as projection on NAUTIMASTER_BTP_SRV.BidMasterSet; 
   entity CostMasterSet as projection on NAUTIMASTER_BTP_SRV.CostMasterSet;
   entity EventMasterSet as projection on NAUTIMASTER_BTP_SRV.EventMasterSet;
   entity BusinessPartnerSet as projection on NAUTIMASTER_BTP_SRV.BusinessPartnerSet;
   entity CountryMasterSet as projection on NAUTIMASTER_BTP_SRV.CountryMasterSet;
   entity MaintainGroupSet as projection on NAUTIMASTER_BTP_SRV.MaintainGroupSet;
   entity ReleaseStrategySet as projection on NAUTIMASTER_BTP_SRV.ReleaseStrategySet;
   entity VoyageReleaseSet as projection on NAUTIMASTER_BTP_SRV.VoyageReleaseSet;
   entity ClassMasterSet as projection on NAUTIMASTER_BTP_SRV.ClassMasterSet;


   entity EsPathCollection as projection on NAUTIMARINE_TRAFFIC_API_SRV.EsPathCollection;
   entity es_route_map as projection on NAUTIMARINE_TRAFFIC_API_SRV.es_route_map;
   entity es_port_master as projection on NAUTIMARINE_TRAFFIC_API_SRV.es_port_master;
   entity PortMasterSet as projection on NAUTIMARINE_TRAFFIC_API_SRV.PortMasterSet;
   
    entity ZBTP_NAUTI_CreateVoyage as projection on ZBTP_NAUTI_CREATEVOYAGE_CDS.ZBTP_NAUTI_CreateVoyage
    {        key Vlegn, Portc, Portn, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Othco, Frcost, Totco     }    
;
 entity ZBTP_NAUTI_Marine_DM as projection on ZBTP_NAUTI_MARINE_DM_CDS.ZBTP_NAUTI_Marine_DM
    {        key start_port, key end_port, key route_id, key location_id, latitude, longitude     }    
;
 entity ZBTP_Nauti_Voy_DOC_UPD as projection on ZBTP_NAUTI_VOY_DOC_UPD_CDS.ZBTP_Nauti_Voy_DOC_UPD
    {        key sl_no, key voyno, key filename, file_content     }    
;
entity ZBTP_NAUTICAL_MariDistance as projection on ZBTP_NAUTICAL_MARIDISTANCE_CDS.ZBTP_NAUTICAL_MariDistance
    {         from_port,  to_port,  distance     }    
;

       
}