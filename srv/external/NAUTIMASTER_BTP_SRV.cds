/* checksum : 42dcabac3fa4e059354f751723eeb28c */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service NAUTIMASTER_BTP_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.BusinessPartnerSet {
  @sap.unicode : 'false'
  @sap.label : 'Vendor'
  @sap.updatable : 'false'
  key Lifnr : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'BP Role'
  PartnerRole : String(7) not null;
  @sap.unicode : 'false'
  @sap.label : 'Title'
  Anred : String(15) not null;
  @sap.unicode : 'false'
  @sap.label : 'Name'
  Name1 : String(35) not null;
  @sap.unicode : 'false'
  @sap.label : 'Name 2'
  Name2 : String(35) not null;
  @sap.unicode : 'false'
  @sap.label : 'Name 3'
  Name3 : String(35) not null;
  @sap.unicode : 'false'
  @sap.label : 'Search Term 1'
  Sort1 : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Street 2'
  StrSuppl1 : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Street 3'
  StrSuppl2 : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'House Number'
  HouseNum1 : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Street'
  Stras : String(60) not null;
  @sap.unicode : 'false'
  @sap.label : 'Postal Code'
  Pstlz : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'City'
  Ort01 : String(35) not null;
  @sap.unicode : 'false'
  @sap.label : 'Country'
  Land1 : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Region'
  Regio : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Time zone'
  TimeZone : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Language'
  Spras : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Telephone 1'
  Telf1 : String(16) not null;
  @sap.unicode : 'false'
  @sap.label : 'Telephone 2'
  Telf2 : String(16) not null;
  @sap.unicode : 'false'
  @sap.label : 'Fax Number'
  Telfx : String(31) not null;
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  SmtpAddr : String(241) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Created on'
  Erdat : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'To'
  DateTo : Timestamp;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.MaintainGroupSet {
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.updatable : 'false'
  key Zuser : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User ID group'
  Zgroup : String(12) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.ReleaseStrategySet {
  @sap.unicode : 'false'
  @sap.label : 'User ID group'
  @sap.updatable : 'false'
  key Zgroup : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.updatable : 'false'
  key App1 : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'Release Strategy'
  Rels : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Voyage Type'
  Voyty : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vessel Type'
  Vesty : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.CountryMasterSet {
  @sap.unicode : 'false'
  @sap.label : 'Value'
  @sap.updatable : 'false'
  key ZfValue : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Field Description'
  ZfDesc : String(50) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.CostMasterSet {
  @sap.unicode : 'false'
  @sap.label : 'Cost.Code'
  @sap.updatable : 'false'
  key Costcode : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Cost.Code.Des'
  Cstcodes : String(35) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.EventMasterSet {
  @sap.unicode : 'false'
  @sap.label : 'Event Type'
  key Evtty : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Event Text'
  Text : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.ClassMasterSet {
  @sap.unicode : 'false'
  @sap.label : 'Value'
  @sap.updatable : 'false'
  @sap.filterable : 'false'
  key ZfValue : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Field Description'
  @sap.filterable : 'false'
  ZfDesc : String(50) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.BidMasterSet {
  @sap.unicode : 'false'
  @sap.label : 'Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Code : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Bname : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'Value'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Value : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Revaluation'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cvalue : Decimal(14, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'currency-code'
  Cunit : String(5) not null;
  @sap.unicode : 'false'
  @sap.label : 'Datatype'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Datatype : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Table Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Tablename : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Multiple Choice'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MultiChoice : Boolean not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.PortmasterSetSet {
  @sap.unicode : 'false'
  @sap.label : 'Country'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Country : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Port Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Portc : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Port Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Portn : String(25) not null;
  @sap.unicode : 'false'
  @sap.label : 'Related Anchorage'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Reancho : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Latitude'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Latitude : String(15) not null;
  @sap.unicode : 'false'
  @sap.label : 'Longitude'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Longitude : String(15) not null;
  @sap.unicode : 'false'
  @sap.label : 'Country Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Countryn : String(25) not null;
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Locid : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Process ind'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ind : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.VoyageRealeaseSet {
  @sap.unicode : 'false'
  @sap.label : 'Release Strategy'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Rels : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Voyage Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Voyty : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vessel Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vesty : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'User ID group'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Zgroup : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  App1 : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  App2 : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  App3 : String(12) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.CountrySet {
  @sap.unicode : 'false'
  @sap.label : 'Country'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Land1 : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Spras : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Country'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Landx50 : String(50) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.CurrencySet {
  @sap.unicode : 'false'
  @sap.label : 'ISO code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Isocd : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'currency-code'
  Waers : String(5) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIMASTER_BTP_SRV.StandardCurrencySet {
  @sap.unicode : 'false'
  @sap.label : 'Currency'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'currency-code'
  key Waers : String(5) not null;
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Spras : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Long Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ltext : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'CDS View For Currency'
entity NAUTIMASTER_BTP_SRV.ZBTP_NAUTICAL_CURRENCY {
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  key waers : String(5) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO currency code'
  isocd : String(3);
  @sap.label : 'Language Key'
  spras : String(2);
  @sap.label : 'Long Text'
  ltext : String(40);
  @sap.label : 'Short text'
  ktext : String(15);
};

