function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);      
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
  var allSampleID = data.samples; 

    // 4. Create a variable that filters the samples for the object with the desired sample number.
  var IDArray = allSampleID.filter(sampleObj => sampleObj.id == sample);

    // Del3.1. Create a variable that filters the metadata array for the object with the desired sample number. (del3)
  var metaArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
  var id = IDArray[0];

    // Del3.2. Create a variable that holds the first sample in the metadata array.(del3)
  var meta = metaArray[0];  

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var otu_ids = id.otu_ids;
  var otu_labels = id.otu_labels;
  var sample_values = id.sample_values.slice(0,10);

    // Del3.3. Create a variable that holds the washing frequency.(del3)
  var wfreq = parseFloat(meta.wfreq);
  
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

  var otu_slice = otu_ids.slice(0,10);
  var otu_sort = otu_slice.sort((a,b) => b - a );
  var yticks = otu_sort.map(otu_id => "OTU " + otu_id);

    // 8. Create the trace for the bar chart. 
  var trace = {
    x: sample_values,
    y: yticks,
    type: "bar",
    orientation: "h",
    hoverinfo: "text",
    hovertext: otu_labels,
    marker: {
      color: [1,2,3,4,5,6,7,8,9,10],
      colorscale: "Viridis"}
  };
  var data = [trace];

    // 9. Create the layout for the bar chart. 
    var config = { responsive: true}
    var layout = {
    title: "Top 10 Bacteria Cultures Found",
    xaxis: { title: "Sample Amount" },
    yaxis: { autorange: "reversed" }
  };

    // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", data,layout,config)
  
  // Del2.1. Create the trace for the bubble chart.
  var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      size: sample_values,
      color: [1,2,3,4,5,6,7,8,9,10],
      colorscale: "Viridis"      
    }
  }];
  
  // Del2.2. Create the layout for the bubble chart.
  var bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        xaxis: {
          title: "OTU ID"
        },
        automargin: true,
        hovermode: "closest"
    };
  
  // Del2.3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout,config)
  
  // Del3.4. Create the trace for the gauge chart.
  var gaugeData = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: wfreq,
      title:{ 
        text: "Washing Frequency", 
        font:{ size: 24}},
      gauge: {
        axis: { range: [null, 10]},
        bar: { color: "#fde725" },
        steps: [
          { range: [0,2], color: "#440154"},
          { range: [2,4], color: "#31688e"},
          { range: [4,6], color: "#21918c"},
          { range: [6,8], color: "#35b779"},
          { range: [8,10], color: "#90d743"}
        ]}
    }];
      
  // Del3.5. Create the layout for the gauge chart.
  
  var gaugeLayout = { 
    width: 500,
    height: 400,
    margin: { t: 40, r: 40, l: 40, b: 40 }
    };
  
  // Del3.6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('gauge', gaugeData, gaugeLayout, config); 
})};
