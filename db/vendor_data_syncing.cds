namespace NAUTI_VENDOR;
 
entity LFA1{
    LIFNR:String(10);  //Account no. of vendor
    ANRED:String(15);        // title
    ADRNR:String(10);        //Address
    NAME1:String(35);       //Name
    NAME2:String(35);
    NAME3:String(35);
    STRAS:String(35);       //Street
    PSTLZ:String(10);       //postal code
    ORT01:String(35);      //city
    LAND1:String(3);      //country
    REGIO:String(3);      //region
    TELF1:String(16);      //telephone 1
    TELF2:String(16);      //telephone2
    TELFX:String(31);      // fax Number
    ERDAT:Date;      // created on
    SPRAS:String(15);      //language
 
}
entity ADR6{
    ADDRNUMBER: String(10); // Address Number
    SMTP_ADNR: String(241); //Email Address
 
}
entity ADRC{
    ADDRNUMBER: String(10); // Address Number
    DATE_TO: Date; //valid to Date in current release only 99991231 possible
    STR_SUPPL1: String(40); //street1
    STR_SUPPL2: String(40); //street2
    STREET: String(60); //Street
    SORT1: String(20);  //Search Item 1
    TIME_ZONE: String(6); //TIme Zone
    HOUSE_NUM1: String(10); //House Number
}
 