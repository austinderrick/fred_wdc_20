<?php
/**
 * Outputs a chunk of data (from a WDC connector) to a pipe-delimited file
  * (For the rare instance when a user is not using Tableau as the end goal.)
 * 
 * @author Derrick Austin <derrick.austin@interworks.com>
**/

/**
 * Cleans up our field names, filename, etc.
 * 
 * @param string
 * 
 * @return string
 **/
function cleanStr($str)
{
	$str = preg_replace("/[^a-zA-Z0-9]/", "_", $str);
	$str = strtolower($str);
	$str = str_replace('__', '_', $str);
	$str = trim($str, '_');
	
	return $str;
}

header('Content-Type: text/plain; charset=utf-8');
header('Content-Disposition: attachment; filename=' . cleanStr($_POST['name']) . '.txt');

$output = fopen('php://output', 'w');

$fields = array();

foreach(json_decode($_POST['headers'], true) as $field) {
	$fields[] = cleanStr($field);
}

fputcsv($output, $fields, '|');

foreach(json_decode($_POST['data'], true) as $row) {
	array_walk($row, function (&$item) {
		$item = str_replace('|', '', $item);
	});
	
	fputcsv($output, $row, '|');
}