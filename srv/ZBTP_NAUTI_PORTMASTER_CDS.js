const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZBTP_NAUTI_PORTMASTER_CDS = await cds.connect.to("ZBTP_NAUTI_PORTMASTER_CDS"); 
      srv.on('READ', 'ZBTP_NAUTI_PORTMASTER', req => ZBTP_NAUTI_PORTMASTER_CDS.run(req.query)); 
}