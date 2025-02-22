const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const NAUTIMASTER_BTP_SRV = await cds.connect.to("NAUTIMASTER_BTP_SRV"); 
      srv.on('READ', 'RefrenceDocumentSet', req => NAUTIMASTER_BTP_SRV.run(req.query)); 
      srv.on('READ', 'PortmasterSetSet', req => NAUTIMASTER_BTP_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxMASBID', req => NAUTIMASTER_BTP_SRV.run(req.query)); 
}