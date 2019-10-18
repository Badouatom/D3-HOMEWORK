// @TODO: YOUR CODE HERE!
var svgWidth =960;
var svgHeight =500;


var chartMargin= {
	
	top:20,
	right:40,
	bottom:60,
	left:100
};

 // define dimensions for the chart area
var width= svgWidth-chartMargin.left-chartMargin.right
var height= svgHeight-chartMargin.top-chartMargin.bottom
 
var svg=d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height",svgHeight)
  .append("g")
  .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
  
 
var chart = svg.append("g");
   
   //Append  a div to the tootips, assign it a class
  d3.select(".chart")
    .append("div")
	.attr("class", "tooltip")
	.style("opacity",0);
 // this part is loading the data
d3.csv("assets//data//data.csv", function(error, data){
     if(error) throw error;
	 
	data.forEach(function(data) {
	data.poverty = +data.poverty;
    data.healtcare = +data.healtcare;	
 
});  
// create scale functions
var yLinearScale = d3.scaleLinear()
   .range([height,0]);
   
   var xLinearScale =d3.scaleLinear()
   .range([0,width]);
   
   
   // create axis functions
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis =d3.axisLeft(yLinearScale);
   // Scale the domain
   xLinearScale.domain([8, d3.max(Data, function(data){
	   return +data.poverty;
   })]);
   yLinearScale.domain([0, d3.max(Data, function(data){
	   return +data.healthcare*1.2;
   })]);
   
   var tooltip = d3.tip()
   .attr("class", "tooltip")
   .offset([80, -60])
   .html(function(data) {
       var abbrName = data.abbr;
	   var povertyRate = +data.poverty;
	   var lacksHealthcare = +data.healthcare;
	   return (abbrName + "<br> Poverty Rate: " + povertyRate + "<br> Lacks Healthcare :" + lacksHealthcare);
	   
   });
   
   chart.call(toolTip);
   
   var elem = chart.append("g").selectAll("g")
    .data(Data)
	
	
   var elemEnter = elem.enter()
     .append("g")
     .attr("transform", function (data, index){
       return "translate(" + xLinearScale(data.poverty) + "," +  yLinearScale(data.healhtcare) +" )"
	 });
 elemEnter.append("circle")
    .attr("r", "15")
	.attr("fill", "LightBlue")
	.on("click", function(data) {
   toolTip.show(data);
	})
	////
	.on("mouseout", function(data, index){
		toolTip.hide(data);
	});
elemEnter.append("text")
.attr("dy", function(data, index){	return 5;})
.attr("text-anchor" , "middle")
.text(function(data, index){return  data.abbr;})
.attr("font-size", 12)
.attr('fill', 'white');


chart.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(bottomAxis);
  
//chart.append("g")
//  .attr("transform" , `translate(0,${height})`)
//  .call(bottomAxis);
  
  
 chart.append("g")
  .call(leftAxis);
  
 chart.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 -chartMargin.left +40)
  .attr("x", 0 -(height /2)-60)
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");
  
  // Append x -axis labels
  chart.append("text")
   .attr("transform", "translate(" +(width/2-25) + "," +(height + chartMargin.top +30)+")")
   .attr("class", "axisText")
   .text("In poverty (%)");
   
   
   
   
   $(function() { 
    $("#btnSave").click(function() { 
        html2canvas($("#widget"), {
            onrendered: function(canvas) {
                theCanvas = canvas;


                canvas.toBlob(function(blob) {
                    saveAs(blob, "Dashboard.png"); 
                });
            }
        });
    });
});
   
   });
  
  
   
  