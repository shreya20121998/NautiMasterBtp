/* checksum : 514945df8f3d239f0a6b26ac77d5bc81 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_NAUTI_MARINE_DM_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'Marine dm'
entity ZBTP_NAUTI_MARINE_DM_CDS.ZBTP_NAUTI_Marine_DM {
  @sap.label : 'Port ID'
  @sap.quickinfo : 'Port ID for Vessel Route'
  key start_port : String(10) not null;
  @sap.label : 'Port ID'
  @sap.quickinfo : 'Port ID for Vessel Route'
  key end_port : String(10) not null;
  @sap.label : 'Route ID'
  key route_id : String(2) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Location ID'
  key location_id : String(3) not null;
  @sap.label : 'Latitude'
  latitude : String(10);
  @sap.label : 'Longitude'
  longitude : String(10);
};

