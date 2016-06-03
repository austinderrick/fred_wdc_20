<?php

/*

Copyright (c) 2009, 2015 Federal Reserve Bank of St. Louis                                

This source file is subject to the BSD license,      
that is bundled with this package in the file LICENSE, and is        
available through the world-wide-web at the following url:           
https://research.stlouisfed.org/docs/api/licenses/BSD_LICENSE                                  
        
   
*/

require_once 'fred_api_exception.php';

class fred_api_base
{
    public $url_base = 'https://api.stlouisfed.org/fred/';
    public $type;
    public $api_key;

    function __construct($api_key)
    {
        $this->api_key = $api_key;
    }

    function send($path = null, $parameters = array())
    {
        if (!isset($parameters['api_key'])) {
            $parameters['api_key'] = $this->api_key;
        }
    
        $url = $this->construct_url($path, $parameters);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_USERAGENT, 'FRED API Client for PHP (' . $parameters['api_key'] . ')');
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $status = curl_getinfo($ch);
        curl_close($ch);
        
        if (!preg_match('#text/xml#',$status['content_type'])) {
            return $response;
        }

        return $this->parse($response);
    }
    
    function construct_url($path = null, $parameters = array())
    {
        $url = $this->url_base . $path;
        if (!empty($parameters)) {
            $i = 0;
            foreach ($parameters as $k => $v) {
                $url .= ($i) ? '&' : '?'; 
                $url .= $k.'='.urlencode($v);
                $i++;
            }
        }
        
        return $url;
    }
    
    function parse($response)
    {
        $simple_xml_object = simplexml_load_string($response);
        if (!$simple_xml_object) {
            throw new fred_api_exception('Error parsing response.');
        }
        elseif (isset($simple_xml_object['code']) and
            isset($simple_xml_object['message'])) {
            throw new fred_api_exception($simple_xml_object['message'], (integer) $simple_xml_object['code']);
        }

        return $simple_xml_object;
    }
    
    function get($parameters = null)
    {
        return $this->send($this->type, $parameters);
    }
    
    public function __call($function, $arguments)
    {
        $parameters = array();
        if (!empty($arguments[0])) {
            $parameters = $arguments[0];
        }

        return $this->send($this->type.'/'.strtr($function, '_', '/'), $parameters);
    }
}

?>
