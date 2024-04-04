const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const NAUTIMARINE_TRAFFIC_API_SRV = await cds.connect.to("NAUTIMARINE_TRAFFIC_API_SRV"); 
      srv.on('READ', 'PortMasterSet', req => NAUTIMARINE_TRAFFIC_API_SRV.run(req.query)); 
}