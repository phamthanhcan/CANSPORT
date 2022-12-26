import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
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
import Navbar from "../../../components/Navbar";
import { postApi } from "../../../libs/api";
import Empty from "../../../libs/components/Empty";

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

  const onSubmit = (data) => {
    let option = 0;
    if (+data.month && +data.year) {
      option = 1;
    }
    postApi(["revenue"], {
      option,
      data: {
        year: +data.year,
        month: +data.month,
      },
    })
      .then((res) => setData(res.data.result))
      .catch((err) => console.error(err));
  };

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

  return (
    <>
      <Navbar title="THỐNG KÊ" />
      <div className="wrapper">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Thống kê</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-2 d-flex align-items-end gap-3">
                <div>
                  <label htmlFor="month" className="form-label">
                    Tháng
                  </label>
                  {/* <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="month"
                    placeholder="MM"
                    {...register("month")}
                    defaultValue={new Date().getMonth() + 1}
                  /> */}

                  <select
                    className="form-control"
                    style={{ width: 200 }}
                    {...register("month")}
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
                </div>
                <div>
                  <label htmlFor="year" className="form-label">
                    Năm
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.year ? "is-invalid" : ""
                    }`}
                    id="year"
                    placeholder="YYYY"
                    {...register("year", {
                      required: "Năm không được để trống",
                    })}
                    defaultValue={`${new Date().getFullYear()}`}
                  />
                  <div className="invalid-feedback">{errors.year?.message}</div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="XEM THỐNG KÊ"
                />
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
                  <YAxis yAxisId={"price"} stroke="#febb0a" />
                  <YAxis
                    yAxisId={"quantity"}
                    orientation="right"
                    stroke="#0d6efd"
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId={"price"}
                    type="monotone"
                    dataKey="price"
                    stroke="#febb0a"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId={"quantity"}
                    type="monotone"
                    dataKey="quantity"
                    stroke="#0d6efd"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RevenueChart;
