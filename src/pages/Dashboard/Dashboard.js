import React, { useEffect, useState } from "react";
import { Button, Input, List } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import ProtectedRoute from "components/ProtectedRoute";
import BlogItem from "components/BlogItem";
import "./styles.css";
import { fetchBlogs, setCurrentPage } from "redux/features/dashboardSlice";

const LIMIT = 5;
const getDashboard = (state) => state.dashboard;

function Dashboard() {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const { currentPage, list, loading, total } = useSelector(getDashboard);

  useEffect(() => {
    const params = { page: currentPage, limit: LIMIT, q };
    dispatch(fetchBlogs(params));
    // eslint-disable-next-line
  }, [currentPage, q]);

  function handlePageChange(page) {
    dispatch(setCurrentPage(page));
  }

  const handleSearch = debounce((event) => {
    setQ(event.target.value);
  }, 500);

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <div className="dashboard-actions">
          <Input
            style={{ width: "200px" }}
            placeholder="Search blog..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />
          <Link to="/blogs/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Add blog
            </Button>
          </Link>
        </div>
        <div style={{ marginTop: "20px" }}>
          <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            dataSource={list}
            pagination={{
              onChange: handlePageChange,
              pageSize: LIMIT,
              total,
              current: currentPage,
            }}
            renderItem={(item) => <BlogItem item={item} />}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
