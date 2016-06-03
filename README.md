# fred_wdc_20
Federal Reserve Web Data Connector

Have you ever needed an easy source of GDP data over time? Maybe your project calls for unemployment rates or federal debt. Luckily, the Federal Reserve Bank of St. Louis has a treasure trove of interesting economic metrics like these in a database named “FRED”.
Collecting this data isn’t terribly complicated, but it can be time consuming if you need more than one or two metrics. With the power of Tableau’s Web Data Connector system, we built a platform to bridge the gap and make importing FRED’s data into Tableau extremely easy!

To get the economic data you need, simply connect to a new data source in any version of Tableau past 9.1. Under To a server, choose Web Data Connector as the source. 
In the URL box, type http://wdc.poc.interworks.com/. On this page, select the WDC system you’d like to use; in this case, U.S. Economic Data.
From here, you can select one of the preset metric groupings or you can create your own with the Search button. Once you have selected all of the metrics you want, simply click Get Data to pull the data into Tableau. 
