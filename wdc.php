<?php
/**
 * A system to pull Fred Data into a WDC Tableau Connector.
 */

require_once('libs/fred/fred_api.php');
$api_key = '[api_key_here]';

if (empty($_GET['wdc_ids'])) {
	die('Error: No Fred Id Specified.');
}

$return = array();
foreach (json_decode($_GET['wdc_ids'], true) as $vals) {
	$id = $vals['id'];
	$friendlyname = $vals['title'];
	
	$api = fred_api::factory('series', $api_key);
	$results = json_decode($api->observations(array(
		'series_id'      => $id,
		'file_type'      => 'json',
		'realtime_start' => '1900-01-01',
	)));
	
	foreach ($results->observations as $el) {
		$return[] = array(
			'Date'        => $el->date,
			'MetricName'  => $friendlyname,
			'MetricValue' => floatval($el->value),
		);
	}
}

$data = array();
$cols = array(
	array(
		'id'       => 'Date',
		'alias'    => 'Date',
		'dataType' => 'date'
	),
	array(
		'id'       => 'MetricName',
		'alias'    => 'Metric Name',
		'dataType' => 'string'
	),
	array(
		'id'       => 'MetricValue',
		'alias'    => 'Metric Value',
		'dataType' => 'float'
	),
);

header('Content-Type: application/json');
echo json_encode(array(
	'dataToReturn' => $return,
	'cols'         => $cols,
));
