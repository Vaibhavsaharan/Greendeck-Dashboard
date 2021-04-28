import { Component} from 'react';
import ReactFC from 'react-fusioncharts';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from 'fusioncharts';
// import Charts from 'fusioncharts/fusioncharts.charts';
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import DimensionComp from "./DimensionComp"

ReactFC.fcRoot(FusionCharts, TimeSeries);


const schemaFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
    ).then(res => res.json());


const dataSource = {
    chart: {},
    caption: {
        text: ""
    },
    subcaption: {
        text: ""
    },
    series : "Type",
    yaxis: [
        {
            plot: {
                value: "Sales Value",
            },
            format: {
                prefix: ""
            },
            title: ""
        }
    ]
    };

class DataWidget extends Component{
    constructor(props){
        super(props)
        this.ondatafetch = this.ondatafetch.bind(this);
        this.state = {
            timeseriesDs:{
                type: "timeseries",
                renderAt: "container",
                width: "900",
                height: "600",
                dataSource
            }
        }
    }

    componentDidMount(){
        this.ondatafetch()
    }
    ondatafetch(){
        const dataFetch = fetch(
            "http://localhost:8082/"+this.props.fileid
          ).then(res => res.json());
        Promise.all([dataFetch, schemaFetch]).then(res => {
            const data = res[0];
            const schemas = res[1];
            schemas[0]['format'] = "%d-%b-%y %H:%M:%S"
            var dataarray = []
            data.forEach(function(dataitem){
                var time_stamp = dataitem['timestamp']
                var clock = time_stamp.substr(11,8)
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
                time_stamp = time_stamp.substr(0,10)
                var year = time_stamp.substr(0,4)
                year = year.substr(2,2)
                var month = time_stamp.substr(5,2)
                var day = time_stamp.substr(8,2)
                month = months[month-1]
                var newtimestamp = day+'-'+month+'-'+year+' '+clock
                //console.log(newtimestamp)
                for(var key in dataitem){
                    if(key === '__v' || key === '_id' || key === 'line_status' || key === 'timestamp'){continue}
                    if(dataitem[key] === null){continue}
                    var dataitemarray = [newtimestamp, key, dataitem[key]['$numberDecimal']]
                    dataarray.push(dataitemarray)
                }
            })
            
            const fusionTable = new FusionCharts.DataStore().createDataTable(
                dataarray,
                schemas
            );
            const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
            timeseriesDs.dataSource.data = fusionTable;
            timeseriesDs.dataSource.subcaption.text = "File identifier : "+this.props.fileid;
            timeseriesDs.dataSource.caption.text = "Data Analysis : "+this.props.measure;
            timeseriesDs.dataSource.yaxis[0].title = " " + this.props.axistitle;
            this.setState({
                timeseriesDs
            });
        });
    }

    
    render(){
        var dimensionlist = this.props.dimensions.map(function (dimension){
            return <DimensionComp keyy = {dimension.name} value = {dimension.value}/>
        })
        return (
            <div style={{boxShadow: '2px 2px 3px 5px rgba(9, 7, 7, 0.10)', borderRadius: '5px', marginTop : '30px'}}>
                <div style = {{paddingTop : '10px'}}>
                    <ul style={{listStyleType: 'none',}}>
                        <li style={{display:'flex'}}>{dimensionlist}</li>
                    </ul>
                </div>
                {this.state.timeseriesDs.dataSource.data ? (
                <ReactFC {...this.state.timeseriesDs} />
                ) : (
                "loading"
                )}
          </div>
        )
    }
}

export default DataWidget
