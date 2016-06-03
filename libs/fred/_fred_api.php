<?php

/*

Copyright (c) 2009, 2015 Federal Reserve Bank of St. Louis                                

This source file is subject to the BSD license,      
that is bundled with this package in the file LICENSE, and is        
available through the world-wide-web at the following url:           
https://research.stlouisfed.org/docs/api/licenses/BSD_LICENSE                                  
        
   
*/

require_once 'libs/fred/fred_api_exception.php';

class fred_api
{
    public $api_key = null;
    
    function __construct($api_key = null)
    {
        if (empty($api_key)) {
            throw new fred_api_exception('Your API key has not been set.');
        }
    
        $this->api_key = $api_key;
    }
    
    public static function factory($type, $api_key)
    {
        $class = 'fred_api_' . strtolower($type);
        $path = 'libs/fred/' . $class . '.php';
        
        if (!file_exists($path)) {
            throw new fred_api_exception('File does not exist: '.$path);
        }
        
        require_once($path);
        $object = new $class($api_key);
        
        return $object;
    }
}

?>