import { Inject } from '@angular/core';

var port = 8443;

const dbgPrint = false;


export var constSrvUrl:any;

export class ServerConfigs {

    /*
  restServer_ip : 'localhost',
  restServer_port:  '8080',
  fileUploadServer_ip : 'localhost',
  fileUploadServer_port : '8080',


    //restServer: 'efv-stage.tcs.ifi.lmu.de:8080/Plone',
    restServer: 'https://localhost' + ':' + port,
    fileUploadServer: 'https://localhost' + ':' + port
    */

    private serverURL : string;
    private host : string;

    //constructor(@Inject(Window) private _window: Window)
    constructor()
    {
        /*this.host = _window.location.toString();

        var splitString = this.host.split('/');
        console.log("splitString=",splitString);

        var protocol =  splitString[0];
        var host_port = splitString[2].split(':');


        if (dbgPrint) console.log("host_port=",host_port);
        */

        /*

        var host = "";
        var port = "";
        if (host_port.length>1)
        {
            host = host_port[0];
            port = host_port[1];
        }
        else host = splitString[2];

        */

        var host = '192.168.159.130:8080';

        var port;
        /*if (protocol == 'http:')
            port = '8080';
        else
            port = '8443';
        */

        //this.serverURL = protocol + '//' + host + ':' + port + '/Plone';


        //this.serverURL = protocol + '//' + host + '/Plone';


        this.serverURL = 'http://' + host + '/Plone';

        if (dbgPrint)  console.log("serverURL=",this.serverURL);

        constSrvUrl = this.serverURL;
    }


    get_serverConfigs()
    {

        let srvObj = {
            url : this.serverURL ,
            host: this.host
        };

        return srvObj;
    }

}

export const RunningConfigs = {
    runWithFakeBackend : false
}
