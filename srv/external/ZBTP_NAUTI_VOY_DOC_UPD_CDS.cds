/* checksum : 39719794df8903fa27b5c652b2b776aa */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_NAUTI_VOY_DOC_UPD_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'voyage document uplaod'
entity ZBTP_NAUTI_VOY_DOC_UPD_CDS.ZBTP_Nauti_Voy_DOC_UPD {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Two-digit number'
  @sap.quickinfo : 'Two digit number'
  key sl_no : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Voyage No'
  @sap.quickinfo : 'Voyage Number'
  key voyno : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : ''
  @sap.quickinfo : 'Character 100'
  key filename : String(100) not null;
  @sap.label : 'DE file'
  file_content : LargeBinary;
};

