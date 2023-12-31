import { useGetKPIsQuery } from '@/state/api'
import DashboardBox from './DashboardBox'
import { AreaChart, Area, LineChart,XAxis, Legend,YAxis, CartesianGrid,Line, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';

type Props = {}

const Row1 = (props: Props) => {
  const {palette} = useTheme()
    const {data}= useGetKPIsQuery();
    console.log("data: ", data);
    const revenueExpenses = useMemo(() => { 
      return (
        data && 
        data[0].monthlyData.map(({month, revenue, expenses})=>{
          return {
            name: month.substring(0,3),
            revenue: revenue,
            expenses: expenses
          }
        })
      )
    },[data])

    const revenueProfit = useMemo(() => { 
      return (
        data && 
        data[0].monthlyData.map(({month, revenue, expenses})=>{
          return {
            name: month.substring(0,3),
            revenue: revenue,
            profit: (revenue-expenses).toFixed(2),
          }
        })
      )
    },[data])
  return (
    <>
    <DashboardBox gridArea="a" >
      <BoxHeader 
      title='Revenue And Expenses'
      subtitle='top line is Revenue, bottom line is Expenses'
      sideText='+4%'/>
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"> 
            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1"> 
            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            </defs>
          <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}} />
          <YAxis  tickLine={false} 
          axisLine={{strokeWidth:'0'}}
          domain={[8000,23000]}
          style={{fontSize: "10px"}} />
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue" 
          dot={true}
          stroke={palette.primary.main}
          fillOpacity={1} 
          fill="url(#colorRevenue)" />
          <Area 
          type="monotone" 
          dataKey="expenses"
          dot={true} 
          stroke={palette.primary.main}
          fillOpacity={1} 
          fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
     <DashboardBox gridArea="b" >
     <BoxHeader 
      title='Profit And Revenue'
      subtitle='top line is Revenue, bottom line is Expenses'
      sideText='+4%'/>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          width={500}
          height={400}
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical={false}
           stroke={palette.grey[800]} />
          <XAxis dataKey="name" 
          tickLine={false} 
          style={{fontSize: "10px"}} />
          <YAxis  
          yAxisId='left'
          tickLine={false} 
          axisLine={false}
          style={{fontSize: "10px"}} />
           <YAxis  
          yAxisId='right'
          orientation='right'
          tickLine={false} 
          axisLine={false}
          style={{fontSize: "10px"}} />
          <Tooltip />
          <Legend height={20} wrapperStyle = {{
            margin:'0 0 10px 0'
          }}/>
          <Line
          yAxisId='left'
          type="monotone"
          dataKey="profit"
          stroke={palette.secondary.main} />
          <Line 
          yAxisId='right'
          type="monotone"
          dataKey="revenue"
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
     </DashboardBox>
     <DashboardBox gridArea="c" >
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
     </DashboardBox>
     </>
  )
}

export default Row1