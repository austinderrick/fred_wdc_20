<?php
/**
 * A system to pull Fred Data into a WDC Tableau Connector.
 */

require_once('libs/fred/fred_api.php');
$api_key = '5a6efc3b9ea2112ee2bb6abef689342f';

if (!empty($_GET['search'])) {
	$api = fred_api::factory('series', $api_key);
	$results = json_decode($api->search(array(
		'search_text' => $_GET['search'],
		'file_type'   => 'json',
		'limit'       => 15,
	)));
	
	if (!empty($_GET['debug'])) {
		dar($results);
	}
}
?>

<?php if (!empty($_GET['search'])): ?>
	<div class="navbar-border">
		<img src="/resources/WDC_Border.png" />
	</div>
	<?php if (empty($results->seriess)) : ?>
		<h4>No Results Found</h4>
	<?php endif; ?>
	<?php foreach ($results->seriess as $result): ?>
		<div class="title"><?php echo $result->id; ?> - <?php echo $result->title; ?></div>
		<div class="notes"><i><?php echo $result->notes; ?></i></div>
		<div class="action-buttons">
			<button class="btn" onclick="addWDC('<?php echo $result->id; ?>','<?php echo $result->title; ?>');">Add</button>
		</div>
		<hr/>
	<?php endforeach; ?>
<?php endif; ?>
