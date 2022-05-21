let datasets = []

const DATA_COUNT = 7;
let chartH = null
let back = 0
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
let zoomState = 3
const labels = [];
const data = {
  labels: labels,
  datasets: []
};
const decimation = {
  enabled: false,
  algorithm: 'min-max',
};
const generate = (da) => {
  chartData.data.labels = []
  for(let i = 0; i < 24; i++){
    for(let j = 0; j < 60; j+=da){
      const dat = new Date()
      dat.setMinutes(j)
      dat.setSeconds(0)
      dat.setHours(i)
      const hourse = ('0'+dat.getHours()).slice(-2)
      const minutes = ('0'+dat.getMinutes()).slice(-2)
      chartData.data.labels.push(`${hourse}:${minutes}`)
    }
  }
  chartData.data.datasets.forEach(data => data.data = [])
  chartData.data.labels.forEach((dt) => {
    const dat = new Date()
    dat.setMinutes(dt.substr(3,2))
    dat.setSeconds(0)
    dat.setHours(dt.substr(0, 2))
    dat.setDate(chartData.datesRange.substr(8,2))
    dat.setMonth(parseInt(chartData.datesRange.substr(5,2))-1)
    dat.setFullYear(chartData.datesRange.substr(0,4))
    if(dat> Date.now()){
      return;
    }
    chartData.data.datasets.forEach(data => {
      let isSave = false
      data.dataRaw.forEach((dtq, indf) => {
        if(dt == dtq.key){
          data.data.push(dtq.value)
          isSave = true
        }
      })
      if(!isSave){
        data.data.push(data.data[data.data.length-1])
      }
    })
  })
}
export const chartData = {
  rawChart: null,
  type: "line",
  data: data,
  datesRange: null,
  options: {
    animation: false,
    responsive: true,
    parsing: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      decimation: {
        enabled: false,
        algorithm: 'min-max',
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    },
    scales: {
      yAxes:[{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50
        }
      }],
      xAxes:[{
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 12,
          source: 'auto',
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false,
      /*callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.index;
        }
      }*/
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    pan: {
      enabled: true,
      mode: 'x',
      rangeMax: {
        x: 4000
      },
      rangeMin: {
        x: 0
      }
    },
    zoom: {
      enabled: true,
      mode: 'x',
      sensitivity: 1,
      speed: 1,
      limits: {
        x: {min: 0, max: 100}
      },
      onZoom: (data) => {
        if(chartH == null){
          chartH = document.getElementById('chart1')
          chartH.onwheel = (dts) => {
            dts.preventDefault()
            if(chartData.options.zoom.enabled || dts.deltaY < 0){
              return
            }
            back += dts.deltaY/100
            console.log(back)
            if(back >= 3){
              back = 0
              chartData.options.zoom.enabled = true
              zoomState = 1
              
              const min = data.chart.scales['x-axis-0'].min
              const max = data.chart.scales['x-axis-0'].max
              const minDate = new Date()
              const maxDate = new Date()
              minDate.setHours(min.substr(0, 2))
              minDate.setMinutes(min.substr(3, 2))
              maxDate.setHours(max.substr(0, 2))
              maxDate.setMinutes(max.substr(3, 2))
              generate(10)
              chartData.data.datasets[0].data = []
              chartData.data.labels.forEach((dt) => {
                const dat = new Date()
                dat.setMinutes(dt.substr(3,2))
                dat.setSeconds(0)
                dat.setHours(dt.substr(0, 2))
                dat.setDate(chartData.datesRange.substr(8,2))
                dat.setMonth(parseInt(chartData.datesRange.substr(5,2))-1)
                dat.setFullYear(chartData.datesRange.substr(0,4))
                if(dat> Date.now()){
                  return;
                }
                let isSave = false
                chartData.data.datasets[0].dataRaw.forEach((data, indf) => {
                  if(dt == data.key){
                    chartData.data.datasets[0].data.push(data.value)
                    isSave = true
                  }
                })
                if(!isSave){
                  chartData.data.datasets[0].data.push(chartData.data.datasets[0].data[chartData.data.datasets[0].data.length-1])
                }
              })
              chartData.rawChart.update()
            }
          }
        }
        console.log(data)
        if(zoomState == 0){
          chartData.options.zoom.enabled = false
          return;
        }
        const min = data.chart.scales['x-axis-0'].min
        const max = data.chart.scales['x-axis-0'].max
        const minDate = new Date()
        const maxDate = new Date()
        minDate.setHours(min.substr(0, 2))
        minDate.setMinutes(min.substr(3, 2))
        maxDate.setHours(max.substr(0, 2))
        maxDate.setMinutes(max.substr(3, 2))

        const dateNew = parseInt(maxDate.getHours() - minDate.getHours())
        if(dateNew >= 0 && dateNew < 6){
          zoomState = 0
          generate(1)
        }
        else if(dateNew >= 6 && dateNew < 12){
          zoomState = 1
          generate(10)
        }
        else if(dateNew >= 12 && dateNew < 18){
          zoomState = 2
          generate(30)
        }
        else {
          zoomState = 3
          decimation.enabled = false;
          chartData.data.labels = []
          for(let i = 0; i < 25; i++){
            if(i!=24){
              const dat = new Date()
              dat.setMinutes(0)
              dat.setSeconds(0)
              dat.setHours(i)
              const hourse = ('0'+dat.getHours()).slice(-2)
              const minutes = ('0'+dat.getMinutes()).slice(-2)
              chartData.data.labels.push(`${hourse}:${minutes}`)
            }else{
              const dat = new Date()
              dat.setMinutes(59)
              dat.setSeconds(0)
              dat.setHours(23)
              const hourse = ('0'+dat.getHours()).slice(-2)
              const minutes = ('0'+dat.getMinutes()).slice(-2)
              chartData.data.labels.push(`${hourse}:${minutes}`)
            }
          }
          chartData.data.datasets[0].data = []
          chartData.data.labels.forEach((dt) => {
            const dat = new Date()
            dat.setMinutes(dt.substr(3,2))
            dat.setSeconds(0)
            dat.setHours(dt.substr(0, 2))
            dat.setDate(chartData.datesRange.substr(8,2))
            dat.setMonth(parseInt(chartData.datesRange.substr(5,2))-1)
            dat.setFullYear(chartData.datesRange.substr(0,4))
            if(dat> Date.now()){
              return;
            }
            let isSave = false
            chartData.data.datasets[0].dataRaw.forEach((data, indf) => {
              if(dt == data.key){
                chartData.data.datasets[0].data.push(data.value)
                isSave = true
              }
            })
            if(!isSave){
              chartData.data.datasets[0].data.push(chartData.data.datasets[0].data[chartData.data.datasets[0].data.length-1])
            }
          })
        }
        chartData.rawChart.update()
      }
    }
  },
};

export default chartData;