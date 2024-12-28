import Chart from 'chart.js/auto'
import { useEffect } from 'react'
import { bubbleConfig, donutConfig, pieConfig, polarAreaConfig, radarConfig, scatterConfig, barLineConfig } from './data'

// components
import PageBreadcrumb from '../../../../components/PageBreadcrumb'

const OtherChartjs = () => {
	useEffect(() => {
		const bubbleTag = document.getElementById('bubble-example') 
		const bubbleChart = new Chart(bubbleTag, bubbleConfig)

		const donutTag = document.getElementById('donut-example') 
		const donutChart = new Chart(donutTag, donutConfig)

		const pieTag = document.getElementById('pie-example') 
		const pieChart = new Chart(pieTag, pieConfig)

		const polarAreaTag = document.getElementById('polar-area-example') 
		const polarAreaChart = new Chart(polarAreaTag, polarAreaConfig)

		const radarTag = document.getElementById('radar-example') 
		const radarChart = new Chart(radarTag, radarConfig)

		const scatterTag = document.getElementById('scatter-example')
		const scatterChart = new Chart(scatterTag, scatterConfig)

		const barLineTag = document.getElementById('bar-line-example') 
		const barLine = new Chart(barLineTag, barLineConfig)

		return () => {
			bubbleChart.destroy()
			donutChart.destroy()
			pieChart.destroy()
			polarAreaChart.destroy()
			radarChart.destroy()
			scatterChart.destroy()
			barLine.destroy()
		}
	})

	return (
		<>
			<PageBreadcrumb title="Chartjs" subName="Charts" />
			<div className="grid md:grid-cols-2 gap-6">
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Bubble</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="bubble-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Donut</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="donut-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Pie</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="pie-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2, #f56f36"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Polar Area</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="polar-area-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2, #f56f36"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Radar</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="radar-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Scatter</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="scatter-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Stacked Bar/Line</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="bar-line-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OtherChartjs
