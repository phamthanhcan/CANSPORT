import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Empty from "../../../shared/components/modules/Empty";
import { postApi } from "../../../shared/helper/api";

const generateDay = () => {
  let arr = [];
  for (let i = 0; i <= 31; i++) {
    arr.push(i);
  }
  return arr;
};

const generateMonth = () => {
  let arr = [];
  for (let i = 0; i <= 12; i++) {
    arr.push(i);
  }
  return arr;
};

const RevenueChart = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(null);

  useEffect(() => {
    const date = new Date();
    postApi(["revenue"], {
      option: 1,
      data: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      },
    })
      .then((res) => setData(res.data.result))
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    let option = 0;
    if (+data.day && +data.month && +data.year) {
      option = 2;
    } else if (!+data.day && +data.month && +data.year) {
      option = 1;
    } else if (!+data.day && !+data.month && +data.year) {
      option = 0;
    } else {
      alert("Plear enter valid information");
    }

    postApi(["revenue"], {
      option,
      data: {
        year: +data.year,
        month: +data.month,
        day: +data.day,
      },
    })
      .then((res) => setData(res.data.result))
      .catch((err) => console.error(err));
  };

  console.log(data);

  return (
    <div className="admin-container">
      <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex mr-5">
          <label className="ml-4" htmlFor="day">
            Day
          </label>
          <select className="form-control mx-4" id="day" {...register("day")}>
            {generateDay().map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <label className="ml-4" htmlFor="month">
            Month
          </label>
          <select
            className="form-control mx-4"
            {...register("month")}
            id="month"
            defaultValue={new Date().getMonth() + 1}
          >
            {generateMonth().map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <label className="ml-4" htmlFor="year">
            Year
          </label>
          <input
            className="form-control mx-4"
            id="year"
            {...register("year", { required: "Please enter year" })}
            defaultValue={`${new Date().getFullYear()}`}
          />
          <div>
            <button type="submit" className="btn btn-primary">
              THỐNG KÊ
            </button>
          </div>
        </div>
      </form>
      {!data?.length ? (
        <Empty />
      ) : (
        <ResponsiveContainer className="chart" height={300}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="_id" />
            <YAxis yAxisId={"price"} stroke="#8884d8" />
            <YAxis yAxisId={"quantity"} orientation="right" stroke="#82ca9d" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId={"price"}
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId={"quantity"}
              type="monotone"
              dataKey="quantity"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueChart;
