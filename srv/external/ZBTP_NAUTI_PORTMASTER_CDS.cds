/* checksum : 8d3d7d3129b1e6f015e2a75160fe5555 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_NAUTI_PORTMASTER_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'portmaster'
entity ZBTP_NAUTI_PORTMASTER_CDS.ZBTP_NAUTI_PORTMASTER {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country'
  key country : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Port Code'
  @sap.quickinfo : 'Unified Port Code - Unique'
  key portc : String(10) not null;
  @sap.label : 'Port Name'
  portn : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Related Anchorage'
  reancho : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Latitude'
  latitude : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Longitude'
  longitude : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country Name'
  countryn : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Location ID'
  locid : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Process indicator'
  @sap.quickinfo : 'Subsequent process indicator for document base table'
  ind : String(1);
};

