
package org.concoursjeunes.webservices;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;


/**
 * This class was generated by the JAXWS SI.
 * JAX-WS RI 2.0_02-b08-fcs
 * Generated source version: 2.0
 * 
 */
@WebService(name = "PluginsWebService", targetNamespace = "http://webservices.concoursjeunes.org/")
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface PluginsWebService {


    /**
     * 
     * @param version
     * @return
     *     returns org.concoursjeunes.webservices.PluginDescriptionArray
     */
    @WebMethod
    @WebResult(partName = "return")
    public PluginDescriptionArray getAvailablePluginsForVersion(
        @WebParam(name = "version", partName = "version")
        String version);

    /**
     * 
     * @param category
     * @param lang
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://webservices.concoursjeunes.org/getLibelleCategory")
    @WebResult(partName = "return")
    public String getLibelleCategory(
        @WebParam(name = "category", partName = "category")
        String category,
        @WebParam(name = "lang", partName = "lang")
        String lang);

}