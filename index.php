<!DOCTYPE html>
<html lang="en">

<head>
	<title>Fred WDC</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://connectors.tableau.com/libs/tableauwdc-2.0.0-beta.js" type="text/javascript"></script>
	<script type="text/javascript" src="/resources/tableau-output.js"></script>
	<script type="text/javascript" src="resources/fred.js"></script>
	<link rel="stylesheet" href="resources/fred.css" />
	
	<script type="text/javascript">
		// Google Analytics tracking code
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-6095304-1', 'auto');
		  ga('send', 'pageview');
	</script>
</head>

<body>
	<div class="navbar navbar-default">
		<a class="navbar-wdc" href="/">
			<img id="wdc-logo-left" src="resources/WDC_Logo.png" />
			<div id="wdc-logo-right">
				<img src="resources/WDC_Logo_Header.png" />
				<span>U.S. ECONOMIC DATA</span>
			</div>
		</a>
		<a class="navbar-brand" href="https://www.interworks.com">
			<img src="https://www.interworks.com/logo/images/logo.png" />
		</a>
		<div class="navbar-border">
			<img src="resources/WDC_Border.png" />
		</div>
	</div>
	<div class="container">
		<div class="alert alert-danger warning-msg">
			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			<b>Whoa!</b> We've detected you are loading this in a browser window.<br/><br/>
			You can still download the data to a flat file, but for best performance, load this window from Tableau and use the
			<a href="https://onlinehelp.tableau.com/current/pro/online/windows/en-us/help.htm#examples_web_data_connector.html" target="_blank">Web Data Connector</a>.
		</div>

		<div class="container">
			<div class="col-md-4">
				<img src="resources/US_Economic_Data_Text.png" />
				<div class="icon-container">
					<img class="fred-icon income" data-group="income" src="resources/NationalIncomeExpenditures.png" />
					<img class="fred-icon labor" data-group="labor" src="resources/PopulationEmploymentLaborMarkets.png" />
				</div>
				<div class="icon-container">
					<img class="fred-icon business" data-group="business" src="resources/ProductionBusinessActivity.png" />
					<img class="fred-icon prices" data-group="prices" src="resources/Prices.png" />
				</div>
				<div class="icon-container">
					<img class="fred-icon finance" data-group="finance" src="resources/MoneyBankingFinance.png" />
					<img class="fred-icon search" data-group="search" src="resources/Search.png" />
				</div>
				<form class="fred-search">
					<a href="javascript:void(0)" id="search-cancel">&lt; Back to Quick Add</a>
					<div class="form-group">
						<input id="fred-search" class="form-control" placeholder="Search Here" />
					</div>
					<input type="hidden" name="wdc-ids" id="wdc-ids" />
					<button type="button" class="btn" id="search-wdc">Search</button>
				</form>
			</div>
			<div class="col-md-8">
				<div class="selected-header">
					<img src="resources/Selected_Data.png" />
					<a href="javascript:void(0);" id="clear-wdc">Clear</a>
				</div>
				<div id="wdc-list">Select metrics using the buttons on the left.</div>
				<button type="button" class="btn" id="get-wdc">Get Data</button>
			</div>
		</div>
		<div id="search-results"></div>
	</div>
	<footer class="footer">
		<div class="navbar-border">
			<img src="/resources/WDC_Border.png" />
		</div>
		<div class="container">
			<p class="text-muted">All data is &copy;<a href="https://research.stlouisfed.org" target="_blank">Federal Reserve Bank of St. Louis</a>. Please refer to the <a href="https://research.stlouisfed.org/legal.html" target="_blank">TOS</a> for usage terms.</p>
		</div>
	</footer>
</body>

</html>
