<?php

/*

Copyright (c) 2009, 2015 Federal Reserve Bank of St. Louis                                

This source file is subject to the BSD license,      
that is bundled with this package in the file LICENSE, and is        
available through the world-wide-web at the following url:           
https://research.stlouisfed.org/docs/api/licenses/BSD_LICENSE                                  
        
   
*/

// Check that PHP version is 5 or higher.
$versions = explode('\.', phpversion());
if ($versions[0] < 5) {
    trigger_error('The PHP version is not 5 or higher.', E_USER_ERROR);
}

// Check that the curl extension is enabled.
if (array_search('curl', get_loaded_extensions()) === false) {
    trigger_error('The curl extension is not enabled.', E_USER_ERROR);
}

// Check that simple xml exists.
if (!function_exists('simplexml_load_string')) {
    throw new fred_api_exception('Function simplexml_load_string does not exist.');
}

// Load the fred_api class from a separate file to avoid PHP4 parse errors.
// Let the test above for PHP 5 or higher trigger an error instead.
require_once '_fred_api.php';

function dar($x) {
	echo "<pre>";
	print_r($x);
	echo "</pre>";
}

?>
