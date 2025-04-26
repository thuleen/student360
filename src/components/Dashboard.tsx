import { Component, onMount } from "solid-js";
import { A, useNavigate } from "@solidjs/router"
// import * as echarts from "echarts";

// const createChart = (id: string, option: echarts.EChartsOption) => {
//   onMount(() => {
//     const chart = echarts.init(document.getElementById(id)!);
//     chart.setOption(option);
//     window.addEventListener("resize", () => chart.resize());
//   });
// };

const Dashboard: Component = () => {

  // createChart("academic-chart", {
  //   title: { text: "Average score per subject" },
  //   tooltip: {},
  //   xAxis: {
  //     type: "category",
  //     data: ["Math", "Science", "English", "History", "PE"]
  //   },
  //   yAxis: { type: "value" },
  //   series: [
  //     {
  //       data: [72, 64, 80, 70, 85],
  //       type: "bar",
  //       itemStyle: { color: "#4f46e5" },
  //       emphasis: { itemStyle: { color: "#6366f1" } },
  //       animationDelay: (idx: number) => idx * 100
  //     }
  //   ],
  //   animationEasing: "elasticOut"
  // });

  // createChart("behavior-chart", {
  //   title: { text: "Behavior events (this month)" },
  //   tooltip: { trigger: "item" },
  //   legend: { bottom: 0 },
  //   series: [
  //     {
  //       name: "Events",
  //       type: "pie",
  //       radius: "60%",
  //       data: [
  //         { value: 57, name: "Positive" },
  //         { value: 13, name: "Negative" }
  //       ],
  //       emphasis: {
  //         itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" }
  //       },
  //       animationType: "scale",
  //       animationEasing: "elasticOut"
  //     }
  //   ]
  // });

  // createChart("checkin-chart", {
  //   title: { text: "Daily check-in compliance" },
  //   tooltip: {},
  //   radar: {
  //     indicator: [
  //       { name: "Morning roll call", max: 100 },
  //       { name: "Class attendance", max: 100 },
  //       { name: "Homework completion", max: 100 }
  //     ]
  //   },
  //   series: [
  //     {
  //       name: "Compliance",
  //       type: "radar",
  //       data: [
  //         {
  //           value: [90, 85, 75],
  //           name: "Today"
  //         }
  //       ],
  //       areaStyle: { opacity: 0.2 }
  //     }
  //   ]
  // });

  // createChart("ai-alerts", {
  //   title: { text: "AI alerts" },
  //   tooltip: {},
  //   xAxis: {
  //     type: "category",
  //     data: ["At risk", "Behavior D", "N"]
  //   },
  //   yAxis: { type: "value" },
  //   series: [
  //     {
  //       data: [3, 7, 9],
  //       type: "bar",
  //       itemStyle: { color: " #b7edd6" },
  //       animationDelay: (idx: number) => idx * 200
  //     }
  //   ],
  //   animationEasing: "bounceOut"
  // });

  return (
    <div class="flex flex-col flex-1 overflow-hidden"> {/* full height, no scroll */}
      <header class="p-6 flex justify-between items-center">
        {/* Action: Upload Student File */}
        <div class="flex items-center space-x-3">
          <label
            for="upload"
            class="cursor-pointer px-4 py-2 text-sm text-white bg-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            <A href="/analyze" class="text-white hover:underline">Let's analyze...</A>
          </label>
        </div>
      </header>

      <div class="p-6 space-y-6 overflow-y-auto flex-1 bg-gray-50">
        {/* Stats */}
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 bg-white shadow-md rounded-xl">
            <p class="text-sm text-gray-500">Total students</p>
            <h2 class="text-2xl font-bold text-blue-800">1,240</h2>
          </div>
          <div class="p-6 bg-white shadow-md rounded-xl">
            <p class="text-sm text-gray-500">Active students</p>
            <h2 class="text-2xl font-bold text-gray-600">1,120</h2>
          </div>
          <div class="p-6 bg-white shadow-md rounded-xl">
            <p class="text-sm text-gray-500">Behavior events recorded</p>
            <h2 class="text-2xl font-bold text-gray-600">320</h2>
          </div>
          <div class="p-6 bg-white shadow-md rounded-xl">
            <p class="text-sm text-gray-500">Academic progress (this month)</p>
            <h2 class="text-2xl font-bold text-gray-600">85%</h2>
          </div>
        </section>

        {/* Charts */}
        <section class="bg-white p-4 shadow rounded-lg space-y-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Overview</h3>
          Let's place charts here in the future ...
          {/* <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            <div id="academic-chart" class="w-full h-64 bg-white rounded-2xl shadow" />
            <div id="behavior-chart" class="w-full h-64 bg-white rounded-2xl shadow" />
            <div id="checkin-chart" class="w-full h-64 bg-white rounded-2xl shadow" />
            <div id="ai-alerts" class="w-full h-64 bg-white rounded-2xl shadow" />
          </div> */}

        </section>
      </div>
    </div>
  );
};

export default Dashboard;
