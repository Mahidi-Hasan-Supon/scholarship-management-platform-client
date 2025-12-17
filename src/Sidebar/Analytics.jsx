import { PieChart, Pie, Tooltip } from 'recharts';


export const Analytics = ({ data }) => (
<div className="bg-white p-6 rounded-xl shadow">
<h2 className="text-2xl font-bold mb-4">Analytics</h2>
<PieChart width={300} height={300}>
<Pie data={data} dataKey="value" nameKey="name" />
<Tooltip />
</PieChart>
</div>
);