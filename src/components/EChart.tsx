// src/components/EChart.tsx
import { onCleanup, onMount } from 'solid-js';
import * as echarts from 'echarts';

interface EChartProps {
  option: echarts.EChartsOption;
  height?: string;
}

export default function EChart(props: EChartProps) {
  let chartRef: HTMLDivElement | undefined;

  onMount(() => {
    if (!chartRef) return;

    const chart = echarts.init(chartRef);
    chart.setOption(props.option);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(chartRef);

    onCleanup(() => {
      chart.dispose();
      resizeObserver.disconnect();
    });
  });

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: props.height ?? '300px' }}
    />
  );
}
