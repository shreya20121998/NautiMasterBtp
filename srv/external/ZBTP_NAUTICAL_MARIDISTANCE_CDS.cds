/* checksum : 495171901f0d1f863ff6017385b26050 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_NAUTICAL_MARIDISTANCE_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'Marine distance'
entity ZBTP_NAUTICAL_MARIDISTANCE_CDS.ZBTP_NAUTICAL_MariDistance {
  @sap.label : 'Port ID'
  @sap.quickinfo : 'Port ID for Vessel Route'
  key from_port : String(10) not null;
  @sap.label : 'Port ID'
  @sap.quickinfo : 'Port ID for Vessel Route'
  key to_port : String(10) not null;
  @sap.label : 'Distance'
  @sap.quickinfo : 'Port Distance'
  key distance : String(10) not null;
};

