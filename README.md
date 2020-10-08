# Bellybutton Biodiversity Dashboard

## Purpose

Client is a researcher attempting to locate a protein that replicates the taste of beef within the natural flora of the human bellybutton. The data collected shows demographic information for each collected sample, the top 10 specimens present in the sample, the subjects belly button washing frequency, and a bubble chart showing relative culture amounts per sample. 



## Details

The dashboard can be viewed at [soudersmax.github.io/plotly_dashboard/](https://soudersmax.github.io/plotly_dashboard/) . 



I used the Viridis color palette to prevent potential accessibility issues due to colorblindness while still providing a perceptually uniform and pleasant aesthetic. The dashboard is dynamic in that the test subject's ID  number can be selected from the drop down to view their unique data. The index is linked to Bootstrap 3.3.7 but also includes inline styling as well as a connected style sheet for a few specific elements that needed to be over-ridden. It displays three different kinds of charts, a descending horizontal bar chart, a bubble plot, and a gauge chart to display washing frequency. Additionally, the page is mobile responsive, to an extent. The bubble chart in particular is difficult to see unless the screen orientation is rotated horizontally, but it is configured to be responsive. I believe this is largely in part due to the scale of the chart - there is a wide range of OTU IDs and highly varied sample values which make it difficult to display on a smaller screen. However, due to Plotly's native utilities, it can still be inspected dynamically using the zoom and pan features. 

