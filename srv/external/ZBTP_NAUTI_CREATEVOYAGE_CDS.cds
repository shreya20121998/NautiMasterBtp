/* checksum : 732ee0fb6e5cfdefda4eaf158c8e8f1d */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZBTP_NAUTI_CREATEVOYAGE_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'CreateVoyage'
entity ZBTP_NAUTI_CREATEVOYAGE_CDS.ZBTP_NAUTI_CreateVoyage {
  @sap.display.format : 'NonNegative'
  @sap.label : 'LegID'
  @sap.quickinfo : 'Unique leg under a Voyage'
  key Vlegn : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Port Code'
  @sap.quickinfo : 'Unified Port Code - Unique'
  Portc : String(10);
  @sap.label : 'Port Name'
  Portn : String(25);
  @sap.label : 'Distance'
  @sap.quickinfo : 'The Post Master Fetched Using External API'
  Pdist : Decimal(13, 3);
  @sap.label : 'Distance UoM'
  @sap.quickinfo : 'Distance Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  Medst : String(3);
  @sap.label : 'Speed'
  @sap.quickinfo : 'The Speed From Vessel Master/Manual Input'
  Vspeed : Decimal(17, 3);
  @sap.label : 'Port Days'
  @sap.quickinfo : 'Propsed From Historic Data/Manual Input'
  Ppdays : Decimal(6, 3);
  @sap.label : 'Sea Days'
  @sap.quickinfo : 'Proposed From Historic Data/Manual Input'
  Vsdays : Decimal(7, 3);
  @sap.display.format : 'Date'
  @sap.label : 'ETA'
  @sap.quickinfo : 'Calculated Based on ETA'
  Vetad : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Calculated Based On ETD'
  Vetat : Time;
  @sap.display.format : 'Date'
  @sap.label : 'ETD'
  @sap.quickinfo : 'Manual Entry'
  Vetdd : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'Voyage Acutal Time'
  Vetdt : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Weather Delay .Sea'
  @sap.quickinfo : 'Caluclated from Weather Service else Manual Entry'
  Vwead : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'In Planning, Vetting In Progress, Vetting Complted'
  Pstat : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Matnr : String(40);
  @sap.label : 'Material description'
  Maktx : String(40);
  @sap.label : 'Cargo size'
  Cargs : Decimal(12, 0);
  @sap.label : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  Cargu : String(3);
  @sap.label : 'Total Cost'
  Othco : Decimal(24, 3);
  @sap.label : 'Total Cost'
  Frcost : Decimal(24, 3);
  @sap.label : 'Total Cost'
  Totco : Decimal(24, 3);
};

