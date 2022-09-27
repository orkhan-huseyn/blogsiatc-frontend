import React, { useEffect, useState } from "react";
import { Button, Input, List } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { fetchBlogs, setCurrentPage } from "redux/features/blogsSlice";
import ProtectedRoute from "components/ProtectedRoute";
import BlogItem from "components/BlogItem";
import "./styles.css";

const LIMIT = 3;
const getBlogs = (state) => state.blogs;

function Blogs() {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const { currentPage, list, loading, total } = useSelector(getBlogs);

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
      <div className="blogs-container">
        <div className="blog-actions">
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

export default Blogs;
